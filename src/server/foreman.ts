import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";
import { listProjects } from "./projects";
import { weekStart } from "./dates";
import { initials, baseRoleLabel as roleLabel } from "./format";

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export type ForemanSite = {
  id: string;
  name: string;
  dayOf?: number;
  dayTotal?: number;
  crewHere: number;
  blocker?: { who: string; detail: string };
};

export async function getForemanHome(): Promise<{
  sites: ForemanSite[];
  onClock: number;
  pings: number;
}> {
  const workspaceId = await getActiveWorkspaceId();
  const running = (await listProjects()).filter((p) => p.status === "IN_PROGRESS");

  // Open clock-ins (clockOut null) today, per project + workspace total.
  const open = await db.timeEntry.findMany({
    where: { clockOut: null, project: { workspaceId } },
    select: { userId: true, projectId: true },
  });
  const hereByProject = new Map<string, Set<string>>();
  for (const e of open) {
    if (!hereByProject.has(e.projectId)) hereByProject.set(e.projectId, new Set());
    hereByProject.get(e.projectId)!.add(e.userId);
  }
  const onClock = new Set(open.map((e) => e.userId)).size;

  // Latest unresolved blocker per project, with the reporter's name.
  const blockers = await db.fieldReport.findMany({
    where: { resolved: false, kind: "BLOCKER", project: { workspaceId } },
    orderBy: { createdAt: "desc" },
  });
  const reporterIds = [...new Set(blockers.map((b) => b.userId))];
  const reporters = await db.user.findMany({
    where: { id: { in: reporterIds } },
    select: { id: true, name: true },
  });
  const nameById = new Map(reporters.map((u) => [u.id, u.name]));
  const blockerByProject = new Map<string, { who: string; detail: string }>();
  for (const b of blockers) {
    if (!blockerByProject.has(b.projectId)) {
      blockerByProject.set(b.projectId, { who: nameById.get(b.userId) ?? "Crew", detail: b.detail });
    }
  }

  const pings = await db.fieldReport.count({
    where: { resolved: false, project: { workspaceId } },
  });

  const sites: ForemanSite[] = running.map((p) => ({
    id: p.id,
    name: p.name,
    dayOf: p.dayOf,
    dayTotal: p.dayTotal,
    crewHere: hereByProject.get(p.id)?.size ?? 0,
    blocker: blockerByProject.get(p.id),
  }));

  return { sites, onClock, pings };
}

export type CrewMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  clockedIn: boolean;
  hoursWeek: number;
};

export async function getForemanCrew(): Promise<{ site: { id: string; name: string }; members: CrewMember[] }[]> {
  const workspaceId = await getActiveWorkspaceId();
  const running = (await listProjects()).filter((p) => p.status === "IN_PROGRESS");
  const since = weekStart();
  const todayStart = startOfToday();

  const entries = await db.timeEntry.findMany({
    where: { date: { gte: since }, project: { workspaceId } },
    select: { userId: true, projectId: true, hours: true, date: true, clockOut: true },
  });
  const userIds = [...new Set(entries.map((e) => e.userId))];
  const memberships = await db.membership.findMany({
    where: { workspaceId, userId: { in: userIds } },
    select: { userId: true, role: true, user: { select: { name: true } } },
  });
  const metaById = new Map(memberships.map((m) => [m.userId, { name: m.user.name, role: m.role }]));

  return running.map((p) => {
    const byUser = new Map<string, { hours: number; clockedIn: boolean }>();
    for (const e of entries) {
      if (e.projectId !== p.id) continue;
      const agg = byUser.get(e.userId) ?? { hours: 0, clockedIn: false };
      agg.hours += e.hours;
      if (e.clockOut == null && e.date >= todayStart) agg.clockedIn = true;
      byUser.set(e.userId, agg);
    }
    const members: CrewMember[] = [...byUser.entries()].map(([userId, agg]) => {
      const meta = metaById.get(userId);
      const name = meta?.name ?? "Crew";
      return {
        id: userId,
        name,
        initials: initials(name),
        role: roleLabel(meta?.role ?? "WORKER"),
        clockedIn: agg.clockedIn,
        hoursWeek: Math.round(agg.hours * 10) / 10,
      };
    });
    members.sort((a, b) => b.hoursWeek - a.hoursWeek);
    return { site: { id: p.id, name: p.name }, members };
  });
}

const WEEKDAYS = ["M", "T", "W", "T", "F"];

export async function getForemanTime() {
  const workspaceId = await getActiveWorkspaceId();
  const since = weekStart();
  const entries = await db.timeEntry.findMany({
    where: { date: { gte: since }, project: { workspaceId } },
    select: { userId: true, hours: true, date: true, anomalies: true },
  });
  const memberships = await db.membership.findMany({
    where: { workspaceId },
    select: { userId: true, role: true, user: { select: { name: true } } },
  });
  const metaById = new Map(memberships.map((m) => [m.userId, { name: m.user.name, role: m.role }]));

  const days = WEEKDAYS.map((d, i) => {
    const dayStart = new Date(since.getTime() + i * 86400000);
    const dayEnd = new Date(dayStart.getTime() + 86400000);
    const h = entries
      .filter((e) => e.date >= dayStart && e.date < dayEnd)
      .reduce((s, e) => s + e.hours, 0);
    return { d, h: Math.round(h * 10) / 10 };
  });

  const byUser = new Map<string, { hours: number; flagged: boolean }>();
  for (const e of entries) {
    const agg = byUser.get(e.userId) ?? { hours: 0, flagged: false };
    agg.hours += e.hours;
    if (e.anomalies.length > 0) agg.flagged = true;
    byUser.set(e.userId, agg);
  }

  const crew = [...byUser.entries()]
    .map(([userId, agg]) => {
      const meta = metaById.get(userId);
      const name = meta?.name ?? "Crew";
      return {
        id: userId,
        name,
        initials: initials(name),
        role: roleLabel(meta?.role ?? "WORKER"),
        hoursWeek: Math.round(agg.hours * 10) / 10,
        flagged: agg.flagged,
      };
    })
    .sort((a, b) => b.hoursWeek - a.hoursWeek);

  const label = `Week of ${since.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  const totalHours = Math.round(entries.reduce((s, e) => s + e.hours, 0) * 10) / 10;
  const flagged = crew.filter((c) => c.flagged).length;

  return { label, totalHours, crewCount: byUser.size, flagged, days, crew };
}

export type ForemanLog = {
  id: string;
  site: string;
  weather: string;
  photos: number;
  crewHours: number;
  sqftDone: number;
  sqftPlanned: number;
  narrative: string;
  submitted: boolean;
};

export async function getForemanLog(): Promise<ForemanLog | null> {
  const workspaceId = await getActiveWorkspaceId();
  const log = await db.dailyLog.findFirst({
    where: { project: { workspaceId } },
    orderBy: [{ submitted: "asc" }, { date: "desc" }],
    include: { project: { select: { name: true } } },
  });
  if (!log) return null;
  const weather =
    (log.weatherJson as { summary?: string } | null)?.summary ?? "Weather unavailable";
  return {
    id: log.id,
    site: log.project.name,
    weather,
    photos: log.photoCount,
    crewHours: log.crewHours ?? 0,
    sqftDone: log.sqftDone ?? 0,
    sqftPlanned: log.sqftPlanned ?? 0,
    narrative: log.narrative ?? "",
    submitted: log.submitted,
  };
}

export type ProjectLogEntry = {
  id: string;
  date: string;
  weather: string;
  foreman: string;
  crewHours: number;
  photos: number;
  sqftDone: number;
  sqftPlanned: number;
  narrative: string;
};

/** Submitted daily logs for a project, newest first (the job journal). */
export async function getProjectLogs(projectId: string): Promise<{ project: string | null; entries: ProjectLogEntry[] }> {
  const workspaceId = await getActiveWorkspaceId();
  const project = await db.project.findFirst({ where: { id: projectId, workspaceId }, select: { name: true } });
  if (!project) return { project: null, entries: [] };

  const logs = await db.dailyLog.findMany({
    where: { projectId, submitted: true },
    orderBy: { date: "desc" },
  });
  const foremanIds = [...new Set(logs.map((l) => l.foremanId))];
  const users = await db.user.findMany({ where: { id: { in: foremanIds } }, select: { id: true, name: true } });
  const nameById = new Map(users.map((u) => [u.id, u.name]));

  const entries: ProjectLogEntry[] = logs.map((l) => ({
    id: l.id,
    date: l.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    weather: (l.weatherJson as { summary?: string } | null)?.summary ?? "—",
    foreman: nameById.get(l.foremanId)?.split(" ")[0] ?? "Foreman",
    crewHours: l.crewHours ?? 0,
    photos: l.photoCount,
    sqftDone: l.sqftDone ?? 0,
    sqftPlanned: l.sqftPlanned ?? 0,
    narrative: l.narrative ?? "",
  }));

  return { project: project.name, entries };
}

const FIELD_LABEL: Record<string, string> = { BLOCKER: "Blocker", PHOTO: "Photo", NOTE: "Note" };

export type FieldCard = {
  id: string;
  kind: string;
  isBlocker: boolean;
  time: string;
  who: string;
  site: string;
  detail: string;
  resolved: boolean;
};

export async function getForemanField(): Promise<FieldCard[]> {
  const workspaceId = await getActiveWorkspaceId();
  const reports = await db.fieldReport.findMany({
    where: { project: { workspaceId } },
    orderBy: { createdAt: "desc" },
    include: { project: { select: { name: true } } },
  });
  const userIds = [...new Set(reports.map((r) => r.userId))];
  const users = await db.user.findMany({ where: { id: { in: userIds } }, select: { id: true, name: true } });
  const nameById = new Map(users.map((u) => [u.id, u.name]));

  return reports.map((r) => ({
    id: r.id,
    kind: FIELD_LABEL[r.kind] ?? r.kind,
    isBlocker: r.kind === "BLOCKER",
    time: r.createdAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    who: nameById.get(r.userId) ?? "Crew",
    site: r.project.name,
    detail: r.detail,
    resolved: r.resolved,
  }));
}

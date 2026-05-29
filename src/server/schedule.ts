import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";
import type { AssignmentStatus } from "@prisma/client";

export type ScheduleEntry = {
  id: string;
  project: string;
  projectId: string;
  scope: string | null;
  crew: string[];
  status: AssignmentStatus;
  sqft: number | null;
  plannedHr: number | null;
};

export type ScheduleDay = {
  key: string;
  label: string;
  isToday: boolean;
  entries: ScheduleEntry[];
};

const DAY_MS = 86_400_000;

/** The next 7 days of crew assignments, bucketed by day. */
export async function getSchedule(): Promise<{
  days: ScheduleDay[];
  summary: { assignments: number; crewDays: number; confirmed: number };
}> {
  const workspaceId = await getActiveWorkspaceId();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start.getTime() + 7 * DAY_MS);

  const rows = await db.assignment.findMany({
    where: { project: { workspaceId }, date: { gte: start, lt: end } },
    orderBy: { date: "asc" },
    include: { project: { select: { name: true } } },
  });

  const crewIds = [...new Set(rows.flatMap((r) => r.crewUserIds))];
  const users = await db.user.findMany({ where: { id: { in: crewIds } }, select: { id: true, name: true } });
  const nameById = new Map(users.map((u) => [u.id, u.name.split(" ")[0]]));

  const entriesByKey = new Map<string, ScheduleEntry[]>();
  for (const r of rows) {
    const key = new Date(r.date).toDateString();
    const entry: ScheduleEntry = {
      id: r.id,
      project: r.project.name,
      projectId: r.projectId,
      scope: r.scope,
      crew: r.crewUserIds.map((id) => nameById.get(id) ?? "Crew"),
      status: r.status,
      sqft: r.sqft,
      plannedHr: r.plannedHr,
    };
    const list = entriesByKey.get(key) ?? [];
    list.push(entry);
    entriesByKey.set(key, list);
  }

  const todayKey = start.toDateString();
  const days: ScheduleDay[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start.getTime() + i * DAY_MS);
    const key = d.toDateString();
    return {
      key,
      label: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      isToday: key === todayKey,
      entries: entriesByKey.get(key) ?? [],
    };
  });

  return {
    days,
    summary: {
      assignments: rows.length,
      crewDays: rows.reduce((s, r) => s + r.crewUserIds.length, 0),
      confirmed: rows.filter((r) => r.status === "CONFIRMED").length,
    },
  };
}

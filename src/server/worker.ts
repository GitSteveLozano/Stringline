import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";
import { weekStart, DAY_MS } from "./dates";

/** The signed-in worker. Demo: the first WORKER member (Marcus). */
export async function getWorkerId(): Promise<{ id: string; name: string; rate: number }> {
  const workspaceId = await getActiveWorkspaceId();
  const m = await db.membership.findFirst({
    where: { workspaceId, role: "WORKER" },
    orderBy: { createdAt: "asc" },
    select: { baseHourly: true, user: { select: { id: true, name: true } } },
  });
  if (!m) throw new Error("No worker found — run `npm run db:seed`.");
  return { id: m.user.id, name: m.user.name, rate: m.baseHourly ? Number(m.baseHourly) : 0 };
}

const fmtElapsed = (clockIn: string): string => {
  const [h, m] = clockIn.split(":").map(Number);
  const now = new Date();
  let mins = now.getHours() * 60 + now.getMinutes() - (h * 60 + m);
  if (mins < 0) mins += 24 * 60; // crossed midnight
  return `${Math.floor(mins / 60)}:${String(mins % 60).padStart(2, "0")}`;
};

const to12h = (hhmm: string): string => {
  const [h, m] = hhmm.split(":").map(Number);
  const ap = h < 12 ? "AM" : "PM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ap}`;
};

export async function getWorkerHome() {
  const worker = await getWorkerId();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Any open entry counts as on-the-clock — matches the clockIn guard, so a
  // forgotten clock-out from a prior day stays visible (and clock-out-able).
  const open = await db.timeEntry.findFirst({
    where: { userId: worker.id, clockOut: null },
    orderBy: { date: "desc" },
    include: { project: { select: { name: true } } },
  });

  // Today's assignment for the scope line.
  const assignment = await db.assignment.findFirst({
    where: { date: { gte: startOfToday }, crewUserIds: { has: worker.id } },
    orderBy: { date: "desc" },
  });
  let scopedBy: string | undefined;
  if (assignment?.scopedById) {
    const u = await db.user.findUnique({ where: { id: assignment.scopedById }, select: { name: true } });
    scopedBy = u?.name.split(" ")[0];
  }
  const scope = assignment?.scope
    ? `${assignment.scope}${scopedBy ? ` · scoped by ${scopedBy}` : ""}`
    : undefined;

  // A project to clock into when off the clock.
  const fallbackProjectId =
    assignment?.projectId ??
    (await db.project.findFirst({ where: { workspaceId: await getActiveWorkspaceId(), status: "IN_PROGRESS" }, select: { id: true } }))?.id;

  return {
    name: worker.name.split(" ")[0],
    clockedIn: Boolean(open),
    onBreak: Boolean(open?.pausedAt),
    entryId: open?.id,
    site: open?.project.name,
    since: open?.clockIn ? to12h(open.clockIn) : undefined,
    elapsed: open?.clockIn ? fmtElapsed(open.clockIn) : undefined,
    scope,
    projectId: fallbackProjectId,
    userId: worker.id,
  };
}

export async function getWorkerScope() {
  const worker = await getWorkerId();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const a = await db.assignment.findFirst({
    where: { date: { gte: startOfToday }, crewUserIds: { has: worker.id } },
    orderBy: { date: "desc" },
    include: { steps: { orderBy: { sort: "asc" } } },
  });
  if (!a) return null;
  let scopedBy = "—";
  if (a.scopedById) {
    const u = await db.user.findUnique({ where: { id: a.scopedById }, select: { name: true } });
    scopedBy = u?.name.split(" ")[0] ?? scopedBy;
  }
  return {
    goalSqft: a.sqft ?? 0,
    doneSqft: a.doneSqft ?? 0,
    scopedBy,
    scopedAt: a.scopedAt ? to12h(a.scopedAt.toTimeString().slice(0, 5)) : "—",
    onSite: a.onSiteNote ?? "",
    steps: a.steps.map((s) => ({ id: s.id, label: s.label, done: s.done, now: s.current })),
  };
}

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pending",
  FOREMAN_APPROVED: "Approved",
  OWNER_APPROVED: "Paid",
  REJECTED: "Rejected",
};
const WEEKDAYS = ["M", "T", "W", "T", "F"];

export async function getWorkerHours() {
  const worker = await getWorkerId();
  const since = weekStart();
  const entries = await db.timeEntry.findMany({
    where: { userId: worker.id, date: { gte: since } },
    orderBy: { date: "desc" },
    include: { project: { select: { name: true } } },
  });

  const todayStr = new Date().toDateString();
  const days = WEEKDAYS.map((d, i) => {
    const dayStart = new Date(since.getTime() + i * DAY_MS);
    const dayEnd = new Date(dayStart.getTime() + DAY_MS);
    const h = entries
      .filter((e) => e.date >= dayStart && e.date < dayEnd)
      .reduce((s, e) => s + e.hours, 0);
    const isToday = dayStart.toDateString() === todayStr;
    const future = dayStart.getTime() > Date.now() && !isToday;
    return { d, h: Math.round(h * 10) / 10, plan: future && h === 0 ? 8 : undefined, today: isToday };
  });

  const totalHours = Math.round(entries.reduce((s, e) => s + e.hours, 0) * 10) / 10;
  const grossPay = Math.round(totalHours * worker.rate);

  const entryRows = entries
    .filter((e) => e.clockOut)
    .slice(0, 5)
    .map((e) => ({
      date: e.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).replace(",", " ·"),
      site: e.project.name.split(/[—-]/)[0].trim(),
      hours: Math.round(e.hours * 10) / 10,
      status: STATUS_LABEL[e.approval] ?? e.approval,
    }));

  return { totalHours, grossPay, days, entries: entryRows };
}

export async function getWorkerLog() {
  const worker = await getWorkerId();
  const since = weekStart();
  const photos = await db.photo.findMany({
    where: { userId: worker.id, takenAt: { gte: since } },
    orderBy: { takenAt: "desc" },
  });

  const todayStr = new Date().toDateString();
  const yestStr = new Date(Date.now() - DAY_MS).toDateString();
  const groups = new Map<string, { tag: string; time: string }[]>();
  const order: string[] = [];
  for (const p of photos) {
    const ds = p.takenAt.toDateString();
    const label =
      ds === todayStr
        ? `Today · ${p.takenAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
        : ds === yestStr
          ? `Yesterday · ${p.takenAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
          : p.takenAt.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    if (!groups.has(label)) {
      groups.set(label, []);
      order.push(label);
    }
    groups.get(label)!.push({
      tag: p.tag,
      time: p.takenAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    });
  }

  return { total: photos.length, sections: order.map((day) => ({ day, items: groups.get(day)! })) };
}

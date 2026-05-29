import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";

export type DispatchStatusView = "OUT" | "OVERDUE" | "RETURNED";

export type DispatchRow = {
  id: string;
  ticketId: string;
  asset: string;
  category: string;
  qty: number;
  project: string;
  projectId: string;
  status: DispatchStatusView;
  sentOn: string;
  dueBack: string | null;
  overdueDays: number;
  dailyValue: number;
};

function dayLabel(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Equipment dispatched to jobs. OVERDUE is derived from dueBack vs now (so the
 * board stays correct without a cron flipping statuses); only OUT/RETURNED are
 * stored.
 */
export async function getDispatchBoard() {
  const workspaceId = await getActiveWorkspaceId();
  const rows = await db.dispatch.findMany({
    where: { asset: { workspaceId } },
    orderBy: { sentOn: "desc" },
    include: { asset: { select: { name: true, category: true, dailyRate: true } } },
  });

  const projIds = [...new Set(rows.map((r) => r.projectId))];
  const projects = await db.project.findMany({ where: { id: { in: projIds }, workspaceId }, select: { id: true, name: true } });
  const nameById = new Map(projects.map((p) => [p.id, p.name]));

  const now = Date.now();
  const mapped: DispatchRow[] = rows.map((r) => {
    const overdue = r.status !== "RETURNED" && !!r.dueBack && r.dueBack.getTime() < now;
    const status: DispatchStatusView = r.status === "RETURNED" ? "RETURNED" : overdue ? "OVERDUE" : "OUT";
    return {
      id: r.id,
      ticketId: r.ticketId,
      asset: r.asset.name,
      category: r.asset.category,
      qty: r.qty,
      project: nameById.get(r.projectId) ?? "—",
      projectId: r.projectId,
      status,
      sentOn: dayLabel(r.sentOn),
      dueBack: r.dueBack ? dayLabel(r.dueBack) : null,
      overdueDays: overdue ? Math.floor((now - r.dueBack!.getTime()) / 86_400_000) : 0,
      dailyValue: Number(r.asset.dailyRate) * r.qty,
    };
  });

  const onJob = mapped.filter((r) => r.status !== "RETURNED");
  const returned = mapped.filter((r) => r.status === "RETURNED");
  return {
    onJob,
    returned,
    summary: {
      outCount: onJob.length,
      overdueCount: onJob.filter((r) => r.status === "OVERDUE").length,
      onRentValue: onJob.reduce((s, r) => s + r.dailyValue, 0),
    },
  };
}

/** Assets (with available qty) + active projects for the new-dispatch form. */
export async function getDispatchResources(): Promise<{
  assets: { id: string; name: string; available: number }[];
  projects: { id: string; name: string }[];
}> {
  const workspaceId = await getActiveWorkspaceId();
  const [assets, projects] = await Promise.all([
    db.asset.findMany({
      where: { workspaceId },
      select: { id: true, name: true, ownedQty: true, dispatches: { select: { qty: true, status: true } } },
      orderBy: { name: "asc" },
    }),
    db.project.findMany({
      where: { workspaceId, status: { in: ["ACCEPTED", "IN_PROGRESS"] } },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);
  return {
    assets: assets.map((a) => {
      const out = a.dispatches.filter((d) => d.status !== "RETURNED").reduce((s, d) => s + d.qty, 0);
      return { id: a.id, name: a.name, available: Math.max(0, a.ownedQty - out) };
    }),
    projects,
  };
}

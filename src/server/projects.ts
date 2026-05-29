import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";
import { dayOfSchedule } from "./dates";
import type {
  Project,
  BudgetLine,
  ChangeOrderRow,
  MilestoneRow,
} from "@/lib/demo-data";
import type { Prisma } from "@prisma/client";

const num = (d: Prisma.Decimal | number | null): number => (d == null ? 0 : Number(d));

type ProjectRow = {
  id: string;
  name: string;
  status: string;
  health: string;
  address: string | null;
  contractValue: Prisma.Decimal | null;
  spentToDate: Prisma.Decimal | null;
  progress: number;
  crewSize: number;
  startedOn: Date | null;
  durationDays: number | null;
  client: { name: string };
};

const projectSelect = {
  id: true,
  name: true,
  status: true,
  health: true,
  address: true,
  contractValue: true,
  spentToDate: true,
  progress: true,
  crewSize: true,
  startedOn: true,
  durationDays: true,
  client: { select: { name: true } },
} satisfies Prisma.ProjectSelect;

/** Map a DB project row to the view-model the screens consume. */
function toViewModel(p: ProjectRow): Project {
  const dayTotal = p.durationDays ?? undefined;
  const dayOf = dayOfSchedule(p.startedOn, p.durationDays);
  return {
    id: p.id,
    name: p.name,
    client: p.client.name,
    address: p.address ?? "",
    status: p.status as Project["status"],
    health: p.health as Project["health"],
    dayOf,
    dayTotal,
    crewSize: p.crewSize,
    contractValue: num(p.contractValue),
    spent: num(p.spentToDate),
    progress: p.progress,
  };
}

export async function listProjects(): Promise<Project[]> {
  const workspaceId = await getActiveWorkspaceId();
  const rows = await db.project.findMany({
    where: { workspaceId },
    select: projectSelect,
    orderBy: { createdAt: "asc" },
  });
  return rows.map(toViewModel);
}

export async function getProject(id: string): Promise<Project | null> {
  const row = await db.project.findUnique({ where: { id }, select: projectSelect });
  return row ? toViewModel(row) : null;
}

/** Minimal client list for the new-project picker. */
export async function listClients(): Promise<{ id: string; name: string }[]> {
  const workspaceId = await getActiveWorkspaceId();
  return db.client.findMany({
    where: { workspaceId },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

/** Aggregates the owner dashboard cares about. */
export async function getDashboard() {
  const workspaceId = await getActiveWorkspaceId();
  const all = await listProjects();
  const running = all.filter((p) => p.status === "IN_PROGRESS");
  const atRisk = all.filter((p) => p.health === "OVER_BUDGET" || p.health === "AT_RISK");
  const onClock = await db.timeEntry.findMany({
    where: { clockOut: null, project: { workspaceId } },
    select: { userId: true },
    distinct: ["userId"],
  });
  return {
    runningCount: running.length,
    crewOnClock: onClock.length,
    atRisk,
    onSite: running,
  };
}

export type ProjectDetail = {
  project: Project;
  budget: BudgetLine[];
  changeOrders: ChangeOrderRow[];
  milestones: MilestoneRow[];
  lostReason: string | null;
  lostNote: string | null;
};

export async function getProjectDetail(id: string): Promise<ProjectDetail | null> {
  const row = await db.project.findUnique({
    where: { id },
    select: {
      ...projectSelect,
      lostReason: true,
      lostNote: true,
      budgetLines: { orderBy: { sort: "asc" } },
      changeOrders: { orderBy: { number: "asc" } },
      invoices: { include: { milestones: { orderBy: { percent: "desc" } } } },
    },
  });
  if (!row) return null;

  const budget: BudgetLine[] = row.budgetLines.map((b) => ({
    label: b.label,
    bid: num(b.bid),
    spent: num(b.spent),
  }));
  const changeOrders: ChangeOrderRow[] = row.changeOrders.map((c) => ({
    id: c.id,
    number: c.number,
    description: c.description,
    delta: num(c.valueDelta),
    status: c.status as ChangeOrderRow["status"],
  }));
  const milestones: MilestoneRow[] = row.invoices
    .flatMap((inv) => inv.milestones)
    .map((m) => ({
      label: m.label,
      percent: m.percent,
      amount: num(m.amount),
      paid: m.paidOn != null,
    }));

  return { project: toViewModel(row), budget, changeOrders, milestones, lostReason: row.lostReason, lostNote: row.lostNote };
}

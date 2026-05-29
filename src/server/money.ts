import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";
import { weekStart, DAY_MS } from "./dates";

const CASH_OUT_TYPES = ["MATERIAL_COST", "PAYROLL", "EQUIPMENT"] as const;

/** The four owner money tiles, derived from the cash ledger + billing. */
export async function getCashSummary() {
  const workspaceId = await getActiveWorkspaceId();
  const since30 = new Date(Date.now() - 30 * DAY_MS);

  const txns = await db.transaction.findMany({
    where: { workspaceId, date: { gte: since30 } },
    select: { type: true, amount: true, date: true },
  });
  const sum = (pred: (t: (typeof txns)[number]) => boolean) =>
    txns.filter(pred).reduce((s, t) => s + Number(t.amount), 0);

  const cashIn30 = sum((t) => t.type === "PAYMENT_IN");
  const cashOut30 = sum((t) => (CASH_OUT_TYPES as readonly string[]).includes(t.type));
  const wkStart = weekStart();
  const payrollThisWeek = sum((t) => t.type === "PAYROLL" && t.date >= wkStart);

  // Unbilled = work spent but not yet collected, across active projects.
  const projects = await db.project.findMany({
    where: { workspaceId, status: "IN_PROGRESS" },
    select: {
      spentToDate: true,
      invoices: { select: { milestones: { select: { amount: true, paidOn: true } } } },
    },
  });
  let unbilled = 0;
  for (const p of projects) {
    const collected = p.invoices
      .flatMap((i) => i.milestones)
      .filter((m) => m.paidOn != null)
      .reduce((s, m) => s + Number(m.amount), 0);
    unbilled += Math.max(0, Number(p.spentToDate ?? 0) - collected);
  }

  return { cashIn30, cashOut30, payrollThisWeek, unbilled };
}

export type Receivable = { client: string; amount: number; age: string };

function ageLabel(dueOn: Date | null): string {
  if (!dueOn) return "no due date";
  const diffDays = Math.round((dueOn.getTime() - Date.now()) / DAY_MS);
  if (diffDays < 0) return `overdue ${Math.abs(diffDays)}d`;
  return `due ${dueOn.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

/**
 * Outstanding A/R, derived from unpaid billing milestones grouped by invoice.
 * One row per invoice with a balance; age comes from the invoice due date.
 */
export async function getReceivables(): Promise<Receivable[]> {
  const workspaceId = await getActiveWorkspaceId();
  const invoices = await db.invoice.findMany({
    where: { project: { workspaceId } },
    select: {
      dueOn: true,
      project: { select: { client: { select: { name: true } } } },
      milestones: { select: { amount: true, paidOn: true } },
    },
  });

  const rows: Receivable[] = [];
  for (const inv of invoices) {
    const balance = inv.milestones
      .filter((m) => m.paidOn == null)
      .reduce((s, m) => s + Number(m.amount), 0);
    if (balance <= 0) continue;
    rows.push({ client: inv.project.client.name, amount: balance, age: ageLabel(inv.dueOn) });
  }
  // Overdue first, then soonest due.
  return rows.sort((a, b) => Number(b.age.startsWith("overdue")) - Number(a.age.startsWith("overdue")));
}

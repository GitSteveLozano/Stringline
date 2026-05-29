import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";

const DAY_MS = 24 * 60 * 60 * 1000;

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

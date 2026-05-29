import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";
import { DAY_MS } from "./dates";

export type InvoiceStatusView = "PAID" | "OVERDUE" | "PARTIAL" | "OPEN";

export type InvoiceRow = {
  id: string;
  number: string;
  client: string;
  project: string;
  projectId: string;
  total: number;
  paid: number;
  balance: number;
  status: InvoiceStatusView;
  daysOverdue: number;
  dueLabel: string;
};

export type AgingBucket = { label: string; amount: number };

function dueLabel(dueOn: Date | null, daysOverdue: number): string {
  if (!dueOn) return "no due date";
  if (daysOverdue > 0) return `${daysOverdue}d overdue`;
  return `due ${dueOn.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

/** All invoices with derived status + AR-aging buckets on the outstanding balance. */
export async function getInvoicing(): Promise<{
  invoices: InvoiceRow[];
  buckets: AgingBucket[];
  summary: { outstanding: number; collected: number; overdue: number };
}> {
  const workspaceId = await getActiveWorkspaceId();
  const rows = await db.invoice.findMany({
    where: { project: { workspaceId } },
    orderBy: { createdAt: "desc" },
    include: {
      project: { select: { id: true, name: true, client: { select: { name: true } } } },
      milestones: { select: { amount: true, paidOn: true } },
    },
  });

  const now = Date.now();
  // Aging buckets on outstanding balance.
  let current = 0, d30 = 0, d60 = 0, d90 = 0, collected = 0;

  const invoices: InvoiceRow[] = rows.map((inv) => {
    const total = inv.milestones.reduce((s, m) => s + Number(m.amount), 0);
    const paid = inv.milestones.filter((m) => m.paidOn != null).reduce((s, m) => s + Number(m.amount), 0);
    const balance = total - paid;
    collected += paid;

    const daysOverdue = inv.dueOn && balance > 0 ? Math.max(0, Math.floor((now - inv.dueOn.getTime()) / DAY_MS)) : 0;

    if (balance > 0) {
      if (daysOverdue <= 0) current += balance;
      else if (daysOverdue <= 30) d30 += balance;
      else if (daysOverdue <= 60) d60 += balance;
      else d90 += balance;
    }

    const status: InvoiceStatusView =
      balance <= 0 ? "PAID" : daysOverdue > 0 ? "OVERDUE" : paid > 0 ? "PARTIAL" : "OPEN";

    return {
      id: inv.id,
      number: inv.number,
      client: inv.project.client.name,
      project: inv.project.name,
      projectId: inv.project.id,
      total,
      paid,
      balance,
      status,
      daysOverdue,
      dueLabel: dueLabel(inv.dueOn, daysOverdue),
    };
  });

  // Outstanding first (overdue, then most owed); paid invoices last.
  invoices.sort((a, b) => Number(b.balance > 0) - Number(a.balance > 0) || b.daysOverdue - a.daysOverdue || b.balance - a.balance);

  return {
    invoices,
    buckets: [
      { label: "Current", amount: current },
      { label: "1–30d", amount: d30 },
      { label: "31–60d", amount: d60 },
      { label: "60d+", amount: d90 },
    ],
    summary: {
      outstanding: current + d30 + d60 + d90,
      collected,
      overdue: d30 + d60 + d90,
    },
  };
}

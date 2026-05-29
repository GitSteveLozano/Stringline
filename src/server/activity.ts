import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";
import { relativeAge } from "./format";
import type { IconName } from "@/components/icon";

export type ActivityItem = {
  id: string;
  icon: IconName;
  kind: string;
  title: string;
  sub: string;
  ago: string;
  ts: number;
  projectId: string | null;
};

const TXN_LABEL: Record<string, string> = {
  PAYMENT_IN: "Payment received",
  MATERIAL_COST: "Materials paid",
  PAYROLL: "Payroll run",
  EQUIPMENT: "Equipment charge",
  INVOICE_SENT: "Invoice sent",
};

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/** A workspace-wide event timeline: payments, approvals, and submitted logs. */
export async function getActivity(): Promise<{ total: number; items: ActivityItem[] }> {
  const workspaceId = await getActiveWorkspaceId();

  const [txns, approvals, logs] = await Promise.all([
    db.transaction.findMany({
      where: { workspaceId },
      orderBy: { date: "desc" },
      take: 25,
      include: { project: { select: { id: true, name: true } } },
    }),
    db.approval.findMany({
      where: { project: { workspaceId } },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: { project: { select: { id: true, name: true } } },
    }),
    db.dailyLog.findMany({
      where: { project: { workspaceId }, submitted: true },
      orderBy: { date: "desc" },
      take: 20,
      include: { project: { select: { id: true, name: true } } },
    }),
  ]);

  const reqIds = [...new Set(approvals.map((a) => a.requesterUserId))];
  const users = await db.user.findMany({ where: { id: { in: reqIds } }, select: { id: true, name: true } });
  const nameById = new Map(users.map((u) => [u.id, u.name.split(" ")[0]]));

  const items: ActivityItem[] = [];

  for (const t of txns) {
    items.push({
      id: `txn-${t.id}`,
      icon: "money",
      kind: t.type === "PAYMENT_IN" ? "Payment" : "Ledger",
      title: `${TXN_LABEL[t.type] ?? "Transaction"} · ${money(Number(t.amount))}`,
      sub: t.project?.name ?? t.description,
      ago: relativeAge(t.date),
      ts: t.date.getTime(),
      projectId: t.project?.id ?? null,
    });
  }

  for (const a of approvals) {
    const who = nameById.get(a.requesterUserId) ?? "Crew";
    const decided = a.status !== "PENDING";
    items.push({
      id: `apr-${a.id}`,
      icon: "check",
      kind: "Approval",
      title: decided
        ? `${a.status === "APPROVED" ? "Approved" : "Denied"} · ${money(Number(a.amount))}`
        : `${who} requested ${money(Number(a.amount))}`,
      sub: a.project.name,
      ago: relativeAge(decided && a.decidedAt ? a.decidedAt : a.createdAt),
      ts: (decided && a.decidedAt ? a.decidedAt : a.createdAt).getTime(),
      projectId: a.project.id,
    });
  }

  for (const l of logs) {
    const when = l.submittedAt ?? l.date;
    items.push({
      id: `log-${l.id}`,
      icon: "log",
      kind: "Daily log",
      title: `Daily log submitted${l.sqftDone ? ` · ${l.sqftDone.toLocaleString()} sf` : ""}`,
      sub: l.project.name,
      ago: relativeAge(when),
      ts: when.getTime(),
      projectId: l.project.id,
    });
  }

  items.sort((a, b) => b.ts - a.ts);
  return { total: items.length, items: items.slice(0, 40) };
}

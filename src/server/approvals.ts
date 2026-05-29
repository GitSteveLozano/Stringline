import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";
import { initials } from "./format";

const KIND_LABEL: Record<string, string> = {
  MATERIALS: "Materials",
  TIME_OT: "Time / OT",
  EQUIPMENT: "Equipment",
};

export type ApprovalCard = {
  id: string;
  kind: string;
  who: string;
  site: string;
  detail: string;
  amount: string;
  age: string;
  urgent: boolean;
};

function ageLabel(createdAt: Date): string {
  const mins = Math.max(1, Math.round((Date.now() - createdAt.getTime()) / 60000));
  if (mins < 60) return `${mins}m`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.round(hrs / 24)}d`;
}

export async function getPendingApprovals(): Promise<ApprovalCard[]> {
  const workspaceId = await getActiveWorkspaceId();
  const rows = await db.approval.findMany({
    where: { status: "PENDING", project: { workspaceId } },
    orderBy: [{ urgent: "desc" }, { createdAt: "asc" }],
    include: { project: { select: { name: true } } },
  });
  const reqIds = [...new Set(rows.map((r) => r.requesterUserId))];
  const users = await db.user.findMany({ where: { id: { in: reqIds } }, select: { id: true, name: true } });
  const nameById = new Map(users.map((u) => [u.id, u.name]));

  return rows.map((r) => {
    const amt = Number(r.amount);
    const name = nameById.get(r.requesterUserId) ?? "Crew";
    return {
      id: r.id,
      kind: KIND_LABEL[r.kind] ?? r.kind,
      who: `${name.split(" ")[0]} ${initials(name).slice(-1)}.`,
      site: r.project.name.split(/[—-]/)[0].trim(),
      detail: r.detail,
      amount: r.unit === "hrs" ? `${amt} hrs` : `$${amt.toLocaleString("en-US")}`,
      age: ageLabel(r.createdAt),
      urgent: r.urgent,
    };
  });
}

export async function getPendingApprovalCount(): Promise<number> {
  const workspaceId = await getActiveWorkspaceId();
  return db.approval.count({ where: { status: "PENDING", project: { workspaceId } } });
}

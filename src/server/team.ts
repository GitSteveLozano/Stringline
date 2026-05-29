import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";
import type { TeamMember, TeamRole } from "@/lib/demo-data";
import { BaseRole } from "@prisma/client";

const BASE_LABEL: Record<BaseRole, TeamRole> = {
  OWNER: "Owner",
  ESTIMATOR: "Estimator",
  FOREMAN: "Foreman",
  WORKER: "Crew",
};

const initials = (name: string) =>
  name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

export async function getTeam(): Promise<TeamMember[]> {
  const workspaceId = await getActiveWorkspaceId();
  const rows = await db.membership.findMany({
    where: { workspaceId },
    select: {
      id: true,
      role: true,
      baseHourly: true,
      pending: true,
      customRole: { select: { name: true } },
      user: { select: { name: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return rows.map((m) => {
    const group: TeamMember["group"] =
      m.role === "FOREMAN" || m.role === "WORKER" ? "Field" : "Office";
    return {
      id: m.id,
      name: m.user.name,
      initials: initials(m.user.name),
      role: (m.customRole?.name as TeamRole) ?? BASE_LABEL[m.role],
      rate: m.baseHourly != null ? Number(m.baseHourly) : undefined,
      group,
      pending: m.pending || undefined,
    };
  });
}

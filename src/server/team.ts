import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";
import { initials, baseRoleLabel } from "./format";
import type { TeamMember, TeamRole } from "@/lib/demo-data";

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
      role: (m.customRole?.name as TeamRole) ?? (baseRoleLabel(m.role) as TeamRole),
      rate: m.baseHourly != null ? Number(m.baseHourly) : undefined,
      group,
      pending: m.pending || undefined,
    };
  });
}

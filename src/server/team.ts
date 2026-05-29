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
      userId: true,
      role: true,
      baseHourly: true,
      pending: true,
      customRole: { select: { name: true } },
      user: { select: { name: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  // One row per person: a solo operator who "wears" several hats has multiple
  // memberships, but the roster should list them once (by their earliest role).
  const seen = new Set<string>();
  const unique = rows.filter((m) => (seen.has(m.userId) ? false : (seen.add(m.userId), true)));

  return unique.map((m) => {
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

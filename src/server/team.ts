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
  // memberships, but the roster should list them once. Prefer a pending
  // membership when one exists so its "Confirm invite" stays actionable;
  // otherwise keep the earliest (createdAt asc).
  const byUser = new Map<string, (typeof rows)[number]>();
  for (const m of rows) {
    const existing = byUser.get(m.userId);
    if (!existing || (m.pending && !existing.pending)) byUser.set(m.userId, m);
  }
  const unique = [...byUser.values()];

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

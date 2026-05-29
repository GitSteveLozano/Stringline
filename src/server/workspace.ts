import { db } from "@/lib/db";

/**
 * Resolve the active workspace. Single-tenant for now — returns the demo
 * workspace. When subdomain/auth routing lands, this reads from the session.
 */
export async function getActiveWorkspaceId(): Promise<string> {
  const ws = await db.workspace.findFirst({
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });
  if (!ws) throw new Error("No workspace found — run `npm run db:seed`.");
  return ws.id;
}

/** Workspace identity + the owner's name, for the More screen header. */
export async function getWorkspaceInfo(): Promise<{ name: string; owner: string }> {
  const ws = await db.workspace.findFirst({
    orderBy: { createdAt: "asc" },
    select: {
      name: true,
      memberships: {
        where: { role: "OWNER", customRoleId: null },
        select: { user: { select: { name: true } } },
        take: 1,
      },
    },
  });
  return { name: ws?.name ?? "Workspace", owner: ws?.memberships[0]?.user.name ?? "Owner" };
}

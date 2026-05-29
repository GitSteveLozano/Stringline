import { db } from "@/lib/db";
import { getCurrentUser } from "./auth";

/**
 * Resolve the active workspace from the signed-in user's membership.
 * Falls back to the first workspace (dev/unauthenticated convenience).
 */
export async function getActiveWorkspaceId(): Promise<string> {
  const me = await getCurrentUser();
  if (me) return me.workspaceId;
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

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

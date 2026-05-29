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

export type WorkspaceSettings = {
  name: string;
  trade: string;
  subdomain: string;
  timezone: string;
  foundedOn: string;
  owner: string;
  counts: { members: number; projects: number; clients: number };
  me: { name: string; roles: string[] };
  integrations: { label: string; connected: boolean; note: string }[];
};

const ROLE_LABEL: Record<string, string> = { owner: "Owner", estimator: "Estimator", foreman: "Foreman", worker: "Crew" };

/** Workspace identity, rollup counts, the signed-in account, and integration status. */
export async function getWorkspaceSettings(): Promise<WorkspaceSettings | null> {
  const me = await getCurrentUser();
  if (!me) return null;
  const workspaceId = await getActiveWorkspaceId();

  const ws = await db.workspace.findUnique({
    where: { id: workspaceId },
    select: { name: true, trade: true, subdomain: true, timezone: true, createdAt: true },
  });
  if (!ws) return null;

  const [members, projects, clients, qbo, stripe, ownerM] = await Promise.all([
    db.membership.count({ where: { workspaceId } }),
    db.project.count({ where: { workspaceId } }),
    db.client.count({ where: { workspaceId } }),
    db.invoice.count({ where: { project: { workspaceId }, qboInvoiceId: { not: null } } }),
    db.invoice.count({ where: { project: { workspaceId }, stripeLinkId: { not: null } } }),
    db.membership.findFirst({ where: { workspaceId, role: "OWNER", customRoleId: null }, select: { user: { select: { name: true } } } }),
  ]);

  return {
    name: ws.name,
    trade: ws.trade,
    subdomain: ws.subdomain,
    timezone: ws.timezone,
    foundedOn: ws.createdAt.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    owner: ownerM?.user.name ?? "Owner",
    counts: { members, projects, clients },
    me: { name: me.name, roles: me.roles.map((r) => ROLE_LABEL[r] ?? r) },
    integrations: [
      { label: "QuickBooks Online", connected: qbo > 0, note: "Sync invoices + payments" },
      { label: "Stripe", connected: stripe > 0, note: "Card + ACH collection" },
      { label: "Calendar", connected: false, note: "Push the crew schedule" },
    ],
  };
}

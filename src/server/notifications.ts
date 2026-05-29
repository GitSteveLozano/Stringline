import { db } from "@/lib/db";
import { getCurrentUser } from "./auth";

export type NotificationItem = {
  id: string;
  kind: string;
  title: string;
  body: string | null;
  projectId: string | null;
  read: boolean;
  ago: string;
};

/** Compact relative age, e.g. "3m", "2h", "4d". */
function ago(d: Date): string {
  const mins = Math.max(1, Math.round((Date.now() - d.getTime()) / 60000));
  if (mins < 60) return `${mins}m`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.round(hrs / 24)}d`;
}

/** The signed-in user's notifications, newest first. */
export async function getNotifications(): Promise<NotificationItem[]> {
  const me = await getCurrentUser();
  if (!me) return [];
  const rows = await db.notification.findMany({
    where: { userId: me.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return rows.map((n) => ({
    id: n.id,
    kind: n.kind,
    title: n.title,
    body: n.body,
    projectId: n.projectId,
    read: n.read,
    ago: ago(n.createdAt),
  }));
}

/** Count of unread notifications for the signed-in user (for the bell badge). */
export async function getUnreadCount(): Promise<number> {
  const me = await getCurrentUser();
  if (!me) return 0;
  return db.notification.count({ where: { userId: me.id, read: false } });
}

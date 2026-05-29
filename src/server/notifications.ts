import { db } from "@/lib/db";
import { getCurrentUser } from "./auth";
import { relativeAge } from "./format";

export type NotificationItem = {
  id: string;
  kind: string;
  title: string;
  body: string | null;
  projectId: string | null;
  read: boolean;
  ago: string;
};

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
    ago: relativeAge(n.createdAt),
  }));
}

/** Count of unread notifications for the signed-in user (for the bell badge). */
export async function getUnreadCount(): Promise<number> {
  const me = await getCurrentUser();
  if (!me) return 0;
  return db.notification.count({ where: { userId: me.id, read: false } });
}

import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { Notifications } from "@/screens/notifications";
import { getCurrentUser } from "@/server/auth";
import { roleMeta } from "@/lib/personas";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const me = await getCurrentUser();
  if (!me) redirect("/signin");
  const primary = me.roles[0] ?? "owner";
  return (
    <DetailShell title="Notifications" backHref={`/${primary}`} dark={roleMeta(primary).dark}>
      <Notifications />
    </DetailShell>
  );
}

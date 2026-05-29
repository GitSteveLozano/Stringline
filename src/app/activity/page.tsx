import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { Activity } from "@/screens/activity";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function ActivityPage() {
  if (!(await getCurrentUser())) redirect("/signin");
  return (
    <DetailShell title="Activity" backHref="/owner">
      <Activity />
    </DetailShell>
  );
}

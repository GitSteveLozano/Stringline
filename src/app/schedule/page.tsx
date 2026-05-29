import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { Schedule } from "@/screens/schedule";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  if (!(await getCurrentUser())) redirect("/signin");
  return (
    <DetailShell title="Schedule" backHref="/owner/more">
      <Schedule />
    </DetailShell>
  );
}

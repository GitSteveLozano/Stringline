import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { NewAssignment } from "@/screens/new-assignment";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function NewAssignmentPage() {
  if (!(await getCurrentUser())) redirect("/signin");
  return (
    <DetailShell title="Assign crew" backHref="/schedule">
      <NewAssignment />
    </DetailShell>
  );
}

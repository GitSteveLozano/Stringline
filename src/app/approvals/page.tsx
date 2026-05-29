import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { OwnerApprovals } from "@/screens/owner-approvals";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function ApprovalsPage() {
  if (!(await getCurrentUser())) redirect("/signin");
  return (
    <DetailShell title="Approvals" backHref="/owner/team">
      <OwnerApprovals />
    </DetailShell>
  );
}

import { DetailShell } from "@/components/detail-shell";
import { OwnerApprovals } from "@/screens/owner-approvals";

export const dynamic = "force-dynamic";

export default function ApprovalsPage() {
  return (
    <DetailShell title="Approvals" backHref="/owner/team">
      <OwnerApprovals />
    </DetailShell>
  );
}

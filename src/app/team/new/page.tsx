import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { NewMember } from "@/screens/new-member";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function NewMemberPage() {
  if (!(await getCurrentUser())) redirect("/signin");
  return (
    <DetailShell title="Invite teammate" backHref="/owner/team">
      <NewMember />
    </DetailShell>
  );
}

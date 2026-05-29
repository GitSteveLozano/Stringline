import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { NewField } from "@/screens/new-field";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function NewFieldPage() {
  if (!(await getCurrentUser())) redirect("/signin");
  return (
    <DetailShell title="Log report" backHref="/foreman/field">
      <NewField />
    </DetailShell>
  );
}

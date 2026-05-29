import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { NewProject } from "@/screens/new-project";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const me = await getCurrentUser();
  if (!me) redirect("/signin");
  const back = me.roles.includes("owner") ? "/owner/projects" : "/estimator";
  return (
    <DetailShell title="New bid" backHref={back}>
      <NewProject />
    </DetailShell>
  );
}

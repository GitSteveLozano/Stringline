import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { EditProject } from "@/screens/edit-project";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentUser())) redirect("/signin");
  const { id } = await params;
  return (
    <DetailShell title="Edit project" backHref={`/project/${id}`}>
      <EditProject id={id} />
    </DetailShell>
  );
}

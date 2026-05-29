import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { ProjectLog } from "@/screens/project-log";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function ProjectLogPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentUser())) redirect("/signin");
  const { id } = await params;
  return (
    <DetailShell title="Daily log" backHref={`/project/${id}`}>
      <ProjectLog id={id} />
    </DetailShell>
  );
}

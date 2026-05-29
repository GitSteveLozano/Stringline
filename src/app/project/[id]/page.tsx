import type { ComponentType } from "react";
import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { ProjectDetail } from "@/screens/project-detail";
import { getProject } from "@/server/projects";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentUser())) redirect("/signin");
  const { id } = await params;
  const p = await getProject(id);
  const Detail = ProjectDetail as ComponentType<{ id: string }>;
  return (
    <DetailShell title={p?.name ?? "Project"} backHref="/owner/projects">
      <Detail id={id} />
    </DetailShell>
  );
}

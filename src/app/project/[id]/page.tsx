import type { ComponentType } from "react";
import { DetailShell } from "@/components/detail-shell";
import { ProjectDetail } from "@/screens/project-detail";
import { getProject } from "@/server/projects";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getProject(id);
  const Detail = ProjectDetail as ComponentType<{ id: string }>;
  return (
    <DetailShell title={p?.name ?? "Project"} backHref="/owner/projects">
      <Detail id={id} />
    </DetailShell>
  );
}

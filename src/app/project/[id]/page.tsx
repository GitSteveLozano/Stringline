import { DetailShell } from "@/components/detail-shell";
import { ProjectDetail } from "@/screens/project-detail";
import { projects, projectById } from "@/lib/demo-data";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = projectById(id);
  return (
    <DetailShell title={p?.name ?? "Project"} backHref="/owner/projects">
      <ProjectDetail id={id} />
    </DetailShell>
  );
}

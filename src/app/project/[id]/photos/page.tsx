import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { ProjectPhotos } from "@/screens/project-photos";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function ProjectPhotosPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentUser())) redirect("/signin");
  const { id } = await params;
  return (
    <DetailShell title="Site photos" backHref={`/project/${id}`}>
      <ProjectPhotos id={id} />
    </DetailShell>
  );
}

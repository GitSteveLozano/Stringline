import { DetailShell } from "@/components/detail-shell";
import { TakeoffWorkspace } from "@/components/takeoff-workspace";
import { projectById } from "@/lib/demo-data";
import { demoSheets } from "@/lib/takeoff";

export function generateStaticParams() {
  return Object.keys(demoSheets).map((id) => ({ id }));
}

export default async function TakeoffPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = projectById(id);
  return (
    <DetailShell title={p ? p.name : "Takeoff"} backHref="/estimator">
      <TakeoffWorkspace projectId={id} />
    </DetailShell>
  );
}

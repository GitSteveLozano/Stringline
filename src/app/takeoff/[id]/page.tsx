import { notFound } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { TakeoffWorkspace } from "@/components/takeoff-workspace";
import { getTakeoff } from "@/server/estimator";

export const dynamic = "force-dynamic";

export default async function TakeoffPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const takeoff = await getTakeoff(id);
  if (!takeoff) notFound();
  return (
    <DetailShell title={takeoff.name} backHref="/estimator">
      <TakeoffWorkspace
        projectId={id}
        sheets={takeoff.sheets}
        initialMeasurements={takeoff.measurements}
      />
    </DetailShell>
  );
}

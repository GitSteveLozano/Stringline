import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { EditClient } from "@/screens/edit-client";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentUser())) redirect("/signin");
  const { id } = await params;
  return (
    <DetailShell title="Edit client" backHref={`/client/${id}`}>
      <EditClient id={id} />
    </DetailShell>
  );
}

import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { ClientProfile } from "@/screens/client-profile";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentUser())) redirect("/signin");
  const { id } = await params;
  return (
    <DetailShell title="Client" backHref="/estimator/clients">
      <ClientProfile id={id} />
    </DetailShell>
  );
}

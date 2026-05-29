import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { NewClient } from "@/screens/new-client";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function NewClientPage() {
  if (!(await getCurrentUser())) redirect("/signin");
  return (
    <DetailShell title="New client" backHref="/estimator/clients">
      <NewClient />
    </DetailShell>
  );
}

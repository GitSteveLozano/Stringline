import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { NewDispatch } from "@/screens/new-dispatch";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function NewDispatchPage() {
  if (!(await getCurrentUser())) redirect("/signin");
  return (
    <DetailShell title="Dispatch gear" backHref="/dispatch">
      <NewDispatch />
    </DetailShell>
  );
}

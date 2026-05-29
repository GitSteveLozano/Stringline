import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { Dispatch } from "@/screens/dispatch";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function DispatchPage() {
  if (!(await getCurrentUser())) redirect("/signin");
  return (
    <DetailShell title="Dispatch" backHref="/owner/more">
      <Dispatch />
    </DetailShell>
  );
}

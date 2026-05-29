import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { Assets } from "@/screens/assets";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function AssetsPage() {
  if (!(await getCurrentUser())) redirect("/signin");
  return (
    <DetailShell title="Equipment" backHref="/dispatch">
      <Assets />
    </DetailShell>
  );
}

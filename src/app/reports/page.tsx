import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { Reports } from "@/screens/reports";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  if (!(await getCurrentUser())) redirect("/signin");
  return (
    <DetailShell title="Insights" backHref="/owner/money">
      <Reports />
    </DetailShell>
  );
}

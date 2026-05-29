import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { Invoices } from "@/screens/invoices";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function InvoicesPage() {
  if (!(await getCurrentUser())) redirect("/signin");
  return (
    <DetailShell title="Invoices" backHref="/owner/money">
      <Invoices />
    </DetailShell>
  );
}

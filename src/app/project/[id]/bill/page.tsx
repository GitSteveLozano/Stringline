import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { BillDraw } from "@/screens/bill-draw";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function BillDrawPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentUser())) redirect("/signin");
  const { id } = await params;
  return (
    <DetailShell title="Bill a draw" backHref={`/project/${id}`}>
      <BillDraw id={id} />
    </DetailShell>
  );
}

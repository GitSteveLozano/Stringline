import { redirect } from "next/navigation";
import { DetailShell } from "@/components/detail-shell";
import { Settings } from "@/screens/settings";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const me = await getCurrentUser();
  if (!me) redirect("/signin");
  return (
    <DetailShell title="Settings" backHref={`/${me.roles[0] ?? "owner"}/more`}>
      <Settings />
    </DetailShell>
  );
}

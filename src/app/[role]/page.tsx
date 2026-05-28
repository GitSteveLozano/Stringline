import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { resolveScreen } from "@/screens/registry";
import type { Role } from "@/lib/personas";

const ROLES = ["owner", "estimator", "foreman", "worker"] as const;

export function generateStaticParams() {
  return ROLES.map((role) => ({ role }));
}

export default async function RoleHome({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (!ROLES.includes(role as Role)) notFound();
  const r = role as Role;
  const { title, Comp } = resolveScreen(r, null);
  return (
    <AppShell role={r} title={title}>
      <Comp />
    </AppShell>
  );
}

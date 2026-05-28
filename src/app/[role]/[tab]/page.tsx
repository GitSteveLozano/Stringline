import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { resolveScreen } from "@/screens/registry";
import { TABS, type Role } from "@/lib/personas";

const ROLES = ["owner", "estimator", "foreman", "worker"] as const;

export function generateStaticParams() {
  return ROLES.flatMap((role) =>
    TABS[role].slice(1).map((t) => ({ role, tab: t.id }))
  );
}

export default async function RoleTab({
  params,
}: {
  params: Promise<{ role: string; tab: string }>;
}) {
  const { role, tab } = await params;
  if (!ROLES.includes(role as Role)) notFound();
  const r = role as Role;
  if (!TABS[r].some((t) => t.id === tab)) notFound();
  const { title, Comp } = resolveScreen(r, tab);
  return (
    <AppShell role={r} title={title}>
      <Comp />
    </AppShell>
  );
}

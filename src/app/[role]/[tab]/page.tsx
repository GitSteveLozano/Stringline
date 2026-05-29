import type { ComponentType } from "react";
import { notFound, redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { resolveScreen } from "@/screens/registry";
import { getCurrentUser } from "@/server/auth";
import { TABS, type Role } from "@/lib/personas";

// Screens read from the database, so render on each request.
export const dynamic = "force-dynamic";

const ROLES = ["owner", "estimator", "foreman", "worker"] as const;

export default async function RoleTab({
  params,
}: {
  params: Promise<{ role: string; tab: string }>;
}) {
  const { role, tab } = await params;
  if (!ROLES.includes(role as Role)) notFound();
  const r = role as Role;
  if (!TABS[r].some((t) => t.id === tab)) notFound();
  const me = await getCurrentUser();
  if (!me) redirect("/signin");
  if (!me.roles.includes(r)) redirect(`/${me.roles[0] ?? "owner"}`);
  const { title, Comp } = resolveScreen(r, tab);
  const Screen = Comp as ComponentType;
  return (
    <AppShell role={r} title={title} roles={me.roles}>
      <Screen />
    </AppShell>
  );
}

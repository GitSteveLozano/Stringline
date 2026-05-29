import type { ComponentType } from "react";
import { notFound, redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { resolveScreen } from "@/screens/registry";
import { getCurrentUser } from "@/server/auth";
import type { Role } from "@/lib/personas";

// Screens read from the database, so render on each request.
export const dynamic = "force-dynamic";

const ROLES = ["owner", "estimator", "foreman", "worker"] as const;

export default async function RoleHome({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (!ROLES.includes(role as Role)) notFound();
  const r = role as Role;
  const me = await getCurrentUser();
  if (!me) redirect("/signin");
  if (!me.roles.includes(r)) redirect(`/${me.roles[0] ?? "owner"}`);
  const { title, Comp } = resolveScreen(r, null);
  const Screen = Comp as ComponentType;
  return (
    <AppShell role={r} title={title} roles={me.roles}>
      <Screen />
    </AppShell>
  );
}

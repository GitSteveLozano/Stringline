import { notFound } from "next/navigation";
import { AuthShell } from "@/components/auth-shell";
import { Invite } from "@/screens/auth/invite";
import type { Role } from "@/lib/personas";

const INVITE_ROLES = ["worker", "foreman", "estimator"] as const;
type InviteRole = (typeof INVITE_ROLES)[number];

export function generateStaticParams() {
  return INVITE_ROLES.map((role) => ({ role }));
}

export default async function InvitePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (!INVITE_ROLES.includes(role as InviteRole)) notFound();
  const r = role as Exclude<Role, "owner">;
  return (
    <AuthShell dark={r === "worker"}>
      <Invite role={r} />
    </AuthShell>
  );
}

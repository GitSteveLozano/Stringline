"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import {
  verifyPassword,
  createSession,
  destroySession,
  issueOtp,
  consumeOtp,
  getCurrentUser,
} from "./auth";

const ROLE_RANK = ["owner", "estimator", "foreman", "worker"] as const;
function homeFor(roles: string[]): string {
  const first = ROLE_RANK.find((r) => roles.includes(r)) ?? "owner";
  return `/${first}`;
}

async function landAfterLogin(userId: string): Promise<never> {
  await createSession(userId);
  const me = await getCurrentUser();
  redirect(homeFor(me?.roles ?? []));
}

/** Office sign-in: email + password. */
export async function signInPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const user = await db.user.findUnique({ where: { email }, select: { id: true, passwordHash: true } });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    redirect("/signin?error=invalid");
  }
  await landAfterLogin(user.id);
}

/** Worker step 1: request an SMS code (dev surfaces it on the next screen). */
export async function requestOtp(formData: FormData) {
  const phone = String(formData.get("phone") ?? "").trim();
  const user = await db.user.findUnique({ where: { phone }, select: { id: true } });
  if (!user) redirect("/signin/phone?error=unknown");
  const code = await issueOtp(phone);
  // No SMS provider in dev — pass the code through so the next screen can show it.
  redirect(`/signin/code?phone=${encodeURIComponent(phone)}&dev=${code}`);
}

/** Worker step 2: verify the code. */
export async function verifyOtp(formData: FormData) {
  const phone = String(formData.get("phone") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();
  const ok = await consumeOtp(phone, code);
  if (!ok) redirect(`/signin/code?phone=${encodeURIComponent(phone)}&error=badcode`);
  const user = await db.user.findUnique({ where: { phone }, select: { id: true } });
  if (!user) redirect("/signin/phone?error=unknown");
  await landAfterLogin(user.id);
}

/**
 * Dev shortcut for the SSO / magic-link / onboarding buttons (no real
 * provider wired). Signs in as the workspace owner, or a given role's user.
 */
export async function devSignIn(role: "owner" | "estimator" | "foreman" | "worker" = "owner") {
  const base = { owner: "OWNER", estimator: "ESTIMATOR", foreman: "FOREMAN", worker: "WORKER" }[role] as
    | "OWNER" | "ESTIMATOR" | "FOREMAN" | "WORKER";
  const m = await db.membership.findFirst({
    where: { role: base },
    orderBy: { createdAt: "asc" },
    select: { userId: true },
  });
  if (!m) redirect("/signin?error=noseed");
  await landAfterLogin(m.userId);
}

export async function signOut() {
  await destroySession();
  redirect("/signin");
}

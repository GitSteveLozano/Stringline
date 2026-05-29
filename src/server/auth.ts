import { cookies } from "next/headers";
import { randomBytes, scryptSync, timingSafeEqual, createHmac } from "node:crypto";
import { db } from "@/lib/db";

const SESSION_COOKIE = "sl_session";
const OTP_COOKIE = "sl_otp";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
const OTP_TTL_MS = 1000 * 60 * 10; // 10 minutes

function secret(): string {
  return process.env.AUTH_SECRET || "dev-secret-not-for-prod";
}

const b64url = (s: string | Buffer) =>
  Buffer.from(s).toString("base64url");

function sign(payloadB64: string): string {
  return createHmac("sha256", secret()).update(payloadB64).digest("base64url");
}

/** Build a signed, tamper-evident token: payload.signature (both base64url). */
function seal(obj: Record<string, unknown>): string {
  const payload = b64url(JSON.stringify(obj));
  return `${payload}.${sign(payload)}`;
}

/** Verify + decode a sealed token, or null if tampered/expired. */
function unseal<T = Record<string, unknown>>(token: string | undefined): T | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const obj = JSON.parse(Buffer.from(payload, "base64url").toString()) as T & { exp?: number };
    if (obj.exp && Date.now() > obj.exp) return null;
    return obj;
  } catch {
    return null;
  }
}

// ── Passwords (scrypt; salt$hash) ──────────────────────────────

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string | null): boolean {
  if (!stored || !stored.includes("$")) return false;
  const [salt, hash] = stored.split("$");
  const got = scryptSync(password, salt, 64);
  const want = Buffer.from(hash, "hex");
  return got.length === want.length && timingSafeEqual(got, want);
}

// ── Session cookie ─────────────────────────────────────────────

export async function createSession(userId: string): Promise<void> {
  const token = seal({ uid: userId, exp: Date.now() + SESSION_TTL_MS });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export type SessionUser = {
  id: string;
  name: string;
  roles: ("owner" | "estimator" | "foreman" | "worker")[];
  workspaceId: string;
};

const BASE_TO_ROLE: Record<string, SessionUser["roles"][number]> = {
  OWNER: "owner",
  ESTIMATOR: "estimator",
  FOREMAN: "foreman",
  WORKER: "worker",
};

/** The signed-in user (with the hats they may wear), or null. */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  const session = unseal<{ uid: string }>(jar.get(SESSION_COOKIE)?.value);
  if (!session?.uid) return null;
  const user = await db.user.findUnique({
    where: { id: session.uid },
    select: {
      id: true,
      name: true,
      memberships: { select: { role: true, workspaceId: true }, orderBy: { createdAt: "asc" } },
    },
  });
  if (!user || user.memberships.length === 0) return null;
  const roles = [...new Set(user.memberships.map((m) => BASE_TO_ROLE[m.role]))];
  return { id: user.id, name: user.name, roles, workspaceId: user.memberships[0].workspaceId };
}

// ── OTP (cookie-based challenge; dev surfaces the code) ────────

/** Issue a 6-digit code for a phone, stored in a signed cookie. Returns the code. */
export async function issueOtp(phone: string): Promise<string> {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const jar = await cookies();
  jar.set(OTP_COOKIE, seal({ phone, code, exp: Date.now() + OTP_TTL_MS }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: OTP_TTL_MS / 1000,
  });
  return code;
}

/** Check a submitted code against the active challenge for a phone. */
export async function consumeOtp(phone: string, code: string): Promise<boolean> {
  const jar = await cookies();
  const ch = unseal<{ phone: string; code: string }>(jar.get(OTP_COOKIE)?.value);
  const ok = !!ch && ch.phone === phone && ch.code === code;
  if (ok) jar.delete(OTP_COOKIE);
  return ok;
}

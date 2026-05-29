import type { BaseRole } from "@prisma/client";

/** Two-letter initials from a person's name, e.g. "Ana Castillo" → "AC". */
export const initials = (name: string) =>
  name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

/** Compact relative age from a past date, e.g. "3m", "2h", "4d". */
export function relativeAge(d: Date): string {
  const mins = Math.max(1, Math.round((Date.now() - d.getTime()) / 60000));
  if (mins < 60) return `${mins}m`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.round(hrs / 24)}d`;
}

/** Display label for a base role (WORKER reads as "Crew"). */
export const baseRoleLabel = (role: BaseRole | string): string =>
  role === "FOREMAN" ? "Foreman" : role === "OWNER" ? "Owner" : role === "ESTIMATOR" ? "Estimator" : "Crew";

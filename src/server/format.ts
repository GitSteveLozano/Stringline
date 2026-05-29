import type { BaseRole } from "@prisma/client";

/** Two-letter initials from a person's name, e.g. "Ana Castillo" → "AC". */
export const initials = (name: string) =>
  name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

/** Display label for a base role (WORKER reads as "Crew"). */
export const baseRoleLabel = (role: BaseRole | string): string =>
  role === "FOREMAN" ? "Foreman" : role === "OWNER" ? "Owner" : role === "ESTIMATOR" ? "Estimator" : "Crew";

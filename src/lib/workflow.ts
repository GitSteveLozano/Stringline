import type { ProjectStatus, LostReason } from "@prisma/client";
import { LIFECYCLE } from "@/lib/demo-data";

/**
 * Pure workflow math, factored out of the server actions / query layer so it
 * can be unit-tested without a database. Each helper mirrors exactly what its
 * caller relies on; see workflow.test.ts.
 */

/** The immediate next lifecycle stage, or null at the terminal (PAID) state. */
export function nextStatus(status: ProjectStatus): ProjectStatus | null {
  const i = LIFECYCLE.indexOf(status);
  if (i < 0 || i >= LIFECYCLE.length - 1) return null;
  return LIFECYCLE[i + 1];
}

/** Parse a currency-ish string to a number; null when no digits are present.
 *  `allowNegative` keeps a leading minus (change-order credits). */
export function parseMoney(input: string, allowNegative = false): number | null {
  const cleaned = input.replace(allowNegative ? /[^0-9.-]/g : /[^0-9.]/g, "");
  if (!/[0-9]/.test(cleaned)) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

const LOST_REASONS = ["PRICE", "TIMING", "SCOPE", "GHOSTED", "COMPETITOR", "OTHER"];

/** Map free-ish input to a valid LostReason, defaulting to OTHER. */
export function normalizeLostReason(raw: string): LostReason {
  const up = raw.toUpperCase();
  return (LOST_REASONS.includes(up) ? up : "OTHER") as LostReason;
}

/** Next per-project change-order number (1-based). */
export function nextChangeOrderNumber(lastNumber: number | null | undefined): number {
  return (lastNumber ?? 0) + 1;
}

/** Contract value = base + the sum of accepted change-order deltas. */
export function contractTotal(base: number, acceptedDeltas: number[]): number {
  return base + acceptedDeltas.reduce((s, d) => s + d, 0);
}

/** Extended takeoff total: Σ quantity × scope sell rate (rounded). */
export function takeoffTotal(
  measurements: { code: string; qty: number }[],
  rates: Record<string, number> | Map<string, number>
): number {
  const rateOf = (code: string) =>
    rates instanceof Map ? rates.get(code) ?? 0 : rates[code] ?? 0;
  return Math.round(measurements.reduce((s, m) => s + m.qty * rateOf(m.code), 0));
}

/** Win rate over decided bids (won vs lost); null until something is decided. */
export function winRate(won: number, lost: number): number | null {
  const decided = won + lost;
  return decided > 0 ? won / decided : null;
}

/** Shared server-side date helpers. */
export const DAY_MS = 24 * 60 * 60 * 1000;

/** Monday 00:00 of the current work week. */
export function weekStart(now = new Date()): Date {
  const d = new Date(now);
  const dow = (d.getDay() + 6) % 7; // 0 = Monday
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - dow);
  return d;
}

/** Derive the current day-of within a project schedule (1..durationDays). */
export function dayOfSchedule(startedOn: Date | null, durationDays: number | null): number | undefined {
  if (!startedOn || durationDays == null) return undefined;
  const elapsed = Math.floor((Date.now() - startedOn.getTime()) / DAY_MS) + 1;
  return Math.max(1, Math.min(durationDays, elapsed));
}

"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";
import { weekStart } from "./dates";

// ── Foreman ────────────────────────────────────────────────────

/** Mark a field report (blocker/photo/note) as handled. */
export async function resolveFieldReport(id: string) {
  await db.fieldReport.update({ where: { id }, data: { resolved: true } });
  revalidatePath("/foreman/field");
  revalidatePath("/foreman");
}

/** Submit the daily log to the owner. */
export async function submitDailyLog(id: string) {
  await db.dailyLog.update({
    where: { id },
    data: { submitted: true, submittedAt: new Date() },
  });
  revalidatePath("/foreman/log");
}

/** Foreman first-line approval of the week's time entries. */
export async function submitWeekForApproval() {
  const workspaceId = await getActiveWorkspaceId();
  await db.timeEntry.updateMany({
    where: { date: { gte: weekStart() }, project: { workspaceId }, clockOut: { not: null } },
    data: { approval: "FOREMAN_APPROVED" },
  });
  revalidatePath("/foreman/time");
}

// ── Worker ─────────────────────────────────────────────────────

/** Toggle a scope checklist step done/undone. */
export async function toggleScopeStep(id: string) {
  const step = await db.scopeStep.findUnique({ where: { id }, select: { done: true } });
  if (!step) return;
  await db.scopeStep.update({
    where: { id },
    data: { done: !step.done, completedAt: !step.done ? new Date() : null },
  });
  revalidatePath("/worker/scope");
  revalidatePath("/worker");
}

const hhmm = () => new Date().toTimeString().slice(0, 5);

/** Worker clock in / out / break toggles on a project. */
export async function clockIn(projectId: string, userId: string) {
  const open = await db.timeEntry.findFirst({ where: { userId, clockOut: null } });
  if (open) return;
  await db.timeEntry.create({
    data: { projectId, userId, date: new Date(), clockIn: hhmm(), source: "AUTO" },
  });
  revalidatePath("/worker");
}

export async function clockOut(entryId: string) {
  const entry = await db.timeEntry.findUnique({ where: { id: entryId } });
  if (!entry || !entry.clockIn) return;
  const [inH, inM] = entry.clockIn.split(":").map(Number);
  const out = new Date();
  const hours = Math.max(0, (out.getHours() * 60 + out.getMinutes() - inH * 60 - inM) / 60);
  await db.timeEntry.update({
    where: { id: entryId },
    data: { clockOut: hhmm(), pausedAt: null, hours: Math.round(hours * 10) / 10 },
  });
  revalidatePath("/worker");
}

export async function toggleBreak(entryId: string) {
  const entry = await db.timeEntry.findUnique({ where: { id: entryId }, select: { pausedAt: true } });
  if (!entry) return;
  await db.timeEntry.update({
    where: { id: entryId },
    data: { pausedAt: entry.pausedAt ? null : hhmm() },
  });
  revalidatePath("/worker");
}

/** Capture a scope-tagged field photo for the worker's current project. */
export async function addWorkerPhoto(projectId: string, userId: string, tag = "EPS") {
  await db.photo.create({ data: { projectId, userId, tag } });
  revalidatePath("/worker/log");
}

// ── Owner approvals ────────────────────────────────────────────

export async function decideApproval(id: string, decision: "APPROVED" | "DENIED") {
  await db.approval.update({
    where: { id },
    data: { status: decision, decidedAt: new Date() },
  });
  revalidatePath("/approvals");
  revalidatePath("/owner/team");
  revalidatePath("/owner");
}

// ── Estimator takeoff ──────────────────────────────────────────

/** Confirm a sheet's scale (the scale gate). */
export async function verifySheetScale(sheetId: string) {
  await db.sheet.update({ where: { id: sheetId }, data: { scaleVerifiedAt: new Date() } });
  revalidatePath("/estimator");
}

/** Persist a manually-drawn takeoff measurement. */
export async function saveMeasurement(input: {
  projectId: string;
  sheetId: string;
  scope: string;
  points: { x: number; y: number }[];
  sf: number;
}) {
  await db.measurement.create({
    data: {
      projectId: input.projectId,
      sheetId: input.sheetId,
      code: input.scope,
      qty: input.sf,
      unit: "sqft",
      pointsJson: input.points,
      source: "MANUAL",
    },
  });
  revalidatePath(`/takeoff/${input.projectId}`);
}

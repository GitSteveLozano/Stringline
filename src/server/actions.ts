"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";
import { weekStart } from "./dates";
import { LIFECYCLE } from "@/lib/demo-data";
import type { ProjectStatus } from "@prisma/client";

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
    // Only promote not-yet-reviewed entries; never demote owner-approved ones.
    where: { date: { gte: weekStart() }, project: { workspaceId }, clockOut: { not: null }, approval: "PENDING" },
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
  const open = await db.timeEntry.findFirst({
    where: { userId, clockOut: null },
    orderBy: { date: "desc" },
  });
  if (open) {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    if (open.date >= startOfToday) return; // already on the clock today
    // Close out a forgotten prior-day entry before opening a new one.
    await db.timeEntry.update({ where: { id: open.id }, data: { clockOut: open.clockIn ?? hhmm() } });
  }
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
  let mins = out.getHours() * 60 + out.getMinutes() - (inH * 60 + inM);
  if (mins < 0) mins += 24 * 60; // shift crossed midnight
  await db.timeEntry.update({
    where: { id: entryId },
    data: { clockOut: hhmm(), pausedAt: null, hours: Math.round((mins / 60) * 10) / 10 },
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

// ── Project lifecycle ──────────────────────────────────────────

/**
 * Advance a project one step along the lifecycle (Drafting → … → Paid).
 * `to` must be the immediate next stage; the guard keeps the state machine
 * forward-only and tolerant of stale/double submits. Side effects are stamped
 * per transition (started date, completion progress).
 */
export async function advanceProjectStatus(id: string, to: ProjectStatus) {
  const workspaceId = await getActiveWorkspaceId();
  const project = await db.project.findFirst({
    where: { id, workspaceId },
    select: { status: true, startedOn: true },
  });
  if (!project) return;

  // Only honor a move to the immediate next stage; ignore otherwise (no-op).
  const next = LIFECYCLE[LIFECYCLE.indexOf(project.status) + 1];
  if (to !== next) return;

  const data: { status: ProjectStatus; startedOn?: Date; progress?: number } = { status: to };
  if (to === "IN_PROGRESS" && !project.startedOn) data.startedOn = new Date();
  if (to === "DONE") data.progress = 1;

  await db.project.update({ where: { id }, data });

  revalidatePath(`/project/${id}`);
  revalidatePath("/owner");
  revalidatePath("/owner/projects");
  revalidatePath("/estimator");
  revalidatePath("/estimator/queue");
  revalidatePath("/owner/money");
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

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";
import { getCurrentUser } from "./auth";
import { weekStart } from "./dates";
import { LIFECYCLE } from "@/lib/demo-data";
import type { ProjectStatus, LostReason } from "@prisma/client";

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

const CLIENT_KINDS = ["BUILDER", "GC", "OWNER", "ARCHITECT"];

/**
 * Create a new bid (DRAFTING project). The client is either an existing one
 * (clientId) or created on the fly from a typed name; a new client name wins
 * over a selected one. Redirects into the fresh project's detail screen.
 */
export async function createProject(formData: FormData) {
  const workspaceId = await getActiveWorkspaceId();

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return; // the form marks name required; ignore empty submits

  const address = String(formData.get("address") ?? "").trim() || null;
  const rawValue = String(formData.get("contractValue") ?? "").replace(/[^0-9.]/g, "");
  const contractValue = rawValue ? Number(rawValue) : null;

  // Resolve the client: a typed new name takes precedence over the picker.
  const newClientName = String(formData.get("newClient") ?? "").trim();
  let clientId = String(formData.get("clientId") ?? "").trim();
  if (newClientName) {
    const kindRaw = String(formData.get("clientKind") ?? "BUILDER").toUpperCase();
    const kind = CLIENT_KINDS.includes(kindRaw) ? kindRaw : "BUILDER";
    const client = await db.client.create({ data: { workspaceId, name: newClientName, kind } });
    clientId = client.id;
  } else if (clientId) {
    // Guard against picking a client from another workspace.
    const owned = await db.client.findFirst({ where: { id: clientId, workspaceId }, select: { id: true } });
    if (!owned) return;
  } else {
    return; // neither an existing nor a new client — nothing to attach to
  }

  const project = await db.project.create({
    data: {
      workspaceId,
      clientId,
      name,
      address,
      contractValue,
      status: "DRAFTING",
      health: "PENDING",
    },
    select: { id: true },
  });

  revalidatePath("/owner");
  revalidatePath("/owner/projects");
  revalidatePath("/estimator");
  revalidatePath("/estimator/queue");
  revalidatePath("/estimator/clients");
  redirect(`/project/${project.id}`);
}


const LOST_REASONS = ["PRICE", "TIMING", "SCOPE", "GHOSTED", "COMPETITOR", "OTHER"];

/**
 * Mark a bid lost: stamp the reason (+ optional note) and archive it. Only
 * pre-acceptance bids (Drafting / Sent) can be lost; once work is accepted it
 * runs its lifecycle instead. The estimator Queue reads lostReason to bucket
 * these into "Lost" and compute win rate.
 */
export async function markProjectLost(id: string, formData: FormData) {
  const workspaceId = await getActiveWorkspaceId();
  const project = await db.project.findFirst({
    where: { id, workspaceId },
    select: { status: true },
  });
  if (!project) return;
  if (project.status !== "DRAFTING" && project.status !== "SENT") return;

  const reasonRaw = String(formData.get("reason") ?? "").toUpperCase();
  const reason = (LOST_REASONS.includes(reasonRaw) ? reasonRaw : "OTHER") as LostReason;
  const note = String(formData.get("note") ?? "").trim() || null;

  await db.project.update({
    where: { id },
    data: { lostReason: reason, lostNote: note, status: "ARCHIVED" },
  });

  revalidatePath(`/project/${id}`);
  revalidatePath("/owner");
  revalidatePath("/owner/projects");
  revalidatePath("/estimator");
  revalidatePath("/estimator/queue");
}

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

// ── Change orders ──────────────────────────────────────────────

/**
 * Log a change order against a project and send it for approval. The number
 * auto-increments per project; the delta may be negative (a credit). Accepted
 * COs fold into the contract value on the detail screen.
 */
export async function addChangeOrder(projectId: string, formData: FormData) {
  const me = await getCurrentUser();
  if (!me) return;
  const project = await db.project.findFirst({
    where: { id: projectId, workspaceId: me.workspaceId },
    select: { id: true },
  });
  if (!project) return;

  const description = String(formData.get("description") ?? "").trim();
  const delta = Number(String(formData.get("delta") ?? "").replace(/[^0-9.-]/g, ""));
  if (!description || !Number.isFinite(delta) || delta === 0) return;

  const last = await db.changeOrder.findFirst({
    where: { projectId },
    orderBy: { number: "desc" },
    select: { number: true },
  });

  await db.changeOrder.create({
    data: {
      projectId,
      number: (last?.number ?? 0) + 1,
      description,
      valueDelta: delta,
      status: "SENT",
      createdById: me.id,
    },
  });

  revalidatePath(`/project/${projectId}`);
  revalidatePath("/owner/money");
}

/** Accept or reject a change order; accepting stamps the approver. */
export async function decideChangeOrder(id: string, decision: "ACCEPTED" | "REJECTED") {
  const me = await getCurrentUser();
  if (!me) return;
  const co = await db.changeOrder.findFirst({
    where: { id, project: { workspaceId: me.workspaceId } },
    select: { projectId: true },
  });
  if (!co) return;

  await db.changeOrder.update({
    where: { id },
    data: { status: decision, approvedById: decision === "ACCEPTED" ? me.id : null },
  });

  revalidatePath(`/project/${co.projectId}`);
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

/**
 * Price the saved takeoff into the project's estimate: sum each measurement's
 * quantity × its scope sell rate and write the total to contractValue. Returns
 * the new total so the canvas can confirm. No measurements / no rates → 0.
 */
export async function priceTakeoff(projectId: string): Promise<number> {
  const workspaceId = await getActiveWorkspaceId();
  const project = await db.project.findFirst({ where: { id: projectId, workspaceId }, select: { id: true } });
  if (!project) return 0;

  const [measurements, scopeItems] = await Promise.all([
    db.measurement.findMany({ where: { projectId }, select: { code: true, qty: true } }),
    db.scopeItem.findMany({ where: { workspaceId }, select: { code: true, sellRate: true } }),
  ]);
  const rate = new Map(scopeItems.map((s) => [s.code, Number(s.sellRate)]));

  const total = Math.round(
    measurements.reduce((sum, m) => sum + m.qty * (rate.get(m.code) ?? 0), 0)
  );

  await db.project.update({ where: { id: projectId }, data: { contractValue: total } });

  revalidatePath(`/takeoff/${projectId}`);
  revalidatePath(`/project/${projectId}`);
  revalidatePath("/owner/projects");
  revalidatePath("/estimator");
  revalidatePath("/estimator/queue");
  return total;
}

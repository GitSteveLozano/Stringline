import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";

export type TakeoffCard = {
  id: string;
  name: string;
  client: string;
  state: string;
  tone: "live" | undefined;
};

/** Bids on the estimator desk: drafting/sent projects with takeoff state. */
export async function getTakeoffs(): Promise<{ cards: TakeoffCard[]; finishedAi: number }> {
  const workspaceId = await getActiveWorkspaceId();
  const projects = await db.project.findMany({
    where: { workspaceId, status: { in: ["DRAFTING", "SENT"] } },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      client: { select: { name: true } },
      sheets: { select: { id: true } },
      measurements: { where: { source: "AI" }, select: { id: true } },
    },
  });

  let finishedAi = 0;
  const cards = projects.map((p) => {
    const hasAi = p.measurements.length > 0;
    if (hasAi) finishedAi += 1;
    const state = hasAi ? "AI READY" : p.sheets.length > 0 ? "IN PROGRESS" : "DRAFT";
    return {
      id: p.id,
      name: p.name,
      client: p.client.name,
      state,
      tone: hasAi ? ("live" as const) : undefined,
    };
  });

  return { cards, finishedAi };
}

export type TakeoffSheet = { id: string; name: string; scale: number; confidence: string; verified: boolean };
export type TakeoffMeasurement = {
  id: string;
  scope: string;
  points: { x: number; y: number }[];
  sf: number;
  source: "manual" | "ai";
  confidence?: "HIGH" | "MED" | "LOW";
};

/** Full takeoff for a project: sheets (scale gate state) + measurements. */
export async function getTakeoff(projectId: string): Promise<{
  name: string;
  sheets: TakeoffSheet[];
  measurements: TakeoffMeasurement[];
} | null> {
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: {
      name: true,
      sheets: { orderBy: { sort: "asc" } },
      measurements: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!project) return null;

  return {
    name: project.name,
    sheets: project.sheets.map((s) => ({
      id: s.id,
      name: s.name,
      scale: s.scale,
      confidence: s.scaleConfidence,
      verified: s.scaleVerifiedAt != null,
    })),
    measurements: project.measurements.map((m) => ({
      id: m.id,
      scope: m.code,
      points: (m.pointsJson as { x: number; y: number }[] | null) ?? [],
      sf: Math.round(m.qty),
      source: m.source === "AI" ? "ai" : "manual",
      confidence: m.confidence ?? undefined,
    })),
  };
}

// ── Queue: the bid pipeline by stage ───────────────────────────
export type QueueItem = { id: string; name: string; client: string; value: number };
export type QueueStage = { key: string; label: string; tone?: "live" | "good" | "bad"; items: QueueItem[]; total: number };
export type BidQueue = { stages: QueueStage[]; inFlightValue: number; winRate: number | null };

const WON_STATUSES = ["ACCEPTED", "IN_PROGRESS", "DONE", "PAID"] as const;

/** Estimator bid pipeline: drafting → out for bid → won, plus any lost bids. */
export async function getBidQueue(): Promise<BidQueue> {
  const workspaceId = await getActiveWorkspaceId();
  const projects = await db.project.findMany({
    where: { workspaceId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
      status: true,
      lostReason: true,
      contractValue: true,
      client: { select: { name: true } },
    },
  });

  const toItem = (p: (typeof projects)[number]): QueueItem => ({
    id: p.id,
    name: p.name,
    client: p.client.name,
    value: Number(p.contractValue ?? 0),
  });

  const lost = projects.filter((p) => p.lostReason != null);
  const lostIds = new Set(lost.map((p) => p.id));
  const live = projects.filter((p) => !lostIds.has(p.id));

  const drafting = live.filter((p) => p.status === "DRAFTING").map(toItem);
  const sent = live.filter((p) => p.status === "SENT").map(toItem);
  const won = live.filter((p) => (WON_STATUSES as readonly string[]).includes(p.status)).map(toItem);
  const lostItems = lost.map(toItem);

  const sum = (items: QueueItem[]) => items.reduce((s, i) => s + i.value, 0);
  const stages: QueueStage[] = [
    { key: "drafting", label: "Drafting", items: drafting, total: sum(drafting) },
    { key: "sent", label: "Out for bid", tone: "live", items: sent, total: sum(sent) },
    { key: "won", label: "Won", tone: "good", items: won, total: sum(won) },
  ];
  if (lostItems.length) stages.push({ key: "lost", label: "Lost", tone: "bad", items: lostItems, total: sum(lostItems) });

  // Win rate over decided bids (won vs lost); null until something has been decided.
  const decided = won.length + lostItems.length;
  const winRate = decided > 0 ? won.length / decided : null;

  return { stages, inFlightValue: sum(drafting) + sum(sent), winRate };
}

// ── Clients: estimator's book of business ──────────────────────
export type ClientRow = {
  id: string;
  name: string;
  kind: string;
  isLead: boolean;
  projectCount: number;
  activeValue: number;
};

const KIND_LABEL: Record<string, string> = { BUILDER: "Builder", GC: "General contractor", OWNER: "Owner", ARCHITECT: "Architect" };
export const clientKindLabel = (kind: string) => KIND_LABEL[kind] ?? kind;

/** Clients with their pipeline footprint; leads float to the top. */
export async function getEstimatorClients(): Promise<ClientRow[]> {
  const workspaceId = await getActiveWorkspaceId();
  const clients = await db.client.findMany({
    where: { workspaceId },
    orderBy: [{ isLead: "desc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      kind: true,
      isLead: true,
      projects: { select: { contractValue: true } },
    },
  });

  return clients.map((c) => ({
    id: c.id,
    name: c.name,
    kind: c.kind,
    isLead: c.isLead,
    projectCount: c.projects.length,
    activeValue: c.projects.reduce((s, p) => s + Number(p.contractValue ?? 0), 0),
  }));
}

// ── Library: the pricing book (scope items / assemblies) ───────
export type ScopeRow = {
  id: string;
  code: string;
  name: string;
  unit: string;
  cost: number;
  sell: number;
  marginPct: number | null;
  color: string | null;
};

/** Cost/sell rates per scope, with computed gross margin. */
export async function getScopeLibrary(): Promise<ScopeRow[]> {
  const workspaceId = await getActiveWorkspaceId();
  const items = await db.scopeItem.findMany({
    where: { workspaceId },
    orderBy: { code: "asc" },
    select: { id: true, code: true, name: true, unit: true, costRate: true, sellRate: true, color: true },
  });

  return items.map((s) => {
    const cost = Number(s.costRate);
    const sell = Number(s.sellRate);
    return {
      id: s.id,
      code: s.code,
      name: s.name,
      unit: s.unit,
      cost,
      sell,
      marginPct: sell > 0 ? (sell - cost) / sell : null,
      color: s.color,
    };
  });
}

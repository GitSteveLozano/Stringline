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

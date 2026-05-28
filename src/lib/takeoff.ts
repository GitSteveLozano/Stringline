/**
 * Takeoff domain: sheets, scale, measurements, and real polygon geometry.
 * The canvas works in viewBox units; `scale` converts units → feet, so areas
 * compute in real square feet. Scale must be verified per sheet before the
 * takeoff is trusted (the scale gate).
 */

export type Confidence = "HIGH" | "MED" | "LOW";

export const VBW = 320;
export const VBH = 220;

export type Sheet = {
  id: string;
  name: string;
  /** Feet per viewBox unit. AI-detected; LOW/MED must be confirmed. */
  scale: number;
  confidence: Confidence;
};

export type Pt = { x: number; y: number };

export type Measurement = {
  id: string;
  scope: string; // scope code
  points: Pt[];
  sf: number;
  source: "manual" | "ai";
  confidence?: Confidence;
};

export type Scope = { code: string; name: string; color: string };

export const SCOPES: Scope[] = [
  { code: "EPS", name: "EPS insulation", color: "#E8A86B" },
  { code: "BASE", name: "Basecoat", color: "#C77B4F" },
  { code: "STONE", name: "Cultured stone", color: "#7A8C6F" },
  { code: "CAULK", name: "Caulking (lf)", color: "#6FA8A0" },
];

export function scopeColor(code: string): string {
  return SCOPES.find((s) => s.code === code)?.color ?? "#8B8474";
}

export const demoSheets: Record<string, Sheet[]> = {
  "p-foothills": [
    { id: "A2.1", name: "A2.1 · North + East elevations", scale: 0.18, confidence: "HIGH" },
    { id: "A2.2", name: "A2.2 · South + West elevations", scale: 0.18, confidence: "MED" },
    { id: "A2.3", name: "A2.3 · Sections + details", scale: 0.2, confidence: "LOW" },
  ],
  "p-riverbend": [
    { id: "A3.1", name: "A3.1 · Storefront elevations", scale: 0.16, confidence: "HIGH" },
    { id: "A3.2", name: "A3.2 · Rear elevation", scale: 0.16, confidence: "MED" },
  ],
};

export function sheetsFor(projectId: string): Sheet[] {
  return demoSheets[projectId] ?? demoSheets["p-foothills"];
}

/** Shoelace formula — absolute polygon area in viewBox units². */
export function polygonAreaUnits(points: Pt[]): number {
  if (points.length < 3) return 0;
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    sum += a.x * b.y - b.x * a.y;
  }
  return Math.abs(sum) / 2;
}

/** Polygon area in square feet, given a sheet scale (ft per unit). */
export function areaSf(points: Pt[], scale: number): number {
  return Math.round(polygonAreaUnits(points) * scale * scale);
}

/** A few canned AI-detected measurements, used to demo the review flow. */
export function aiDraft(scale: number): Measurement[] {
  const polys: { scope: string; confidence: Confidence; points: Pt[] }[] = [
    { scope: "EPS", confidence: "HIGH", points: [{ x: 30, y: 40 }, { x: 150, y: 38 }, { x: 152, y: 150 }, { x: 32, y: 152 }] },
    { scope: "BASE", confidence: "HIGH", points: [{ x: 170, y: 40 }, { x: 290, y: 42 }, { x: 288, y: 150 }, { x: 168, y: 150 }] },
    { scope: "STONE", confidence: "MED", points: [{ x: 60, y: 165 }, { x: 130, y: 165 }, { x: 130, y: 205 }, { x: 60, y: 205 }] },
    { scope: "EPS", confidence: "LOW", points: [{ x: 200, y: 162 }, { x: 270, y: 160 }, { x: 272, y: 200 }, { x: 198, y: 202 }] },
  ];
  return polys.map((p, i) => ({
    id: `ai-${i}`,
    scope: p.scope,
    points: p.points,
    sf: areaSf(p.points, scale),
    source: "ai",
    confidence: p.confidence,
  }));
}

"use client";

import { useState, useRef, useTransition } from "react";
import { Pad, Stack, Eyebrow, H2, SectionBar, Mono, Pill, Button, Card, Spread } from "@/components/ui";
import {
  SCOPES,
  scopeColor,
  areaSf,
  aiDraft,
  VBW,
  VBH,
  type Pt,
  type Measurement,
  type Confidence,
} from "@/lib/takeoff";
import { verifySheetScale, saveMeasurement, priceTakeoff, saveAiTakeoff, deleteMeasurement } from "@/server/actions";
import type { TakeoffSheet, TakeoffMeasurement } from "@/server/estimator";

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/** Temp ids (pre-save) start with m-/ai-; persisted rows carry a cuid. */
const isPersisted = (id: string) => !id.startsWith("m-") && !id.startsWith("ai-");

function confTone(c?: Confidence): "good" | "bad" | undefined {
  if (c === "HIGH") return "good";
  if (c === "LOW") return "bad";
  return undefined;
}

export function TakeoffWorkspace({
  projectId,
  sheets,
  initialMeasurements,
  rates,
}: {
  projectId: string;
  sheets: TakeoffSheet[];
  initialMeasurements: TakeoffMeasurement[];
  rates: Record<string, number>;
}) {
  const scale = sheets[0]?.scale ?? 0.18;

  const [verified, setVerified] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sheets.map((s) => [s.id, s.verified]))
  );
  const [view, setView] = useState<"sheets" | "canvas">("sheets");
  const allVerified = sheets.every((s) => verified[s.id]);

  // Canvas state — seeded from the persisted takeoff.
  const [measurements, setMeasurements] = useState<Measurement[]>(() =>
    initialMeasurements.map((m) => ({
      id: m.id,
      scope: m.scope,
      points: m.points,
      sf: m.sf,
      source: m.source,
      confidence: m.confidence,
    }))
  );
  const [current, setCurrent] = useState<Pt[]>([]);
  const [activeScope, setActiveScope] = useState(SCOPES[0].code);
  const [aiRan, setAiRan] = useState(false);
  const [pricing, startPricing] = useTransition();
  const [pushedTotal, setPushedTotal] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  function pushToEstimate() {
    startPricing(async () => {
      const total = await priceTakeoff(projectId);
      setPushedTotal(total);
    });
  }

  function confirmScale(sheetId: string) {
    setVerified((v) => ({ ...v, [sheetId]: true }));
    void verifySheetScale(sheetId);
  }

  function toPoint(e: React.MouseEvent): Pt {
    const svg = svgRef.current!;
    const r = svg.getBoundingClientRect();
    return {
      x: Math.round(((e.clientX - r.left) / r.width) * VBW),
      y: Math.round(((e.clientY - r.top) / r.height) * VBH),
    };
  }

  function finish() {
    if (current.length < 3) return;
    const sf = areaSf(current, scale);
    const points = current;
    const tempId = `m-${Date.now()}`;
    setMeasurements((m) => [...m, { id: tempId, scope: activeScope, points, sf, source: "manual" }]);
    setCurrent([]);
    if (sheets[0]) {
      // Reconcile the temp id with the persisted row id so it can be deleted.
      void saveMeasurement({ projectId, sheetId: sheets[0].id, scope: activeScope, points, sf }).then((realId) =>
        setMeasurements((m) => m.map((x) => (x.id === tempId ? { ...x, id: realId } : x)))
      );
    }
  }

  function removeMeasurement(id: string) {
    setMeasurements((m) => m.filter((x) => x.id !== id));
    if (isPersisted(id)) void deleteMeasurement(id);
  }

  function runAi() {
    const draft = aiDraft(scale);
    setMeasurements((m) => [...m.filter((x) => x.source !== "ai"), ...draft]);
    setAiRan(true);
    if (sheets[0]) {
      // Replace the local AI rows with the persisted ones (real ids) once saved.
      void saveAiTakeoff({
        projectId,
        sheetId: sheets[0].id,
        measurements: draft.map((d) => ({ scope: d.scope, points: d.points, sf: d.sf, confidence: d.confidence })),
      }).then((saved) =>
        setMeasurements((m) => [
          ...m.filter((x) => x.source !== "ai"),
          ...saved.map((s) => ({ id: s.id, scope: s.scope, points: s.points, sf: s.sf, source: "ai" as const, confidence: s.confidence })),
        ])
      );
    }
  }

  const flagged = measurements.filter((m) => m.source === "ai" && m.confidence === "LOW");
  const liveSf = current.length >= 3 ? areaSf(current, scale) : 0;

  // Totals per scope, with extended price (sf × sell rate).
  const totals = SCOPES.map((s) => {
    const sf = measurements.filter((m) => m.scope === s.code).reduce((n, m) => n + m.sf, 0);
    return { ...s, sf, extended: sf * (rates[s.code] ?? 0) };
  }).filter((t) => t.sf > 0);
  const estimateTotal = totals.reduce((n, t) => n + t.extended, 0);

  // ── Sheets / scale gate ──────────────────────────────────────
  if (view === "sheets") {
    return (
      <Pad>
        <Stack>
          <div
            className="v2-body"
            style={{ padding: "12px 14px", border: "2px solid var(--v2-ink)", background: "var(--v2-sand-soft)", fontSize: 14 }}
          >
            <Eyebrow>Scale gate</Eyebrow>
            <div style={{ marginTop: 6 }}>
              Quantities won&apos;t be trusted until every sheet&apos;s scale is verified.
            </div>
          </div>

          {sheets.map((s) => {
            const ok = verified[s.id];
            return (
              <Card key={s.id}>
                <Spread>
                  <Eyebrow accent>AI autoscale</Eyebrow>
                  <Pill tone={ok ? "good" : confTone(s.confidence as Confidence)}>
                    {ok ? "Verified" : s.confidence}
                  </Pill>
                </Spread>
                <div className="v2-h3" style={{ marginTop: 8 }}>{s.name}</div>
                <Mono>detected {s.scale}&apos; / unit</Mono>
                {!ok && (
                  <div style={{ marginTop: 12 }}>
                    <Button variant="primary" onClick={() => confirmScale(s.id)}>
                      Confirm scale
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}

          <Button variant="primary" disabled={!allVerified} onClick={() => setView("canvas")}>
            {allVerified ? "Open takeoff canvas" : "Verify every sheet to continue"}
          </Button>
        </Stack>
      </Pad>
    );
  }

  // ── Canvas ───────────────────────────────────────────────────
  return (
    <>
      <SectionBar>
        <Eyebrow>Scope</Eyebrow>
        <button
          type="button"
          onClick={() => setView("sheets")}
          className="v2-mono"
          style={{ background: "none", border: 0, cursor: "pointer", textDecoration: "underline" }}
        >
          Sheets
        </button>
      </SectionBar>

      <Pad>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {SCOPES.map((s) => (
            <button
              key={s.code}
              type="button"
              onClick={() => setActiveScope(s.code)}
              className="v2-pill"
              style={
                activeScope === s.code
                  ? { background: s.color, color: "var(--v2-ink)", borderColor: "var(--v2-ink)" }
                  : undefined
              }
            >
              {s.code}
            </button>
          ))}
        </div>
      </Pad>

      {/* The board */}
      <Pad>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VBW} ${VBH}`}
          onClick={(e) => setCurrent((c) => [...c, toPoint(e)])}
          style={{ width: "100%", aspectRatio: `${VBW} / ${VBH}`, border: "2px solid var(--v2-ink)", background: "var(--v2-sand-soft)", display: "block", cursor: "crosshair", touchAction: "none" }}
        >
          {/* faint grid */}
          {Array.from({ length: Math.floor(VBW / 20) }).map((_, i) => (
            <line key={`v${i}`} x1={i * 20} y1={0} x2={i * 20} y2={VBH} stroke="var(--v2-line-soft)" strokeWidth={0.5} />
          ))}
          {Array.from({ length: Math.floor(VBH / 20) }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 20} x2={VBW} y2={i * 20} stroke="var(--v2-line-soft)" strokeWidth={0.5} />
          ))}
          {/* placeholder building outline */}
          <rect x={24} y={30} width={272} height={180} fill="none" stroke="var(--v2-ink-4)" strokeWidth={1} strokeDasharray="4 3" />

          {/* committed measurements */}
          {measurements.map((m) => {
            const low = m.confidence === "LOW";
            return (
              <polygon
                key={m.id}
                points={m.points.map((p) => `${p.x},${p.y}`).join(" ")}
                fill={scopeColor(m.scope)}
                fillOpacity={0.35}
                stroke={low ? "var(--v2-bad)" : "var(--v2-ink)"}
                strokeWidth={low ? 2 : 1.5}
                strokeDasharray={low ? "5 3" : undefined}
              />
            );
          })}

          {/* in-progress polygon */}
          {current.length > 0 && (
            <>
              <polyline
                points={current.map((p) => `${p.x},${p.y}`).join(" ")}
                fill={current.length >= 3 ? scopeColor(activeScope) : "none"}
                fillOpacity={0.2}
                stroke="var(--v2-ink)"
                strokeWidth={1.5}
              />
              {current.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={3} fill="var(--v2-accent)" stroke="var(--v2-ink)" strokeWidth={1} />
              ))}
            </>
          )}
        </svg>

        <div className="v2-row-spread" style={{ marginTop: 8 }}>
          <Mono>
            {current.length} pts{liveSf > 0 ? ` · ${liveSf.toLocaleString()} sf` : ""}
          </Mono>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className="v2-pill" onClick={() => setCurrent((c) => c.slice(0, -1))}>
              Undo
            </button>
            <button type="button" className="v2-pill" onClick={() => setCurrent([])}>
              Clear
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
          <Button variant="primary" onClick={finish} disabled={current.length < 3}>
            Finish {activeScope}
          </Button>
          <Button onClick={runAi}>Run AI takeoff</Button>
        </div>
      </Pad>

      {/* AI exception review */}
      {aiRan && (
        <>
          <SectionBar>
            <Eyebrow accent>AI takeoff</Eyebrow>
            <Mono>
              drafted {measurements.filter((m) => m.source === "ai").length} · {flagged.length} flagged
            </Mono>
          </SectionBar>
          <Pad>
            <Card>
              <div className="v2-body" style={{ fontSize: 14 }}>
                {flagged.length > 0
                  ? `${flagged.length} region${flagged.length > 1 ? "s" : ""} came back low-confidence (dashed red). Tap to re-draw, or accept the rest.`
                  : "All regions high-confidence. Accept the draft."}
              </div>
              <div style={{ marginTop: 12 }}>
                <Button variant="primary" onClick={() => setAiRan(false)}>
                  Accept {measurements.filter((m) => m.source === "ai" && m.confidence !== "LOW").length} · review {flagged.length}
                </Button>
              </div>
            </Card>
          </Pad>
        </>
      )}

      {/* Measurements + totals */}
      <SectionBar>
        <Eyebrow>Measurements</Eyebrow>
        <Mono>{measurements.length}</Mono>
      </SectionBar>
      <div>
        {measurements.length === 0 && (
          <Pad>
            <div className="v2-quiet v2-body">Tap the board to drop points, then Finish to close a shape.</div>
          </Pad>
        )}
        {measurements.map((m) => (
          <div key={m.id} className="v2-row">
            <span className="lead" style={{ width: 16, height: 16, background: scopeColor(m.scope), border: "1px solid var(--v2-ink)" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="v2-h3">{m.scope}</div>
              <Mono>{m.source === "ai" ? "AI" : "manual"}</Mono>
            </div>
            <Mono>{m.sf.toLocaleString()} {m.scope === "CAULK" ? "lf" : "sf"}</Mono>
            {m.confidence && <Pill tone={confTone(m.confidence)}>{m.confidence}</Pill>}
            <button
              type="button"
              aria-label={`Delete ${m.scope} measurement`}
              onClick={() => removeMeasurement(m.id)}
              className="v2-pill"
              style={{ cursor: "pointer" }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {totals.length > 0 && (
        <>
          <SectionBar>
            <Eyebrow>Totals by scope</Eyebrow>
            <Mono>sf · extended</Mono>
          </SectionBar>
          <Pad>
            <Stack gap="tight">
              {totals.map((t) => (
                <Spread key={t.code}>
                  <span className="v2-body">
                    <span style={{ display: "inline-block", width: 12, height: 12, background: t.color, border: "1px solid var(--v2-ink)", marginRight: 8, verticalAlign: "middle" }} />
                    {t.name}
                  </span>
                  <Mono>
                    {t.sf.toLocaleString()} {t.code === "CAULK" ? "lf" : "sf"}
                    {t.extended > 0 ? ` · ${usd(t.extended)}` : ""}
                  </Mono>
                </Spread>
              ))}
            </Stack>
          </Pad>

          <SectionBar>
            <Eyebrow accent>Estimate</Eyebrow>
            <Mono>{usd(estimateTotal)}</Mono>
          </SectionBar>
          <Pad>
            <Stack gap="tight">
              <Button variant="primary" onClick={pushToEstimate} disabled={pricing || estimateTotal === 0}>
                {pricing ? "Pricing…" : "Push to estimate"}
              </Button>
              <div className="v2-quiet v2-body" style={{ fontSize: 13 }}>
                {pushedTotal != null
                  ? `Bid value updated to ${usd(pushedTotal)} from saved measurements.`
                  : "Prices saved measurements into this project's bid value."}
              </div>
            </Stack>
          </Pad>
        </>
      )}

      <Pad>
        <H2>Takeoff</H2>
        <div className="v2-quiet v2-body" style={{ marginTop: 4 }}>
          {measurements.length} measurements · scale {scale}&apos;/unit · verified
        </div>
      </Pad>
    </>
  );
}

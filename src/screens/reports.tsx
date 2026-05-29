import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Spread } from "@/components/ui";
import { money0 } from "@/lib/demo-data";
import { getReports, type JobBurnRow, type StageBar } from "@/server/reports";

const pct = (n: number | null) => (n == null ? "—" : `${Math.round(n * 100)}%`);

function JobBurnLine({ j }: { j: JobBurnRow }) {
  return (
    <Link href={`/project/${j.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div className="v2-pad" style={{ paddingTop: 12, paddingBottom: 12 }}>
        <Spread>
          <span className="v2-body" style={{ fontSize: 14, fontWeight: 600 }}>{j.name}</span>
          <Mono>{pct(j.usedPct)}</Mono>
        </Spread>
        <div style={{ height: 8, background: "var(--v2-sand-2)", border: "1px solid var(--v2-ink)", marginTop: 6 }}>
          <div style={{ width: `${j.usedPct * 100}%`, height: "100%", background: j.overBudget ? "var(--v2-bad)" : "var(--v2-accent)" }} />
        </div>
        <div className="v2-quiet" style={{ fontSize: 13, marginTop: 4 }}>
          {money0(j.spent)} spent of {money0(j.contractValue)}{j.overBudget ? " · over budget" : ""}
        </div>
      </div>
    </Link>
  );
}

function StageLine({ s, max }: { s: StageBar; max: number }) {
  const width = max > 0 ? (s.value / max) * 100 : 0;
  return (
    <div className="v2-pad" style={{ paddingTop: 12, paddingBottom: 12 }}>
      <Spread>
        <span className="v2-body" style={{ fontSize: 14 }}>{s.label}</span>
        <Mono>{money0(s.value)}</Mono>
      </Spread>
      <div style={{ height: 8, background: "var(--v2-sand-2)", border: "1px solid var(--v2-ink)", marginTop: 6 }}>
        <div style={{ width: `${width}%`, height: "100%", background: "var(--v2-accent)" }} />
      </div>
    </div>
  );
}

export async function Reports() {
  const r = await getReports();

  const tiles = [
    { label: "Pipeline", value: money0(r.pipelineValue) },
    { label: "Win rate", value: pct(r.winRate) },
    { label: "Awarded", value: money0(r.awarded) },
    { label: "Net cash · 30d", value: money0(r.netCash30) },
  ];

  const maxStage = Math.max(0, ...r.pipelineByStage.map((s) => s.value));

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Insights</Eyebrow>
          <H1>{money0(r.pipelineValue)} in flight.</H1>
          <div className="v2-quiet v2-body">
            {pct(r.winRate)} win rate · {r.activeCount} active {r.activeCount === 1 ? "job" : "jobs"}
            {r.overBudgetCount > 0 ? `, ${r.overBudgetCount} over budget` : ""}.
          </div>
        </Stack>
      </Pad>

      <Pad>
        <div className="v2-stat-grid">
          {tiles.map((t) => (
            <div key={t.label} className="v2-card">
              <Eyebrow>{t.label}</Eyebrow>
              <div className="v2-h2" style={{ marginTop: 8 }}>{t.value}</div>
            </div>
          ))}
        </div>
      </Pad>

      <div className="v2-cols">
        <section>
          <SectionBar>
            <Eyebrow>Budget used by active job</Eyebrow>
            <Mono>{r.overBudgetCount > 0 ? `${r.overBudgetCount} over` : "on track"}</Mono>
          </SectionBar>
          {r.jobs.length === 0 ? (
            <Pad><div className="v2-quiet v2-body">No active jobs.</div></Pad>
          ) : (
            r.jobs.map((j) => <JobBurnLine key={j.id} j={j} />)
          )}
        </section>

        <section>
          <SectionBar>
            <Eyebrow>Pipeline by stage</Eyebrow>
          </SectionBar>
          {r.pipelineByStage.map((s) => (
            <StageLine key={s.label} s={s} max={maxStage} />
          ))}
        </section>
      </div>
    </>
  );
}

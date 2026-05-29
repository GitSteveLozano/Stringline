import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Spread, StatTile, Meter } from "@/components/ui";
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
        <Meter value={j.usedPct} danger={j.overBudget} />
        <div className="v2-quiet" style={{ fontSize: 13, marginTop: 4 }}>
          {money0(j.spent)} spent of {money0(j.contractValue)}{j.overBudget ? " · over budget" : ""}
        </div>
      </div>
    </Link>
  );
}

function StageLine({ s, max }: { s: StageBar; max: number }) {
  return (
    <div className="v2-pad" style={{ paddingTop: 12, paddingBottom: 12 }}>
      <Spread>
        <span className="v2-body" style={{ fontSize: 14 }}>{s.label}</span>
        <Mono>{money0(s.value)}</Mono>
      </Spread>
      <Meter value={max > 0 ? s.value / max : 0} />
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
            <StatTile key={t.label} label={t.label}>{t.value}</StatTile>
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

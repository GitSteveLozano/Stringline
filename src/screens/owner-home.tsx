import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Pill } from "@/components/ui";
import { healthLabel, type Project, type ProjectHealth } from "@/lib/demo-data";
import { getDashboard } from "@/server/projects";

function tone(h: ProjectHealth): "good" | "bad" | undefined {
  if (h === "ON_TRACK") return "good";
  if (h === "OVER_BUDGET" || h === "AT_RISK") return "bad";
  return undefined;
}

function ProjectLink({ p, sub }: { p: Project; sub: string }) {
  return (
    <Link href={`/project/${p.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <Row lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{p.name[0]}</span>}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="v2-h3">{p.name}</div>
          <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{sub}</div>
        </div>
        <Pill tone={tone(p.health)} dot={p.health === "OVER_BUDGET"}>
          {healthLabel[p.health]}
        </Pill>
      </Row>
    </Link>
  );
}

export async function OwnerHome() {
  const s = await getDashboard();
  const caughtUp = s.atRisk.length === 0;

  const stats = [
    { label: "Jobs running", value: s.runningCount },
    { label: "Crew on clock", value: s.crewOnClock },
    { label: "At risk", value: s.atRisk.length },
    { label: "Approvals", value: s.pendingApprovals },
  ];

  return (
    <>
      <Pad>
        <Stack>
          <Eyebrow>Tuesday · May 28</Eyebrow>
          <H1>
            {caughtUp
              ? "You're caught up."
              : `${s.atRisk.length} ${s.atRisk.length === 1 ? "thing needs" : "things need"} you.`}
          </H1>
          <div className="v2-quiet v2-body">
            {s.runningCount} jobs running · {s.crewOnClock} crew on the clock ·{" "}
            {caughtUp ? "nothing needs you." : "tap a flagged job to handle it."}
          </div>
          <Link href="/activity" style={{ textDecoration: "none" }}>
            <span className="v2-mono" style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              View activity →
            </span>
          </Link>
        </Stack>
      </Pad>

      {/* Stat tiles */}
      <Pad>
        <div className="v2-stat-grid">
          {stats.map((t) => (
            <div key={t.label} className="v2-card">
              <Eyebrow>{t.label}</Eyebrow>
              <div className="v2-h1" style={{ marginTop: 6, fontFamily: "var(--v2-font-tight)" }}>{t.value}</div>
            </div>
          ))}
        </div>
      </Pad>

      {/* Two-column overview on desktop; stacked on mobile */}
      <div className="v2-cols">
        <section>
          <SectionBar>
            <Eyebrow>Today on site</Eyebrow>
            <Mono>{s.onSite.length}</Mono>
          </SectionBar>
          <div>
            {s.onSite.length === 0 ? (
              <Pad><div className="v2-quiet v2-body">No jobs running.</div></Pad>
            ) : (
              s.onSite.map((p) => (
                <ProjectLink
                  key={p.id}
                  p={p}
                  sub={`${p.dayOf ? `Day ${p.dayOf} of ${p.dayTotal} · ` : ""}${p.crewSize} crew on site`}
                />
              ))
            )}
          </div>
        </section>

        <section>
          <SectionBar>
            <Eyebrow>Needs attention</Eyebrow>
            <Mono>{s.atRisk.length}</Mono>
          </SectionBar>
          <div>
            {s.atRisk.length === 0 ? (
              <Pad><div className="v2-quiet v2-body">Nothing flagged — you&apos;re clear.</div></Pad>
            ) : (
              s.atRisk.map((p) => <ProjectLink key={p.id} p={p} sub={healthLabel[p.health]} />)
            )}
          </div>
        </section>
      </div>
    </>
  );
}

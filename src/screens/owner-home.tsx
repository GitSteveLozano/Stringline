import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Pill } from "@/components/ui";
import { dashboardSummary, healthLabel, type ProjectHealth } from "@/lib/demo-data";

function tone(h: ProjectHealth): "good" | "bad" | undefined {
  if (h === "ON_TRACK") return "good";
  if (h === "OVER_BUDGET" || h === "AT_RISK") return "bad";
  return undefined;
}

export function OwnerHome() {
  const s = dashboardSummary();
  const caughtUp = s.atRisk.length === 0;

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
        </Stack>
      </Pad>

      <SectionBar>
        <Eyebrow>Today on site</Eyebrow>
        <Mono>{s.onSite.length}</Mono>
      </SectionBar>

      <div>
        {s.onSite.map((p) => (
          <Link key={p.id} href={`/project/${p.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <Row lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{p.name[0]}</span>}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="v2-h3">{p.name}</div>
                <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>
                  Day {p.dayOf} of {p.dayTotal} · {p.crewSize} crew on site
                </div>
              </div>
              <Pill tone={tone(p.health)} dot={p.health === "OVER_BUDGET"}>
                {healthLabel[p.health]}
              </Pill>
            </Row>
          </Link>
        ))}
      </div>
    </>
  );
}

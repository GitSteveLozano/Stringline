import { Pad, Stack, Eyebrow, H1, Card, Spread, Pill, SectionBar, Mono } from "@/components/ui";
import { projects, crew } from "@/lib/demo-data";

// Money is hidden for the foreman (canViewCosts off) — show crew/hours/status only.
export function ForemanHome() {
  const sites = projects.filter((p) => p.status === "IN_PROGRESS");
  const onClock = crew.filter((c) => c.clockedIn).length;

  return (
    <>
      <Pad>
        <Stack>
          <Eyebrow>Tuesday · May 28</Eyebrow>
          <H1>{sites.length} sites today.</H1>
          <div className="v2-quiet v2-body">{onClock} crew clocked in · 1 ping from the field.</div>
        </Stack>
      </Pad>

      <SectionBar>
        <Eyebrow>Your sites</Eyebrow>
        <Mono>{sites.length}</Mono>
      </SectionBar>

      <Pad>
        <Stack>
          {sites.map((p, i) => {
            const here = crew.filter((c) => c.project === p.id && c.clockedIn).length;
            const primary = i === 0;
            return (
              <Card key={p.id} style={primary ? { borderWidth: 3 } : undefined}>
                <Spread>
                  <Eyebrow>{p.name}</Eyebrow>
                  {primary && <Pill tone="live" dot>You&apos;re here</Pill>}
                </Spread>
                <div style={{ marginTop: 10 }} className="v2-row-spread">
                  <div>
                    <Mono>Crew on site</Mono>
                    <div className="v2-h2" style={{ marginTop: 2 }}>{here}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Mono>Day</Mono>
                    <div className="v2-h2" style={{ marginTop: 2 }}>
                      {p.dayOf}/{p.dayTotal}
                    </div>
                  </div>
                </div>
                {i === 1 && (
                  <div
                    style={{
                      marginTop: 12,
                      padding: "10px 12px",
                      border: "2px solid var(--v2-ink)",
                      background: "var(--v2-sand-soft)",
                    }}
                  >
                    <Mono>From the field</Mono>
                    <div className="v2-body" style={{ fontSize: 14, marginTop: 4 }}>
                      Diego flagged: out of EPS 1.5&quot; · 12 sheets
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </Stack>
      </Pad>
    </>
  );
}

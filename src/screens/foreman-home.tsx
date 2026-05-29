import { Pad, Stack, Eyebrow, H1, Card, Spread, Pill, SectionBar, Mono } from "@/components/ui";
import { getForemanHome } from "@/server/foreman";

// Money is hidden for the foreman (canViewCosts off) — show crew/hours/status only.
export async function ForemanHome() {
  const { sites, onClock, pings } = await getForemanHome();

  return (
    <>
      <Pad>
        <Stack>
          <Eyebrow>Today on the boards</Eyebrow>
          <H1>{sites.length} sites today.</H1>
          <div className="v2-quiet v2-body">
            {onClock} crew clocked in · {pings} {pings === 1 ? "ping" : "pings"} from the field.
          </div>
        </Stack>
      </Pad>

      <SectionBar>
        <Eyebrow>Your sites</Eyebrow>
        <Mono>{sites.length}</Mono>
      </SectionBar>

      <Pad>
        <Stack>
          {sites.map((p, i) => {
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
                    <div className="v2-h2" style={{ marginTop: 2 }}>{p.crewHere}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Mono>Day</Mono>
                    <div className="v2-h2" style={{ marginTop: 2 }}>
                      {p.dayOf ?? "–"}/{p.dayTotal ?? "–"}
                    </div>
                  </div>
                </div>
                {p.blocker && (
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
                      {p.blocker.who.split(" ")[0]} flagged: {p.blocker.detail}
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

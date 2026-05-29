import { Pad, Stack, Eyebrow, BigNum, SectionBar, Mono, Row, Pill, Button, Card } from "@/components/ui";
import { getForemanTime } from "@/server/foreman";
import { submitWeekForApproval } from "@/server/actions";

// Foreman first-line time approval. Hours only — no dollars (money hidden).
export async function ForemanTime() {
  const week = await getForemanTime();
  const maxH = Math.max(1, ...week.days.map((d) => d.h));
  const ready = week.crew.length - week.crew.filter((c) => c.flagged).length;

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>{week.label}</Eyebrow>
          <BigNum unit="h">{week.totalHours}</BigNum>
          <div className="v2-quiet v2-body">
            {week.crewCount} crew · {week.flagged} {week.flagged === 1 ? "entry needs" : "entries need"} your eyes
          </div>
        </Stack>
      </Pad>

      <Pad>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 80 }}>
          {week.days.map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{
                  height: `${(d.h / maxH) * 64}px`,
                  background: "var(--v2-accent)",
                  border: "2px solid var(--v2-ink)",
                }}
              />
              <Mono>{d.d}</Mono>
            </div>
          ))}
        </div>
      </Pad>

      <SectionBar>
        <Eyebrow>Crew this week</Eyebrow>
      </SectionBar>
      <div>
        {week.crew.map((c) => (
          <Row key={c.id} lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{c.initials}</span>}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="v2-h3">{c.name}</div>
              <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{c.role}</div>
            </div>
            <Mono>{c.hoursWeek}h</Mono>
            {c.flagged && <Pill tone="bad">Flag</Pill>}
          </Row>
        ))}
      </div>

      <Pad>
        <Card accent>
          <Mono>{ready} match GPS · ready to submit · {week.flagged} needs your eyes</Mono>
        </Card>
        <form action={submitWeekForApproval} style={{ marginTop: 16 }}>
          <Button variant="primary" type="submit" style={{ width: "100%" }}>Submit week for owner approval</Button>
        </form>
      </Pad>
    </>
  );
}

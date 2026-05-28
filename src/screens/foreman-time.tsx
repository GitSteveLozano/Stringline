import { Pad, Stack, Eyebrow, BigNum, SectionBar, Mono, Row, Pill, Button, Card } from "@/components/ui";
import { foremanWeek, crew } from "@/lib/demo-data";

// Foreman first-line time approval. Hours only — no dollars (money hidden).
export function ForemanTime() {
  const maxH = Math.max(...foremanWeek.days.map((d) => d.h));

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>{foremanWeek.label}</Eyebrow>
          <BigNum unit="h">{foremanWeek.totalHours}</BigNum>
          <div className="v2-quiet v2-body">
            {foremanWeek.crewCount} crew · {foremanWeek.flagged} entry needs your eyes
          </div>
        </Stack>
      </Pad>

      <Pad>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 80 }}>
          {foremanWeek.days.map((d) => (
            <div key={d.d} style={{ flex: 1, textAlign: "center" }}>
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
        {crew.map((c) => (
          <Row key={c.id} lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{c.initials}</span>}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="v2-h3">{c.name}</div>
              <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{c.role}</div>
            </div>
            <Mono>{c.hoursWeek}h</Mono>
            {c.id === "w5" && <Pill tone="bad">Flag</Pill>}
          </Row>
        ))}
      </div>

      <Pad>
        <Card accent>
          <Mono>3 match GPS · ready to submit · 1 needs your eyes</Mono>
        </Card>
        <div style={{ marginTop: 16 }}>
          <Button variant="primary">Submit week for owner approval</Button>
        </div>
      </Pad>
    </>
  );
}

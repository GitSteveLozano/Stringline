import { Pad, Stack, Eyebrow, H1, Card, SectionBar, Mono, Button, Spread } from "@/components/ui";
import { todayLog } from "@/lib/demo-data";

export function ForemanLog() {
  const pct = Math.round((todayLog.sqftDone / todayLog.sqftPlanned) * 100);
  const stats = [
    { label: "Photos", value: String(todayLog.photos) },
    { label: "Crew hrs", value: String(todayLog.crewHours) },
    { label: "Progress", value: `${pct}%` },
  ];

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Daily log · today</Eyebrow>
          <H1>{todayLog.site}</H1>
          <div className="v2-quiet v2-body">{todayLog.weather}</div>
        </Stack>
      </Pad>

      <Pad>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {stats.map((s) => (
            <div key={s.label} className="v2-card" style={{ textAlign: "center" }}>
              <Eyebrow>{s.label}</Eyebrow>
              <div className="v2-h2" style={{ marginTop: 6 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </Pad>

      <SectionBar>
        <Eyebrow accent>Agent draft</Eyebrow>
        <Mono>from 12 photos · clock data</Mono>
      </SectionBar>
      <Pad>
        <Card>
          <div className="v2-body" style={{ lineHeight: 1.5 }}>{todayLog.narrative}</div>
        </Card>
      </Pad>

      <Pad>
        <Stack>
          <Spread>
            <Mono>Reviewed and edited?</Mono>
          </Spread>
          <Button variant="primary">Submit to owner</Button>
          <Button variant="ghost">Send to client too</Button>
        </Stack>
      </Pad>
    </>
  );
}

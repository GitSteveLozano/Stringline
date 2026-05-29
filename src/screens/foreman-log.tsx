import { Pad, Stack, Eyebrow, H1, Card, SectionBar, Mono, Button, Spread, Pill } from "@/components/ui";
import { getForemanLog } from "@/server/foreman";
import { submitDailyLog } from "@/server/actions";

export async function ForemanLog() {
  const log = await getForemanLog();
  if (!log) {
    return (
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Daily log · today</Eyebrow>
          <H1>No log started yet.</H1>
        </Stack>
      </Pad>
    );
  }
  const pct = log.sqftPlanned ? Math.round((log.sqftDone / log.sqftPlanned) * 100) : 0;
  const stats = [
    { label: "Photos", value: String(log.photos) },
    { label: "Crew hrs", value: String(log.crewHours) },
    { label: "Progress", value: `${pct}%` },
  ];

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Daily log · today</Eyebrow>
          <H1>{log.site}</H1>
          <div className="v2-quiet v2-body">{log.weather}</div>
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
        <Mono>from {log.photos} photos · clock data</Mono>
      </SectionBar>
      <Pad>
        <Card>
          <div className="v2-body" style={{ lineHeight: 1.5 }}>{log.narrative}</div>
        </Card>
      </Pad>

      <Pad>
        <Stack>
          <Spread>
            <Mono>Reviewed and edited?</Mono>
            {log.submitted && <Pill tone="good">Submitted</Pill>}
          </Spread>
          {log.submitted ? (
            <Button variant="ghost" disabled>Submitted to owner</Button>
          ) : (
            <>
              <form action={submitDailyLog.bind(null, log.id)}>
                <Button variant="primary" type="submit" style={{ width: "100%" }}>Submit to owner</Button>
              </form>
              <Button variant="ghost">Send to client too</Button>
            </>
          )}
        </Stack>
      </Pad>
    </>
  );
}

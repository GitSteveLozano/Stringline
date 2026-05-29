import { Pad, Stack, Card, Spread, Eyebrow, Mono, Pill, Button } from "@/components/ui";
import { getForemanField, type FieldCard } from "@/server/foreman";
import { resolveFieldReport } from "@/server/actions";

// The Field tab — the single inbox for everything coming from the crew.
export async function ForemanField() {
  const items = await getForemanField();
  const open = items.filter((f) => !f.resolved);
  const resolved = items.filter((f) => f.resolved);

  const card = (f: FieldCard) => (
    <Card key={f.id} style={f.isBlocker && !f.resolved ? { borderLeftWidth: 6 } : undefined}>
      <Spread>
        <Eyebrow>{f.kind}</Eyebrow>
        <Mono>{f.time}</Mono>
      </Spread>
      <div className="v2-h3" style={{ marginTop: 8 }}>
        {f.who} · {f.site}
      </div>
      <div className="v2-quiet v2-body" style={{ fontSize: 14, marginTop: 4 }}>
        {f.detail}
      </div>
      {!f.resolved && (
        <div style={{ display: "grid", gridTemplateColumns: f.isBlocker ? "1fr 1fr" : "1fr", gap: 10, marginTop: 14 }}>
          {f.isBlocker && (
            <form action={resolveFieldReport.bind(null, f.id)}>
              <Button variant="primary" type="submit" style={{ width: "100%" }}>Order materials</Button>
            </form>
          )}
          <form action={resolveFieldReport.bind(null, f.id)}>
            <Button variant="ghost" type="submit" style={{ width: "100%" }}>
              {f.isBlocker ? "Resolve" : "Mark seen"}
            </Button>
          </form>
        </div>
      )}
      {f.resolved && (
        <div style={{ marginTop: 10 }}>
          <Pill tone="good">Resolved</Pill>
        </div>
      )}
    </Card>
  );

  return (
    <Pad>
      <Stack>
        {open.map(card)}
        {resolved.length > 0 && (
          <>
            <Eyebrow>Resolved today</Eyebrow>
            {resolved.map(card)}
          </>
        )}
      </Stack>
    </Pad>
  );
}

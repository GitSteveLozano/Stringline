import { Pad, Stack, Card, Spread, Eyebrow, Mono, Pill, Button } from "@/components/ui";
import { fieldItems } from "@/lib/demo-data";

// The Field tab — the single inbox for everything coming from the crew.
export function ForemanField() {
  const open = fieldItems.filter((f) => !f.resolved);
  const resolved = fieldItems.filter((f) => f.resolved);

  const card = (f: (typeof fieldItems)[number]) => {
    const blocker = f.kind === "Blocker";
    return (
      <Card key={f.id} style={blocker && !f.resolved ? { borderLeftWidth: 6 } : undefined}>
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
          <div style={{ display: "grid", gridTemplateColumns: blocker ? "1fr 1fr" : "1fr", gap: 10, marginTop: 14 }}>
            {blocker && <Button variant="primary">Order materials</Button>}
            <Button variant="ghost">{blocker ? "Resolve" : "Mark seen"}</Button>
          </div>
        )}
        {f.resolved && (
          <div style={{ marginTop: 10 }}>
            <Pill tone="good">Resolved</Pill>
          </div>
        )}
      </Card>
    );
  };

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

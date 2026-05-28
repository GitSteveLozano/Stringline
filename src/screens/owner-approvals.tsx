import { Pad, Stack, Card, Spread, Eyebrow, Mono, Pill, Button } from "@/components/ui";
import { approvals } from "@/lib/demo-data";

export function OwnerApprovals() {
  return (
    <Pad>
      <Stack>
        <div className="v2-quiet v2-body">
          Auto-escalates to your phone after 30 min unattended.
        </div>
        {approvals.map((a) => (
          <Card key={a.id} style={a.urgent ? { borderLeftWidth: 6 } : undefined}>
            <Spread>
              <Eyebrow>{a.kind}</Eyebrow>
              <Mono>{a.amount}</Mono>
            </Spread>
            <div className="v2-h3" style={{ marginTop: 8 }}>
              {a.who} · {a.site}
            </div>
            <div className="v2-quiet v2-body" style={{ fontSize: 14, marginTop: 4 }}>
              {a.detail}
            </div>
            <div style={{ marginTop: 6 }}>
              <Pill tone={a.urgent ? "bad" : undefined} dot={a.urgent}>
                {a.age} ago
              </Pill>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
              <Button variant="primary">Approve</Button>
              <Button variant="ghost">Deny</Button>
            </div>
          </Card>
        ))}
      </Stack>
    </Pad>
  );
}

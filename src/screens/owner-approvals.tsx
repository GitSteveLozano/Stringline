import { Pad, Stack, Card, Spread, Eyebrow, Mono, Pill, Button, H2 } from "@/components/ui";
import { getPendingApprovals } from "@/server/approvals";
import { decideApproval } from "@/server/actions";

export async function OwnerApprovals() {
  const approvals = await getPendingApprovals();

  return (
    <Pad>
      <Stack>
        <div className="v2-quiet v2-body">
          Auto-escalates to your phone after 30 min unattended.
        </div>
        {approvals.length === 0 && <H2>You&apos;re all caught up.</H2>}
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
              <form action={decideApproval.bind(null, a.id, "APPROVED")}>
                <Button variant="primary" type="submit" style={{ width: "100%" }}>Approve</Button>
              </form>
              <form action={decideApproval.bind(null, a.id, "DENIED")}>
                <Button variant="ghost" type="submit" style={{ width: "100%" }}>Deny</Button>
              </form>
            </div>
          </Card>
        ))}
      </Stack>
    </Pad>
  );
}

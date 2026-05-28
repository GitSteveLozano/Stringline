import { Pad, Stack, Eyebrow, H1, H3, Spread, Pill, SectionBar, Mono, Button, Rule } from "@/components/ui";
import {
  projectById,
  projectExtras,
  LIFECYCLE,
  money0,
  statusLabel,
  healthLabel,
} from "@/lib/demo-data";

/** Lifecycle state machine — same screen across Drafting → Paid; content shifts with status. */
export function ProjectDetail({ id }: { id: string }) {
  const p = projectById(id);
  if (!p) {
    return (
      <Pad>
        <Stack>
          <Eyebrow>Not found</Eyebrow>
          <H1>No such project.</H1>
        </Stack>
      </Pad>
    );
  }

  const extras = projectExtras[p.id];
  const acceptedCOs = extras?.changeOrders.filter((c) => c.status === "ACCEPTED") ?? [];
  const coTotal = acceptedCOs.reduce((s, c) => s + c.delta, 0);
  const contract = p.contractValue + coTotal;
  const activeIdx = LIFECYCLE.indexOf(p.status);

  const totalLabel =
    p.status === "DRAFTING" || p.status === "SENT"
      ? "Estimate"
      : p.status === "PAID"
        ? "Collected"
        : "Contract";

  return (
    <>
      {/* Hero */}
      <Pad>
        <Stack gap="tight">
          <Spread>
            <Eyebrow>{statusLabel[p.status]}</Eyebrow>
            <Pill tone={p.health === "ON_TRACK" ? "good" : p.health === "OVER_BUDGET" ? "bad" : undefined}>
              {healthLabel[p.health]}
            </Pill>
          </Spread>
          <H1>{p.name}</H1>
          <div className="v2-quiet v2-body">
            {p.client} · {p.address}
          </div>
        </Stack>
      </Pad>

      {/* Lifecycle strip */}
      <SectionBar>
        <Eyebrow>Lifecycle</Eyebrow>
        <Mono>
          {activeIdx + 1}/{LIFECYCLE.length}
        </Mono>
      </SectionBar>
      <Pad>
        <div style={{ display: "flex", gap: 6 }}>
          {LIFECYCLE.map((s, i) => (
            <div
              key={s}
              title={statusLabel[s]}
              style={{
                flex: 1,
                height: 6,
                background: i <= activeIdx ? "var(--v2-accent)" : "var(--v2-line-soft)",
                border: "1px solid var(--v2-ink)",
              }}
            />
          ))}
        </div>
        <div className="v2-quiet" style={{ fontSize: 12, marginTop: 8, fontFamily: "var(--v2-font-mono)" }}>
          {LIFECYCLE.map((s) => statusLabel[s].toUpperCase()).join(" · ")}
        </div>
      </Pad>

      {/* Contract value */}
      <SectionBar>
        <Eyebrow>{totalLabel}</Eyebrow>
        {coTotal > 0 && <Mono>+{money0(coTotal)} CO</Mono>}
      </SectionBar>
      <Pad>
        <div className="v2-h1" style={{ fontFamily: "var(--v2-font-tight)" }}>{money0(contract)}</div>
        {p.status === "IN_PROGRESS" && (
          <div className="v2-quiet" style={{ fontSize: 13, marginTop: 4 }}>
            {money0(p.spent)} spent · {Math.round(p.progress * 100)}% complete
          </div>
        )}
      </Pad>

      {/* Budget (when there's spend) */}
      {extras && (p.status === "IN_PROGRESS" || p.status === "DONE") && (
        <>
          <SectionBar>
            <Eyebrow>Budget vs spent</Eyebrow>
          </SectionBar>
          <div>
            {extras.budget.map((b) => {
              const pct = Math.min(1, b.spent / b.bid);
              const over = b.spent > b.bid;
              return (
                <div key={b.label} className="v2-pad" style={{ paddingTop: 12, paddingBottom: 12 }}>
                  <Spread>
                    <span className="v2-body" style={{ fontSize: 14 }}>{b.label}</span>
                    <Mono>
                      {money0(b.spent)} / {money0(b.bid)}
                    </Mono>
                  </Spread>
                  <div style={{ height: 8, background: "var(--v2-sand-2)", border: "1px solid var(--v2-ink)", marginTop: 6 }}>
                    <div
                      style={{
                        width: `${pct * 100}%`,
                        height: "100%",
                        background: over ? "var(--v2-bad)" : "var(--v2-accent)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Change orders */}
      {extras && extras.changeOrders.length > 0 && (
        <>
          <SectionBar>
            <Eyebrow>Change orders</Eyebrow>
            <Mono>{extras.changeOrders.length}</Mono>
          </SectionBar>
          <div>
            {extras.changeOrders.map((c) => (
              <div key={c.number} className="v2-row">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <H3>CO #{c.number}</H3>
                  <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{c.description}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Mono>+{money0(c.delta)}</Mono>
                  <div>
                    <Pill tone={c.status === "ACCEPTED" ? "good" : undefined}>{c.status}</Pill>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Milestones */}
      {extras && (
        <>
          <SectionBar>
            <Eyebrow>Billing milestones</Eyebrow>
          </SectionBar>
          <div>
            {extras.milestones.map((m) => (
              <div key={m.label} className="v2-row">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="v2-body">{m.label}</span>{" "}
                  <Mono>· {m.percent}%</Mono>
                </div>
                <Mono>{money0(m.amount)}</Mono>
                <Pill tone={m.paid ? "good" : undefined}>{m.paid ? "PAID" : "DUE"}</Pill>
              </div>
            ))}
          </div>
        </>
      )}

      <Rule />
      <Pad>
        <Stack>
          {p.status === "DRAFTING" && <Button variant="primary">Send proposal to client</Button>}
          {p.status === "SENT" && <Button variant="primary">Mark accepted</Button>}
          {p.status === "IN_PROGRESS" && <Button variant="primary">Open today&apos;s log</Button>}
          {p.status === "DONE" && <Button variant="primary">Generate invoice</Button>}
        </Stack>
      </Pad>
    </>
  );
}

import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, H3, Field, Spread, Pill, SectionBar, Mono, Button, Rule } from "@/components/ui";
import { LIFECYCLE, money0, statusLabel, healthLabel } from "@/lib/demo-data";
import { getProjectDetail } from "@/server/projects";
import { advanceProjectStatus, markProjectLost, addChangeOrder, decideChangeOrder, generateInvoice, markInvoicePaid, snoozeGuardrail, rearmGuardrail } from "@/server/actions";

const GUARDRAIL: Record<string, { label: string; detail: (t: number, c: number | null) => string }> = {
  MARGIN: { label: "Margin floor", detail: (t, c) => `Min ${t}% margin · now ${c ?? "—"}%` },
  SCHEDULE: { label: "Schedule slip", detail: (t, c) => `Alert past ${t}d behind · now ${c ?? 0}d` },
  SAFETY: { label: "Safety check-ins", detail: (t, c) => `${c ?? 0} of ${t} crew checked in` },
};

const LOST_LABEL: Record<string, string> = {
  PRICE: "Price",
  TIMING: "Timing",
  SCOPE: "Scope",
  GHOSTED: "Ghosted",
  COMPETITOR: "Lost to competitor",
  OTHER: "Other",
};

/** Lifecycle state machine — same screen across Drafting → Paid; content shifts with status. */
export async function ProjectDetail({ id }: { id: string }) {
  const detail = await getProjectDetail(id);
  if (!detail) {
    return (
      <Pad>
        <Stack>
          <Eyebrow>Not found</Eyebrow>
          <H1>No such project.</H1>
        </Stack>
      </Pad>
    );
  }

  const { project: p, budget, changeOrders, milestones, lostReason, lostNote, invoice, guardrails } = detail;
  const isLost = lostReason != null;
  const canLose = !isLost && (p.status === "DRAFTING" || p.status === "SENT");
  const canChangeOrder = !isLost && (p.status === "IN_PROGRESS" || p.status === "DONE");
  const acceptedCOs = changeOrders.filter((c) => c.status === "ACCEPTED");
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
          {isLost && (
            <Pill tone="bad">Lost · {LOST_LABEL[lostReason] ?? lostReason}</Pill>
          )}
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
      {budget.length > 0 && (p.status === "IN_PROGRESS" || p.status === "DONE") && (
        <>
          <SectionBar>
            <Eyebrow>Budget vs spent</Eyebrow>
          </SectionBar>
          <div>
            {budget.map((b) => {
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

      {/* Guardrails */}
      {guardrails.length > 0 && (
        <>
          <SectionBar>
            <Eyebrow>Guardrails</Eyebrow>
            <Mono>{guardrails.length}</Mono>
          </SectionBar>
          <div>
            {guardrails.map((g) => {
              const meta = GUARDRAIL[g.type] ?? { label: g.type, detail: () => "" };
              const active = g.status === "ARMED" || g.status === "TRIGGERED";
              return (
                <div key={g.id} className="v2-pad" style={{ paddingTop: 12, paddingBottom: 12 }}>
                  <Spread>
                    <div style={{ minWidth: 0 }}>
                      <div className="v2-body" style={{ fontSize: 14, fontWeight: 600 }}>{meta.label}</div>
                      <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>
                        {meta.detail(g.threshold, g.currentValue)}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {g.status === "TRIGGERED" ? (
                        <Pill tone="bad" dot>Triggered</Pill>
                      ) : g.status === "SNOOZED" ? (
                        <Pill>Snoozed</Pill>
                      ) : g.status === "MUTED" ? (
                        <Pill>Muted</Pill>
                      ) : (
                        <Pill tone="good">Armed</Pill>
                      )}
                      <form action={(active ? snoozeGuardrail : rearmGuardrail).bind(null, g.id)}>
                        <Button variant="ghost" type="submit">{active ? "Snooze" : "Re-arm"}</Button>
                      </form>
                    </div>
                  </Spread>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Change orders */}
      {(changeOrders.length > 0 || canChangeOrder) && (
        <>
          <SectionBar>
            <Eyebrow>Change orders</Eyebrow>
            <Mono>{changeOrders.length}</Mono>
          </SectionBar>
          <div>
            {changeOrders.map((c) => {
              const pending = c.status === "SENT" || c.status === "DRAFT";
              return (
                <div key={c.id ?? c.number} className="v2-row" style={{ flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <H3>CO #{c.number}</H3>
                    <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{c.description}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Mono>{c.delta >= 0 ? "+" : "−"}{money0(Math.abs(c.delta))}</Mono>
                    <div>
                      <Pill tone={c.status === "ACCEPTED" ? "good" : c.status === "REJECTED" ? "bad" : undefined}>
                        {c.status}
                      </Pill>
                    </div>
                  </div>
                  {pending && c.id && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%", marginTop: 10 }}>
                      <form action={decideChangeOrder.bind(null, c.id, "ACCEPTED")}>
                        <Button variant="primary" type="submit" style={{ width: "100%" }}>Accept</Button>
                      </form>
                      <form action={decideChangeOrder.bind(null, c.id, "REJECTED")}>
                        <Button variant="ghost" type="submit" style={{ width: "100%" }}>Reject</Button>
                      </form>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {canChangeOrder && (
            <Pad>
              <form action={addChangeOrder.bind(null, id)}>
                <Stack gap="tight">
                  <Eyebrow>Log a change order</Eyebrow>
                  <Field name="description" placeholder="Added soffit detail · east elevation" required />
                  <Field name="delta" inputMode="decimal" placeholder="Value change (e.g. 4250 or -800)" required />
                  <Button variant="ghost" type="submit" style={{ width: "100%" }}>Send change order</Button>
                </Stack>
              </form>
            </Pad>
          )}
        </>
      )}

      {/* Milestones */}
      {milestones.length > 0 && (
        <>
          <SectionBar>
            <Eyebrow>Billing milestones</Eyebrow>
          </SectionBar>
          <div>
            {milestones.map((m) => (
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
          {p.status === "DRAFTING" && (
            <form action={advanceProjectStatus.bind(null, id, "SENT")}>
              <Button variant="primary" type="submit" style={{ width: "100%" }}>Send proposal to client</Button>
            </form>
          )}
          {p.status === "SENT" && (
            <form action={advanceProjectStatus.bind(null, id, "ACCEPTED")}>
              <Button variant="primary" type="submit" style={{ width: "100%" }}>Mark accepted</Button>
            </form>
          )}
          {p.status === "ACCEPTED" && (
            <form action={advanceProjectStatus.bind(null, id, "IN_PROGRESS")}>
              <Button variant="primary" type="submit" style={{ width: "100%" }}>Start work</Button>
            </form>
          )}
          {p.status === "IN_PROGRESS" && (
            <>
              <Link href="/foreman/log" style={{ textDecoration: "none" }}>
                <Button variant="primary" style={{ width: "100%" }}>Open today&apos;s log</Button>
              </Link>
              <form action={advanceProjectStatus.bind(null, id, "DONE")}>
                <Button variant="ghost" type="submit" style={{ width: "100%" }}>Mark complete</Button>
              </form>
            </>
          )}
          {p.status === "DONE" && !invoice && (
            <form action={generateInvoice.bind(null, id)}>
              <Button variant="primary" type="submit" style={{ width: "100%" }}>Generate invoice</Button>
            </form>
          )}
          {p.status === "DONE" && invoice && !invoice.paid && (
            <Stack gap="tight">
              <div className="v2-quiet v2-body">
                Invoice {invoice.number} · {money0(invoice.amount)} sent — awaiting payment.
              </div>
              <form action={markInvoicePaid.bind(null, id)}>
                <Button variant="primary" type="submit" style={{ width: "100%" }}>Mark invoice paid</Button>
              </form>
            </Stack>
          )}

          {canLose && (
            <form action={markProjectLost.bind(null, id)}>
              <Stack gap="tight">
                <Eyebrow>Didn&apos;t win it?</Eyebrow>
                <label style={{ display: "block" }}>
                  <select className="v2-field" name="reason" defaultValue="PRICE">
                    <option value="PRICE">Lost on price</option>
                    <option value="TIMING">Lost on timing</option>
                    <option value="SCOPE">Lost on scope</option>
                    <option value="COMPETITOR">Lost to a competitor</option>
                    <option value="GHOSTED">Client ghosted</option>
                    <option value="OTHER">Other</option>
                  </select>
                </label>
                <Field name="note" placeholder="Note (optional)" />
                <Button variant="ghost" type="submit" style={{ width: "100%" }}>Mark lost</Button>
              </Stack>
            </form>
          )}

          {isLost && (
            <div className="v2-quiet v2-body">
              Marked lost · {LOST_LABEL[lostReason] ?? lostReason}
              {lostNote ? ` — ${lostNote}` : ""}
            </div>
          )}
        </Stack>
      </Pad>
    </>
  );
}

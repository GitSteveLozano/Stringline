"use client";

import { useState } from "react";
import { Pad, Stack, Eyebrow, H1, Field, Button, Card, Mono, Spread, Fill } from "@/components/ui";
import { Icon } from "@/components/icon";
import { devSignIn } from "@/server/auth-actions";

const TRADES = ["Stucco / EIFS", "Framing", "Drywall", "Painting", "Roofing", "General"];
const CREW_SIZES = ["Just me · solo", "2–5", "6–15", "15+"];
const INTEGRATIONS = [
  { name: "QuickBooks", blurb: "Books · invoices · pricing" },
  { name: "Gusto", blurb: "Payroll · loaded burden" },
  { name: "Stripe", blurb: "Collect payments" },
];

export function Onboarding() {
  const [step, setStep] = useState(0);
  const [trade, setTrade] = useState(TRADES[0]);
  const [crew, setCrew] = useState(CREW_SIZES[0]);
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const last = 3;

  // Demo: there's no workspace-provisioning yet, so finishing signs you in
  // as the seeded owner to land in the app.
  const next = () => (step < last ? setStep(step + 1) : devSignIn("owner"));

  return (
    <Pad>
      <Stack gap="loose">
        <Spread>
          <Eyebrow>Step {step + 1} / {last + 1}</Eyebrow>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="v2-mono"
              style={{ background: "none", border: 0, cursor: "pointer", textDecoration: "underline" }}
            >
              Back
            </button>
          )}
        </Spread>

        {step === 0 && (
          <Stack>
            <H1>Your company.</H1>
            <Field label="Company name" placeholder="Davis Stucco" defaultValue="Davis Stucco" />
            <Eyebrow>Trade</Eyebrow>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TRADES.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="v2-pill"
                  onClick={() => setTrade(t)}
                  style={trade === t ? { background: "var(--v2-accent)", color: "var(--v2-accent-ink)" } : undefined}
                >
                  {t}
                </button>
              ))}
            </div>
          </Stack>
        )}

        {step === 1 && (
          <Stack>
            <H1>How big is the crew?</H1>
            <Stack gap="tight">
              {CREW_SIZES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="v2-tile"
                  onClick={() => setCrew(c)}
                  style={{ minHeight: 60, ...(crew === c ? { background: "var(--v2-accent)", color: "var(--v2-accent-ink)" } : {}) }}
                >
                  <span className="v2-h3">{c}</span>
                </button>
              ))}
            </Stack>
            {crew === CREW_SIZES[0] && <Mono>Solo — you&apos;ll wear all four hats. The app reshapes per role.</Mono>}
          </Stack>
        )}

        {step === 2 && (
          <Stack>
            <H1>Connect your tools.</H1>
            <Mono>Optional · pull only, never write without sync on.</Mono>
            <Stack gap="tight">
              {INTEGRATIONS.map((it) => {
                const on = connected[it.name];
                return (
                  <Card key={it.name}>
                    <Spread>
                      <div>
                        <div className="v2-h3">{it.name}</div>
                        <div className="v2-quiet" style={{ fontSize: 13 }}>{it.blurb}</div>
                      </div>
                      <button
                        type="button"
                        className="v2-pill"
                        onClick={() => setConnected((c) => ({ ...c, [it.name]: !on }))}
                        style={on ? { background: "var(--v2-good)", color: "#fff" } : undefined}
                      >
                        {on ? "Connected" : "Connect"}
                      </button>
                    </Spread>
                  </Card>
                );
              })}
            </Stack>
          </Stack>
        )}

        {step === 3 && (
          <Stack>
            <Icon name="check" size={40} />
            <H1>You&apos;re in.</H1>
            <Mono>Workspace ready · {trade} · {crew}</Mono>
            <Card>
              <Stack gap="tight">
                <Mono>· Pricing book drafted</Mono>
                <Mono>· Team imported</Mono>
                <Mono>· First project — create it next</Mono>
              </Stack>
            </Card>
          </Stack>
        )}

        <Fill />
        <Button variant="primary" onClick={next}>
          {step < last ? "Continue" : "Open Stringline"}
        </Button>
      </Stack>
    </Pad>
  );
}

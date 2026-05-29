import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Pill } from "@/components/ui";
import { getScopeLibrary } from "@/server/estimator";

const rate = (n: number) => "$" + n.toFixed(2);

export async function EstimatorLibrary() {
  const items = await getScopeLibrary();
  const margins = items.map((i) => i.marginPct).filter((m): m is number => m != null);
  const avgMargin = margins.length ? margins.reduce((s, m) => s + m, 0) / margins.length : null;

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Pricing book</Eyebrow>
          <H1>{items.length} {items.length === 1 ? "assembly" : "assemblies"}.</H1>
          <div className="v2-quiet v2-body">
            {avgMargin != null ? `${Math.round(avgMargin * 100)}% average gross margin.` : "Cost and sell rates drive every bid."}
          </div>
        </Stack>
      </Pad>

      <SectionBar>
        <Eyebrow>Scopes</Eyebrow>
        <Mono>cost → sell · /unit</Mono>
      </SectionBar>

      <div>
        {items.map((s) => {
          const lowMargin = s.marginPct != null && s.marginPct < 0.3;
          return (
            <Row
              key={s.id}
              lead={
                <span
                  aria-hidden
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                    background: s.color ?? "var(--v2-quiet, #888)",
                    display: "inline-block",
                  }}
                />
              }
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="v2-h3">{s.name}</div>
                <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>
                  {s.code} · per {s.unit}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <Mono>{rate(s.cost)} → {rate(s.sell)}</Mono>
              </div>
              {s.marginPct != null && (
                <Pill tone={lowMargin ? "bad" : "good"}>{Math.round(s.marginPct * 100)}%</Pill>
              )}
            </Row>
          );
        })}
      </div>
    </>
  );
}

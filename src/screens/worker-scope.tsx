import { Pad, Stack, Eyebrow, H2, Card, Mono, Pill } from "@/components/ui";
import { Icon } from "@/components/icon";
import { workerScope } from "@/lib/demo-data";

export function WorkerScope() {
  const pct = Math.round((workerScope.doneSqft / workerScope.goalSqft) * 100);

  return (
    <Pad>
      <Stack>
        <Stack gap="tight">
          <Eyebrow>Today&apos;s goal · scoped by {workerScope.scopedBy} · {workerScope.scopedAt}</Eyebrow>
          <H2>
            {workerScope.doneSqft} / {workerScope.goalSqft} sf
          </H2>
        </Stack>

        <div style={{ height: 10, background: "var(--v2-ink-2)", border: "2px solid var(--v2-sand-2)" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "var(--v2-accent)" }} />
        </div>
        <Mono>{pct}% of today</Mono>

        <Stack gap="tight">
          {workerScope.steps.map((s) => (
            <Card key={s.label} style={s.now ? { borderColor: "var(--v2-accent)" } : undefined}>
              <div className="v2-row-spread">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {s.done ? (
                    <Icon name="check" size={18} />
                  ) : (
                    <span className="v2-mono" style={{ opacity: 0.6 }}>○</span>
                  )}
                  <span className="v2-body" style={{ textDecoration: s.done ? "line-through" : "none", opacity: s.done ? 0.6 : 1 }}>
                    {s.label}
                  </span>
                </div>
                {s.now && <Pill tone="live" dot>Now</Pill>}
              </div>
            </Card>
          ))}
        </Stack>

        <Card>
          <Mono>On site for you</Mono>
          <div className="v2-body" style={{ fontSize: 14, marginTop: 6 }}>{workerScope.onSite}</div>
        </Card>
      </Stack>
    </Pad>
  );
}

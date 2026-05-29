import { Pad, Stack, Eyebrow, H2, Card, Mono, Pill } from "@/components/ui";
import { Icon } from "@/components/icon";
import { getWorkerScope } from "@/server/worker";
import { toggleScopeStep } from "@/server/actions";

export async function WorkerScope() {
  const scope = await getWorkerScope();
  if (!scope) {
    return (
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Today&apos;s goal</Eyebrow>
          <H2>No scope assigned yet.</H2>
        </Stack>
      </Pad>
    );
  }
  const pct = scope.goalSqft ? Math.round((scope.doneSqft / scope.goalSqft) * 100) : 0;

  return (
    <Pad>
      <Stack>
        <Stack gap="tight">
          <Eyebrow>Today&apos;s goal · scoped by {scope.scopedBy} · {scope.scopedAt}</Eyebrow>
          <H2>
            {scope.doneSqft} / {scope.goalSqft} sf
          </H2>
        </Stack>

        <div style={{ height: 10, background: "var(--v2-ink-2)", border: "2px solid var(--v2-sand-2)" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "var(--v2-accent)" }} />
        </div>
        <Mono>{pct}% of today</Mono>

        <Stack gap="tight">
          {scope.steps.map((s) => (
            <form key={s.id} action={toggleScopeStep.bind(null, s.id)}>
              <button type="submit" style={{ all: "unset", display: "block", width: "100%", cursor: "pointer" }}>
                <Card style={s.now ? { borderColor: "var(--v2-accent)" } : undefined}>
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
              </button>
            </form>
          ))}
        </Stack>

        <Card>
          <Mono>On site for you</Mono>
          <div className="v2-body" style={{ fontSize: 14, marginTop: 6 }}>{scope.onSite}</div>
        </Card>
      </Stack>
    </Pad>
  );
}

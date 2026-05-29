import { Pad, Stack, Eyebrow, Pill, BigNum, Button, StatusBlock, Tile, Mono } from "@/components/ui";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { getWorkerHome } from "@/server/worker";
import { clockIn, clockOut, toggleBreak } from "@/server/actions";

// Worker runs the dark theme (AppShell sets it). One decision per screen.
export async function WorkerHome() {
  const w = await getWorkerHome();
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  return (
    <Pad>
      <Stack>
        <Stack gap="tight">
          <Eyebrow>{today}</Eyebrow>
          <div className="v2-h2">Hey, {w.name}.</div>
        </Stack>

        {w.clockedIn ? (
          <>
            <Pill tone="live" dot>
              {w.site} · {w.onBreak ? "on break" : "clocked in"}
            </Pill>

            <StatusBlock>
              <Eyebrow>On the clock since {w.since}</Eyebrow>
              <div style={{ marginTop: 8 }}>
                <BigNum>{w.elapsed}</BigNum>
              </div>
              {w.scope && (
                <div className="v2-quiet" style={{ marginTop: 6, fontSize: 13 }}>
                  {w.scope}
                </div>
              )}
            </StatusBlock>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <form action={toggleBreak.bind(null, w.entryId!)}>
                <Button type="submit" style={{ width: "100%" }}>{w.onBreak ? "Resume" : "Break"}</Button>
              </form>
              <form action={clockOut.bind(null, w.entryId!)}>
                <Button variant="danger" type="submit" style={{ width: "100%" }}>Clock out</Button>
              </form>
            </div>
          </>
        ) : (
          <>
            <Pill dot>Off the clock</Pill>
            <StatusBlock>
              <Eyebrow>Not clocked in</Eyebrow>
              {w.scope && (
                <div className="v2-quiet" style={{ marginTop: 8, fontSize: 13 }}>
                  {w.scope}
                </div>
              )}
            </StatusBlock>
            {w.projectId && (
              <form action={clockIn.bind(null, w.projectId, w.userId)}>
                <Button variant="primary" type="submit" style={{ width: "100%" }}>Clock in</Button>
              </form>
            )}
          </>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {([
            { name: "camera", label: "Photo", href: "/worker/log" },
            { name: "log", label: "Note", href: "/worker/log" },
            { name: "field", label: "Issue", href: "/worker/log" },
            { name: "scope", label: "Scope", href: "/worker/scope" },
          ] as const).map((t) => (
            <Link key={t.label} href={t.href} style={{ textDecoration: "none" }}>
              <Tile style={{ width: "100%" }}>
                <Icon name={t.name} />
                <Mono>{t.label}</Mono>
              </Tile>
            </Link>
          ))}
        </div>
      </Stack>
    </Pad>
  );
}

import { Pad, Spread, Eyebrow, H2, IconButton, SectionBar, Mono } from "@/components/ui";
import { Icon } from "@/components/icon";
import { getWorkerHome, getWorkerLog } from "@/server/worker";
import { addWorkerPhoto } from "@/server/actions";

export async function WorkerLog() {
  const [log, w] = await Promise.all([getWorkerLog(), getWorkerHome()]);

  return (
    <>
      <Pad>
        <Spread>
          <div>
            <Eyebrow>Log history</Eyebrow>
            <H2 style={{ marginTop: 4 }}>{log.total} photos this week</H2>
          </div>
          {w.projectId && (
            <form action={addWorkerPhoto.bind(null, w.projectId, w.userId, "EPS")}>
              <IconButton accent aria-label="New photo" type="submit">
                <Icon name="camera" size={20} />
              </IconButton>
            </form>
          )}
        </Spread>
      </Pad>

      {log.sections.map((sec) => (
        <div key={sec.day}>
          <SectionBar>
            <Eyebrow>{sec.day}</Eyebrow>
            <Mono>{sec.items.length}</Mono>
          </SectionBar>
          <Pad>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {sec.items.map((p, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: "1",
                    border: "2px solid var(--v2-sand-2)",
                    background: "var(--v2-ink-2)",
                    position: "relative",
                  }}
                >
                  <span
                    className="v2-mono"
                    style={{ position: "absolute", top: 4, left: 4, background: "var(--v2-accent)", color: "var(--v2-accent-ink)", padding: "1px 5px", fontSize: 9 }}
                  >
                    {p.tag}
                  </span>
                  {p.time && (
                    <span className="v2-mono" style={{ position: "absolute", bottom: 4, right: 4, fontSize: 9, opacity: 0.7 }}>
                      {p.time}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Pad>
        </div>
      ))}
    </>
  );
}

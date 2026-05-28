import { Pad, Spread, Eyebrow, H2, IconButton, SectionBar, Mono } from "@/components/ui";
import { Icon } from "@/components/icon";
import { workerPhotos } from "@/lib/demo-data";

export function WorkerLog() {
  const total = workerPhotos.reduce((n, s) => n + s.items.length, 0);

  return (
    <>
      <Pad>
        <Spread>
          <div>
            <Eyebrow>Log history</Eyebrow>
            <H2 style={{ marginTop: 4 }}>{total} photos this week</H2>
          </div>
          <IconButton accent aria-label="New photo">
            <Icon name="camera" size={20} />
          </IconButton>
        </Spread>
      </Pad>

      {workerPhotos.map((sec) => (
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

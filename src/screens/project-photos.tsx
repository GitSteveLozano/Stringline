import { Pad, Stack, Eyebrow, H1, SectionBar, Mono } from "@/components/ui";
import { getProjectPhotos, type PhotoItem } from "@/server/photos";

function PhotoTile({ p }: { p: PhotoItem }) {
  return (
    <div style={{ border: "2px solid var(--v2-ink)", background: "var(--v2-sand-2)", overflow: "hidden" }}>
      <div
        style={{
          aspectRatio: "1 / 1",
          background: p.url ? `center/cover url(${p.url})` : "var(--v2-sand-2)",
          display: "flex",
          alignItems: "flex-end",
          padding: 8,
        }}
      >
        <span
          className="v2-mono"
          style={{ fontSize: 11, fontWeight: 700, background: "var(--v2-accent)", color: "var(--v2-accent-ink)", padding: "2px 6px", border: "1px solid var(--v2-ink)" }}
        >
          {p.tag}
        </span>
      </div>
      <div className="v2-quiet" style={{ fontSize: 12, padding: "6px 8px", borderTop: "2px solid var(--v2-ink)" }}>
        {p.who} · {p.time}
      </div>
    </div>
  );
}

export async function ProjectPhotos({ id }: { id: string }) {
  const { project, total, sections } = await getProjectPhotos(id);

  if (!project) {
    return (
      <Pad><div className="v2-quiet v2-body">Project not found.</div></Pad>
    );
  }

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>{project}</Eyebrow>
          <H1>{total} site {total === 1 ? "photo" : "photos"}.</H1>
          <div className="v2-quiet v2-body">Field documentation from the crew, newest first.</div>
        </Stack>
      </Pad>

      {total === 0 ? (
        <Pad><div className="v2-quiet v2-body">No photos yet.</div></Pad>
      ) : (
        sections.map((s) => (
          <div key={s.day}>
            <SectionBar>
              <Eyebrow>{s.day}</Eyebrow>
              <Mono>{s.items.length}</Mono>
            </SectionBar>
            <Pad>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
                {s.items.map((p) => <PhotoTile key={p.id} p={p} />)}
              </div>
            </Pad>
          </div>
        ))
      )}
    </>
  );
}

import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Spread, Meter } from "@/components/ui";
import { getProjectLogs, type ProjectLogEntry } from "@/server/foreman";

function LogEntry({ e }: { e: ProjectLogEntry }) {
  const pace = e.sqftPlanned > 0 ? e.sqftDone / e.sqftPlanned : 0;
  return (
    <div className="v2-pad" style={{ paddingTop: 12, paddingBottom: 14 }}>
      <div className="v2-quiet" style={{ fontSize: 13 }}>
        {e.weather} · {e.foreman} · {e.crewHours}h crew · {e.photos} {e.photos === 1 ? "photo" : "photos"}
      </div>
      {e.narrative && (
        <div className="v2-body" style={{ fontSize: 14, marginTop: 8 }}>{e.narrative}</div>
      )}
      <div style={{ marginTop: 10 }}>
        <Spread>
          <span className="v2-quiet" style={{ fontSize: 13 }}>Progress</span>
          <Mono>{e.sqftDone.toLocaleString()} / {e.sqftPlanned.toLocaleString()} sf</Mono>
        </Spread>
        <Meter value={pace} danger={e.sqftPlanned > 0 && e.sqftDone < e.sqftPlanned * 0.8} />
      </div>
    </div>
  );
}

export async function ProjectLog({ id }: { id: string }) {
  const { project, entries } = await getProjectLogs(id);

  if (!project) {
    return <Pad><div className="v2-quiet v2-body">Project not found.</div></Pad>;
  }

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>{project}</Eyebrow>
          <H1>{entries.length} {entries.length === 1 ? "log" : "logs"}.</H1>
          <div className="v2-quiet v2-body">The daily journal — what happened on site, newest first.</div>
        </Stack>
      </Pad>

      {entries.length === 0 ? (
        <Pad><div className="v2-quiet v2-body">No submitted logs yet.</div></Pad>
      ) : (
        <div className="v2-cols">
          {entries.map((e) => (
            <section key={e.id}>
              <SectionBar>
                <Eyebrow>{e.date}</Eyebrow>
                <Mono>{e.sqftDone.toLocaleString()} sf</Mono>
              </SectionBar>
              <LogEntry e={e} />
            </section>
          ))}
        </div>
      )}
    </>
  );
}

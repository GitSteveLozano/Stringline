import { SectionBar, Eyebrow, Mono, Row, Pill } from "@/components/ui";
import { crew, projects } from "@/lib/demo-data";

// Crew roster grouped by site. Foreman view — status, not dollars.
export function ForemanCrew() {
  const sites = projects.filter((p) => p.status === "IN_PROGRESS");

  return (
    <>
      {sites.map((site) => {
        const members = crew.filter((c) => c.project === site.id);
        if (members.length === 0) return null;
        const here = members.filter((m) => m.clockedIn).length;
        return (
          <div key={site.id}>
            <SectionBar>
              <Eyebrow>{site.name}</Eyebrow>
              <Mono>
                {here}/{members.length} on site
              </Mono>
            </SectionBar>
            {members.map((m) => (
              <Row key={m.id} lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{m.initials}</span>}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="v2-h3">{m.name}</div>
                  <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>
                    {m.role} · {m.hoursWeek}h this week
                  </div>
                </div>
                <Pill tone={m.clockedIn ? "live" : undefined} dot={m.clockedIn}>
                  {m.clockedIn ? "On site" : "Off"}
                </Pill>
              </Row>
            ))}
          </div>
        );
      })}
    </>
  );
}

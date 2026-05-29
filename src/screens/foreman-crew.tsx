import { SectionBar, Eyebrow, Mono, Row, Pill, DataTable } from "@/components/ui";
import { getForemanCrew } from "@/server/foreman";

// Crew roster grouped by site. Foreman view — status, not dollars.
export async function ForemanCrew() {
  const sites = await getForemanCrew();
  const allCrew = sites.flatMap(({ site, members }) => members.map((m) => ({ ...m, siteName: site.name })));

  return (
    <>
      {/* Desktop: one crew table */}
      <DataTable
        columns={[
          { label: "Crew" },
          { label: "Role", width: "150px" },
          { label: "Site" },
          { label: "Hours", num: true, width: "110px" },
          { label: "Status", width: "130px" },
        ]}
        rows={allCrew.map((m) => ({
          id: m.id,
          cells: [
            <span key="n" className="v2-gtd-strong">{m.name}</span>,
            m.role,
            m.siteName,
            `${m.hoursWeek}h`,
            <Pill key="s" tone={m.clockedIn ? "live" : undefined} dot={m.clockedIn}>{m.clockedIn ? "On site" : "Off"}</Pill>,
          ],
        }))}
      />

      {/* Mobile: grouped by site */}
      <div className="v2-only-mobile">
      {sites.map(({ site, members }) => {
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
      </div>
    </>
  );
}

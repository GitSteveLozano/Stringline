import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Pill, Button, DataTable } from "@/components/ui";
import { getSchedule, type ScheduleEntry } from "@/server/schedule";
import type { AssignmentStatus } from "@prisma/client";

function statusPill(status: AssignmentStatus) {
  if (status === "CONFIRMED") return <Pill tone="good">Confirmed</Pill>;
  if (status === "SENT") return <Pill tone="live" dot>Sent</Pill>;
  if (status === "DECLINED") return <Pill tone="bad">Declined</Pill>;
  return <Pill>Pending</Pill>;
}

function EntryRow({ e }: { e: ScheduleEntry }) {
  const meta = [
    e.crew.join(", "),
    e.sqft ? `${e.sqft.toLocaleString()} sqft` : null,
    e.plannedHr ? `${e.plannedHr}h` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <Link href={`/project/${e.projectId}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <Row lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{e.project[0]}</span>}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="v2-h3">{e.scope ?? e.project}</div>
          <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>
            {e.project}
            {meta ? ` · ${meta}` : ""}
          </div>
        </div>
        {statusPill(e.status)}
      </Row>
    </Link>
  );
}

export async function Schedule() {
  const { days, summary } = await getSchedule();

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Next 7 days</Eyebrow>
          <H1>
            {summary.assignments === 0
              ? "Nothing scheduled."
              : `${summary.crewDays} crew-${summary.crewDays === 1 ? "day" : "days"} booked.`}
          </H1>
          <div className="v2-quiet v2-body">
            {summary.assignments} {summary.assignments === 1 ? "assignment" : "assignments"} · {summary.confirmed} confirmed.
          </div>
          <Link href="/schedule/new" style={{ textDecoration: "none" }}>
            <Button variant="primary">+ Assign crew</Button>
          </Link>
        </Stack>
      </Pad>

      {/* Desktop: one schedule table */}
      <DataTable
        columns={[
          { label: "Day", width: "150px" },
          { label: "Scope" },
          { label: "Project" },
          { label: "Crew", width: "160px" },
          { label: "Status", width: "140px" },
        ]}
        rows={days.flatMap((d) =>
          d.entries.map((e) => ({
            id: e.id,
            href: `/project/${e.projectId}`,
            cells: [
              <span key="d" className={d.isToday ? "v2-gtd-strong" : undefined}>{d.isToday ? "Today" : d.label}</span>,
              <span key="s" className="v2-gtd-strong">{e.scope ?? "—"}</span>,
              e.project,
              e.crew.join(", "),
              statusPill(e.status),
            ],
          })),
        )}
      />

      {/* Mobile: day-grouped cards */}
      <div className="v2-only-mobile">
        <div className="v2-cols">
          {days.map((d) => (
            <section key={d.key}>
              <SectionBar>
                <Eyebrow accent={d.isToday}>{d.isToday ? `Today · ${d.label}` : d.label}</Eyebrow>
                <Mono>{d.entries.length || "—"}</Mono>
              </SectionBar>
              {d.entries.length === 0 ? (
                <Pad><div className="v2-quiet" style={{ fontSize: 13 }}>No crew scheduled.</div></Pad>
              ) : (
                d.entries.map((e) => <EntryRow key={e.id} e={e} />)
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Pill, Button } from "@/components/ui";
import Link from "next/link";
import { money0 } from "@/lib/demo-data";
import { getDispatchBoard, type DispatchRow } from "@/server/dispatch";
import { returnDispatch } from "@/server/actions";

function DispatchItem({ d }: { d: DispatchRow }) {
  const sub =
    d.status === "OVERDUE"
      ? `${d.project} · due back ${d.dueBack} · ${d.overdueDays}d late`
      : d.status === "RETURNED"
        ? `${d.project} · returned`
        : `${d.project} · due back ${d.dueBack ?? "—"}`;
  return (
    <Row lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{d.qty}×</span>}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Link href={`/project/${d.projectId}`} style={{ textDecoration: "none", color: "inherit" }}>
          <div className="v2-h3">{d.asset}</div>
        </Link>
        <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>
          {d.ticketId} · {sub}
        </div>
      </div>
      {d.status === "OVERDUE" && <Pill tone="bad" dot>Overdue</Pill>}
      {d.status !== "RETURNED" && (
        <form action={returnDispatch.bind(null, d.id)}>
          <Button variant="ghost" type="submit">Return</Button>
        </form>
      )}
    </Row>
  );
}

export async function Dispatch() {
  const { onJob, returned, summary } = await getDispatchBoard();

  const tiles = [
    { label: "On job", value: String(summary.outCount) },
    { label: "Overdue", value: String(summary.overdueCount) },
    { label: "On rent / day", value: money0(summary.onRentValue) },
  ];

  return (
    <>
      <Pad>
        <Stack>
          <Eyebrow>Dispatch</Eyebrow>
          <H1>
            {summary.overdueCount > 0
              ? `${summary.overdueCount} ${summary.overdueCount === 1 ? "item is" : "items are"} overdue.`
              : summary.outCount > 0
                ? `${summary.outCount} ${summary.outCount === 1 ? "item" : "items"} out on jobs.`
                : "Nothing out right now."}
          </H1>
          <div className="v2-quiet v2-body">
            {money0(summary.onRentValue)}/day of gear on site across your jobs.
          </div>
          <Link href="/assets" style={{ textDecoration: "none" }}>
            <span className="v2-mono" style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              View equipment yard →
            </span>
          </Link>
        </Stack>
      </Pad>

      <Pad>
        <div className="v2-stat-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
          {tiles.map((t) => (
            <div key={t.label} className="v2-card">
              <Eyebrow>{t.label}</Eyebrow>
              <div className="v2-h2" style={{ marginTop: 8 }}>{t.value}</div>
            </div>
          ))}
        </div>
      </Pad>

      <div className="v2-cols">
        <section>
          <SectionBar>
            <Eyebrow>On job</Eyebrow>
            <Mono>{onJob.length}</Mono>
          </SectionBar>
          {onJob.length === 0 ? (
            <Pad><div className="v2-quiet v2-body">Nothing out.</div></Pad>
          ) : (
            onJob.map((d) => <DispatchItem key={d.id} d={d} />)
          )}
        </section>

        <section>
          <SectionBar>
            <Eyebrow>Returned</Eyebrow>
            <Mono>{returned.length}</Mono>
          </SectionBar>
          {returned.length === 0 ? (
            <Pad><div className="v2-quiet v2-body">No returns yet.</div></Pad>
          ) : (
            returned.map((d) => <DispatchItem key={d.id} d={d} />)
          )}
        </section>
      </div>
    </>
  );
}

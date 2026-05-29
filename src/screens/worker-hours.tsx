import { Pad, Stack, Eyebrow, BigNum, SectionBar, Mono, Row, Pill } from "@/components/ui";
import { money0 } from "@/lib/demo-data";
import { getWorkerHours } from "@/server/worker";

export async function WorkerHours() {
  const workerWeek = await getWorkerHours();
  const maxH = Math.max(...workerWeek.days.map((d) => d.h || d.plan || 1));

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>This week</Eyebrow>
          <BigNum unit="h">{workerWeek.totalHours}</BigNum>
          <div className="v2-quiet v2-body">{money0(workerWeek.grossPay)} gross so far</div>
        </Stack>
      </Pad>

      <Pad>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 88 }}>
          {workerWeek.days.map((d, i) => {
            const h = d.h || 0;
            const planned = !h && d.plan;
            return (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    height: `${((h || d.plan || 0) / maxH) * 64}px`,
                    background: planned ? "transparent" : "var(--v2-accent)",
                    border: planned ? "2px dashed var(--v2-sand-2)" : "2px solid var(--v2-sand-2)",
                  }}
                />
                <Mono>{d.d}</Mono>
              </div>
            );
          })}
        </div>
      </Pad>

      <SectionBar>
        <Eyebrow>Entries</Eyebrow>
      </SectionBar>
      <div>
        {workerWeek.entries.map((e, i) => (
          <Row key={i}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="v2-h3">{e.date}</div>
              <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{e.site}</div>
            </div>
            <Mono>{e.hours}h</Mono>
            <Pill tone={e.status === "Approved" || e.status === "Paid" ? "good" : undefined}>{e.status}</Pill>
          </Row>
        ))}
      </div>
    </>
  );
}

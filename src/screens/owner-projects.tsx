import { SectionBar, Mono, Eyebrow, Row, Pill } from "@/components/ui";
import { projects, healthLabel, type Project, type ProjectHealth } from "@/lib/demo-data";

function tone(h: ProjectHealth): "good" | "bad" | undefined {
  if (h === "ON_TRACK") return "good";
  if (h === "OVER_BUDGET" || h === "AT_RISK") return "bad";
  return undefined;
}

/** Bucketed by who owes the next action, not by raw status. */
const BUCKETS: { label: string; match: (p: Project) => boolean }[] = [
  { label: "Yours to move", match: (p) => p.status === "DRAFTING" || p.status === "ACCEPTED" },
  { label: "Awaiting client", match: (p) => p.status === "SENT" },
  { label: "Running", match: (p) => p.status === "IN_PROGRESS" },
  { label: "Closeout", match: (p) => p.status === "DONE" || p.status === "PAID" },
];

export function OwnerProjects() {
  return (
    <>
      {BUCKETS.map((b) => {
        const items = projects.filter(b.match);
        if (items.length === 0) return null;
        return (
          <div key={b.label}>
            <SectionBar>
              <Eyebrow>{b.label}</Eyebrow>
              <Mono>{items.length}</Mono>
            </SectionBar>
            {items.map((p) => (
              <Row
                key={p.id}
                lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{p.name[0]}</span>}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="v2-h3">{p.name}</div>
                  <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>
                    {p.client}
                    {p.dayOf ? ` · Day ${p.dayOf} of ${p.dayTotal}` : ""}
                  </div>
                </div>
                <Pill tone={tone(p.health)}>{healthLabel[p.health]}</Pill>
              </Row>
            ))}
          </div>
        );
      })}
    </>
  );
}

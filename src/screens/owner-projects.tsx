import Link from "next/link";
import { SectionBar, Mono, Eyebrow, Row, Pill, Button, Pad } from "@/components/ui";
import { healthLabel, type Project, type ProjectHealth } from "@/lib/demo-data";
import { listProjects } from "@/server/projects";

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

export async function OwnerProjects() {
  const projects = await listProjects();
  return (
    <>
      <Pad>
        <Link href="/project/new" style={{ textDecoration: "none" }}>
          <Button variant="primary" style={{ width: "100%" }}>+ New project</Button>
        </Link>
      </Pad>
      <div className="v2-cols">
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
              <Link key={p.id} href={`/project/${p.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <Row lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{p.name[0]}</span>}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="v2-h3">{p.name}</div>
                    <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>
                      {p.client}
                      {p.dayOf ? ` · Day ${p.dayOf} of ${p.dayTotal}` : ""}
                    </div>
                  </div>
                  <Pill tone={tone(p.health)}>{healthLabel[p.health]}</Pill>
                </Row>
              </Link>
            ))}
          </div>
        );
      })}
      </div>
    </>
  );
}

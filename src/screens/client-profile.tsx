import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Pill } from "@/components/ui";
import { money0, healthLabel, statusLabel, type ProjectHealth } from "@/lib/demo-data";
import { getClientProfile, clientKindLabel } from "@/server/estimator";

function tone(h: ProjectHealth): "good" | "bad" | undefined {
  if (h === "ON_TRACK") return "good";
  if (h === "OVER_BUDGET" || h === "AT_RISK") return "bad";
  return undefined;
}

export async function ClientProfile({ id }: { id: string }) {
  const c = await getClientProfile(id);
  if (!c) {
    return (
      <Pad>
        <div className="v2-quiet v2-body">Client not found.</div>
      </Pad>
    );
  }

  const tiles = [
    { label: "Projects", value: String(c.summary.projectCount) },
    { label: "Pipeline", value: money0(c.summary.pipelineValue) },
    { label: "Won", value: money0(c.summary.wonValue) },
  ];

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>{clientKindLabel(c.kind)}{c.isLead ? " · Lead" : ""}</Eyebrow>
          <H1>{c.name}</H1>
          {(c.email || c.phone) && (
            <div className="v2-quiet v2-body">
              {[c.email, c.phone].filter(Boolean).join(" · ")}
            </div>
          )}
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

      <SectionBar>
        <Eyebrow>Projects</Eyebrow>
        <Mono>{c.projects.length}</Mono>
      </SectionBar>
      <div>
        {c.projects.length === 0 ? (
          <Pad><div className="v2-quiet v2-body">No projects yet.</div></Pad>
        ) : (
          c.projects.map((p) => (
            <Link key={p.id} href={`/project/${p.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <Row lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{p.name[0]}</span>}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="v2-h3">{p.name}</div>
                  <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{statusLabel[p.status]}</div>
                </div>
                {p.value > 0 && <Mono>{money0(p.value)}</Mono>}
                <Pill tone={tone(p.health)}>{healthLabel[p.health]}</Pill>
              </Row>
            </Link>
          ))
        )}
      </div>
    </>
  );
}

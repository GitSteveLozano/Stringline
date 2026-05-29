import Link from "next/link";
import { Pad, Card, Spread, Eyebrow, SectionBar, Mono, Row, Pill } from "@/components/ui";
import { Icon } from "@/components/icon";
import { approvals } from "@/lib/demo-data";
import { getTeam } from "@/server/team";

export async function OwnerTeam() {
  const team = await getTeam();
  const office = team.filter((m) => m.group === "Office");
  const field = team.filter((m) => m.group === "Field");

  return (
    <>
      {/* Approvals entry (lives off Team, per the design) */}
      <Pad>
        <Link href="/approvals" style={{ textDecoration: "none", color: "inherit" }}>
          <Card accent>
            <Spread>
              <Eyebrow>Approvals</Eyebrow>
              <Icon name="chevron" size={18} />
            </Spread>
            <div className="v2-h2" style={{ marginTop: 8 }}>
              {approvals.length} pending
            </div>
          </Card>
        </Link>
      </Pad>

      <SectionBar>
        <Eyebrow>Office</Eyebrow>
        <Mono>{office.length}</Mono>
      </SectionBar>
      <div>
        {office.map((m) => (
          <Row key={m.id} lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{m.initials}</span>}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="v2-h3">{m.name}</div>
              <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{m.role}</div>
            </div>
          </Row>
        ))}
      </div>

      <SectionBar>
        <Eyebrow>Field</Eyebrow>
        <Mono>{field.length}</Mono>
      </SectionBar>
      <div>
        {field.map((m) => (
          <Row key={m.id} lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{m.initials}</span>}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="v2-h3">{m.name}</div>
              <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>
                {m.role}
                {m.rate ? ` · $${m.rate}/h` : ""}
              </div>
            </div>
            {m.pending && <Pill>Invited</Pill>}
          </Row>
        ))}
      </div>
    </>
  );
}

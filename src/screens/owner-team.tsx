import Link from "next/link";
import { Pad, Card, Spread, Eyebrow, SectionBar, Mono, Row, Pill, Button, DataTable } from "@/components/ui";
import { Icon } from "@/components/icon";
import { getTeam } from "@/server/team";
import { getPendingApprovalCount } from "@/server/approvals";
import { activateMember } from "@/server/actions";
import type { TeamMember } from "@/lib/demo-data";

function MemberRow({ m }: { m: TeamMember }) {
  return (
    <Row lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{m.initials}</span>}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="v2-h3">{m.name}</div>
        <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>
          {m.role}
          {m.rate ? ` · $${m.rate}/h` : ""}
        </div>
      </div>
      {m.pending && (
        <>
          <Pill>Invited</Pill>
          <form action={activateMember.bind(null, m.id)}>
            <Button variant="primary" type="submit">Confirm</Button>
          </form>
        </>
      )}
    </Row>
  );
}

export async function OwnerTeam() {
  const [team, pendingApprovals] = await Promise.all([getTeam(), getPendingApprovalCount()]);
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
              {pendingApprovals} pending
            </div>
          </Card>
        </Link>
      </Pad>

      <Pad>
        <Link href="/team/new" style={{ textDecoration: "none" }}>
          <Button variant="primary" style={{ width: "100%" }}>+ Invite teammate</Button>
        </Link>
      </Pad>

      {/* Desktop: one roster table */}
      <DataTable
        columns={[
          { label: "Name" },
          { label: "Role", width: "160px" },
          { label: "Group", width: "120px" },
          { label: "Rate", num: true, width: "110px" },
          { label: "Status", width: "150px" },
        ]}
        rows={team.map((m) => ({
          id: m.id,
          cells: [
            <span key="n" className="v2-gtd-strong">{m.name}</span>,
            m.role,
            m.group,
            m.rate ? `$${m.rate}/h` : "—",
            m.pending ? (
              <form key="s" action={activateMember.bind(null, m.id)}>
                <Button variant="primary" type="submit" style={{ padding: "6px 12px", fontSize: 12 }}>Confirm invite</Button>
              </form>
            ) : (
              <Pill key="s" tone="good">Active</Pill>
            ),
          ],
        }))}
      />

      {/* Mobile: grouped cards */}
      <div className="v2-only-mobile">
        <SectionBar>
          <Eyebrow>Office</Eyebrow>
          <Mono>{office.length}</Mono>
        </SectionBar>
        <div>
          {office.map((m) => (
            <MemberRow key={m.id} m={m} />
          ))}
        </div>
        <SectionBar>
          <Eyebrow>Field</Eyebrow>
          <Mono>{field.length}</Mono>
        </SectionBar>
        <div>
          {field.map((m) => (
            <MemberRow key={m.id} m={m} />
          ))}
        </div>
      </div>
    </>
  );
}

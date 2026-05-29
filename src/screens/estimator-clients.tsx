import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Pill, Button, DataTable } from "@/components/ui";
import { money0 } from "@/lib/demo-data";
import { initials } from "@/server/format";
import { getEstimatorClients, clientKindLabel } from "@/server/estimator";

export async function EstimatorClients() {
  const clients = await getEstimatorClients();
  const leadCount = clients.filter((c) => c.isLead).length;

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Book of business</Eyebrow>
          <H1>{clients.length} {clients.length === 1 ? "client" : "clients"}.</H1>
          <div className="v2-quiet v2-body">
            {leadCount} {leadCount === 1 ? "lead" : "leads"} not yet won.
          </div>
          <Button href="/client/new" variant="primary">+ New client</Button>
        </Stack>
      </Pad>

      <SectionBar>
        <Eyebrow>All clients</Eyebrow>
        <Mono>{clients.length}</Mono>
      </SectionBar>

      <DataTable
        columns={[
          { label: "Client" },
          { label: "Type", width: "150px" },
          { label: "Projects", num: true, width: "120px" },
          { label: "Value", num: true, width: "140px" },
          { label: "", width: "90px" },
        ]}
        rows={clients.map((c) => ({
          id: c.id,
          href: `/client/${c.id}`,
          cells: [
            <span key="n" className="v2-gtd-strong">{c.name}</span>,
            clientKindLabel(c.kind),
            String(c.projectCount),
            c.activeValue > 0 ? money0(c.activeValue) : "—",
            c.isLead ? <Pill key="l" tone="live" dot>Lead</Pill> : "",
          ],
        }))}
      />
      <div className="v2-only-mobile">
        {clients.map((c) => (
          <Link key={c.id} href={`/client/${c.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <Row lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{initials(c.name)}</span>}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="v2-h3">{c.name}</div>
                <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>
                  {clientKindLabel(c.kind)} · {c.projectCount} {c.projectCount === 1 ? "project" : "projects"}
                </div>
              </div>
              {c.activeValue > 0 && <Mono>{money0(c.activeValue)}</Mono>}
              {c.isLead && <Pill tone="live" dot>Lead</Pill>}
            </Row>
          </Link>
        ))}
      </div>
    </>
  );
}

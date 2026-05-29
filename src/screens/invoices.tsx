import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Pill, StatTile, DataTable } from "@/components/ui";
import { money0 } from "@/lib/demo-data";
import { getInvoicing, type InvoiceRow, type InvoiceStatusView } from "@/server/invoicing";

function statusPill(status: InvoiceStatusView) {
  if (status === "PAID") return <Pill tone="good">Paid</Pill>;
  if (status === "OVERDUE") return <Pill tone="bad" dot>Overdue</Pill>;
  if (status === "PARTIAL") return <Pill tone="live">Partial</Pill>;
  return <Pill>Open</Pill>;
}

function InvoiceLine({ inv }: { inv: InvoiceRow }) {
  return (
    <Link href={`/project/${inv.projectId}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <Row lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{inv.client[0]}</span>}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="v2-h3">{inv.client}</div>
          <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>
            {inv.project} · {inv.dueLabel}
          </div>
        </div>
        <Mono>{money0(inv.balance > 0 ? inv.balance : inv.total)}</Mono>
        {statusPill(inv.status)}
      </Row>
    </Link>
  );
}

export async function Invoices() {
  const { invoices, buckets, summary } = await getInvoicing();
  const open = invoices.filter((i) => i.balance > 0);
  const paid = invoices.filter((i) => i.balance <= 0);

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Accounts receivable</Eyebrow>
          <H1>{money0(summary.outstanding)} outstanding.</H1>
          <div className="v2-quiet v2-body">
            {money0(summary.overdue)} overdue · {money0(summary.collected)} collected to date.
          </div>
        </Stack>
      </Pad>

      <Pad>
        <div className="v2-stat-grid">
          {buckets.map((b) => (
            <StatTile key={b.label} label={b.label}>{money0(b.amount)}</StatTile>
          ))}
        </div>
      </Pad>

      {/* Desktop: invoices table (outstanding first) */}
      <DataTable
        columns={[
          { label: "Client" },
          { label: "Project" },
          { label: "Due", width: "150px" },
          { label: "Balance", num: true, width: "140px" },
          { label: "Status", width: "130px" },
        ]}
        rows={[...open, ...paid].map((inv) => ({
          id: inv.id,
          href: `/project/${inv.projectId}`,
          cells: [
            <span key="c" className="v2-gtd-strong">{inv.client}</span>,
            inv.project,
            inv.dueLabel,
            money0(inv.balance > 0 ? inv.balance : inv.total),
            statusPill(inv.status),
          ],
        }))}
      />

      {/* Mobile: outstanding / paid cards */}
      <div className="v2-only-mobile">
        <div className="v2-cols">
          <section>
            <SectionBar>
              <Eyebrow>Outstanding</Eyebrow>
              <Mono>{open.length}</Mono>
            </SectionBar>
            {open.length === 0 ? (
              <Pad><div className="v2-quiet v2-body">Nothing outstanding — you&apos;re collected up.</div></Pad>
            ) : (
              open.map((inv) => <InvoiceLine key={inv.id} inv={inv} />)
            )}
          </section>

          <section>
            <SectionBar>
              <Eyebrow>Paid</Eyebrow>
              <Mono>{paid.length}</Mono>
            </SectionBar>
            {paid.length === 0 ? (
              <Pad><div className="v2-quiet v2-body">No paid invoices yet.</div></Pad>
            ) : (
              paid.map((inv) => <InvoiceLine key={inv.id} inv={inv} />)
            )}
          </section>
        </div>
      </div>
    </>
  );
}

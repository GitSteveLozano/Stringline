import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Pill, StatTile, DataTable } from "@/components/ui";
import { money0 } from "@/lib/demo-data";
import { getReceivables, getCashSummary } from "@/server/money";

export async function OwnerMoney() {
  const [ar, cash] = await Promise.all([getReceivables(), getCashSummary()]);
  const net = cash.cashIn30 - cash.cashOut30;
  const tiles = [
    { label: "Cash in · 30d", value: money0(cash.cashIn30) },
    { label: "Cash out · 30d", value: money0(cash.cashOut30) },
    { label: "Payroll · this wk", value: money0(cash.payrollThisWeek) },
    { label: "Unbilled", value: money0(cash.unbilled) },
  ];

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Net 30 days</Eyebrow>
          <H1>{money0(net)}</H1>
          <div className="v2-quiet v2-body">In minus out, across all jobs.</div>
          <Link href="/reports" style={{ textDecoration: "none" }}>
            <span className="v2-mono" style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              View insights →
            </span>
          </Link>
        </Stack>
      </Pad>

      <SectionBar>
        <Eyebrow>This month</Eyebrow>
      </SectionBar>
      <Pad>
        <div className="v2-stat-grid">
          {tiles.map((t) => (
            <StatTile key={t.label} label={t.label}>{t.value}</StatTile>
          ))}
        </div>
      </Pad>

      <SectionBar>
        <Eyebrow>Receivables</Eyebrow>
        <Link href="/invoices" className="v2-mono" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", textDecoration: "none" }}>
          AR aging →
        </Link>
      </SectionBar>
      <DataTable
        columns={[
          { label: "Client" },
          { label: "Status", width: "220px" },
          { label: "Balance", num: true, width: "150px" },
        ]}
        rows={ar.map((r) => ({
          id: r.id,
          cells: [
            <span key="c" className="v2-gtd-strong">{r.client}</span>,
            r.age.startsWith("overdue") ? <Pill key="s" tone="bad">Overdue · {r.age.replace("overdue ", "")}</Pill> : r.age,
            money0(r.amount),
          ],
        }))}
      />
      <div className="v2-only-mobile">
        {ar.map((r) => {
          const overdue = r.age.startsWith("overdue");
          return (
            <Row key={r.id}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="v2-h3">{r.client}</div>
                <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{r.age}</div>
              </div>
              <Mono>{money0(r.amount)}</Mono>
              {overdue && <Pill tone="bad">Overdue</Pill>}
            </Row>
          );
        })}
      </div>
    </>
  );
}

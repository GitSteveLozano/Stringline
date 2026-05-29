import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Pill } from "@/components/ui";
import { money, money0 } from "@/lib/demo-data";
import { getReceivables } from "@/server/money";

export async function OwnerMoney() {
  const ar = await getReceivables();
  const net = money.cashIn30 - money.cashOut30;
  const tiles = [
    { label: "Cash in · 30d", value: money0(money.cashIn30) },
    { label: "Cash out · 30d", value: money0(money.cashOut30) },
    { label: "Payroll · this wk", value: money0(money.payrollThisWeek) },
    { label: "Unbilled", value: money0(money.unbilled) },
  ];

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Net 30 days</Eyebrow>
          <H1>{money0(net)}</H1>
          <div className="v2-quiet v2-body">In minus out, across all jobs.</div>
        </Stack>
      </Pad>

      <SectionBar>
        <Eyebrow>This month</Eyebrow>
      </SectionBar>
      <Pad>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {tiles.map((t) => (
            <div key={t.label} className="v2-card">
              <Eyebrow>{t.label}</Eyebrow>
              <div className="v2-h2" style={{ marginTop: 8 }}>{t.value}</div>
            </div>
          ))}
        </div>
      </Pad>

      <SectionBar>
        <Eyebrow>Receivables</Eyebrow>
        <Mono>{ar.length}</Mono>
      </SectionBar>
      <div>
        {ar.map((r) => {
          const overdue = r.age.startsWith("overdue");
          return (
            <Row key={r.client}>
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

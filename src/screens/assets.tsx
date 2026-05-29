import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Spread } from "@/components/ui";
import { money0 } from "@/lib/demo-data";
import { getAssetYard, type AssetRow } from "@/server/assets";

function AssetLine({ a }: { a: AssetRow }) {
  const pct = Math.round(a.utilization * 100);
  const full = a.available === 0 && a.ownedQty > 0;
  return (
    <div className="v2-pad" style={{ paddingTop: 12, paddingBottom: 12 }}>
      <Spread>
        <span className="v2-body" style={{ fontSize: 14, fontWeight: 600 }}>{a.name}</span>
        <Mono>{a.out}/{a.ownedQty} out</Mono>
      </Spread>
      <div style={{ height: 8, background: "var(--v2-sand-2)", border: "1px solid var(--v2-ink)", marginTop: 6 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: full ? "var(--v2-bad)" : "var(--v2-accent)" }} />
      </div>
      <div className="v2-quiet" style={{ fontSize: 13, marginTop: 4 }}>
        {a.available} available · {pct}% utilized
        {a.onRentValue > 0 ? ` · ${money0(a.onRentValue)}/day on rent` : ""}
      </div>
    </div>
  );
}

export async function Assets() {
  const { categories, summary } = await getAssetYard();

  const tiles = [
    { label: "SKUs", value: String(summary.skuCount) },
    { label: "Units out", value: `${summary.unitsOut}/${summary.unitsOwned}` },
    { label: "Utilization", value: `${Math.round(summary.utilization * 100)}%` },
    { label: "On rent / day", value: money0(summary.onRentValue) },
  ];

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Equipment yard</Eyebrow>
          <H1>{Math.round(summary.utilization * 100)}% of the fleet is out.</H1>
          <div className="v2-quiet v2-body">
            {summary.unitsOut} of {summary.unitsOwned} units on jobs · {money0(summary.onRentValue)}/day on rent.
          </div>
        </Stack>
      </Pad>

      <Pad>
        <div className="v2-stat-grid">
          {tiles.map((t) => (
            <div key={t.label} className="v2-card">
              <Eyebrow>{t.label}</Eyebrow>
              <div className="v2-h2" style={{ marginTop: 8 }}>{t.value}</div>
            </div>
          ))}
        </div>
      </Pad>

      <div className="v2-cols">
        {categories.map((c) => (
          <section key={c.name}>
            <SectionBar>
              <Eyebrow>{c.name}</Eyebrow>
              <Mono>{c.rows.length}</Mono>
            </SectionBar>
            <div>
              {c.rows.map((a) => <AssetLine key={a.id} a={a} />)}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Pill } from "@/components/ui";

const TAKEOFFS = [
  { id: "p-foothills", name: "Foothills Medical Annex", client: "AHS Capital", state: "AI READY", tone: "live" as const },
  { id: "p-riverbend", name: "Riverbend Retail Shell", client: "Northline Builders", state: "IN PROGRESS", tone: undefined },
  { id: "p-foothills", name: "Maple Lane Townhomes", client: "Davis (sample)", state: "DRAFT", tone: undefined },
];

export function EstimatorHome() {
  return (
    <>
      <Pad>
        <Stack>
          <Eyebrow>Takeoff desk</Eyebrow>
          <H1>3 bids in flight.</H1>
          <div className="v2-quiet v2-body">
            1 plan set finished auto-takeoff · review before it goes out.
          </div>
        </Stack>
      </Pad>

      <SectionBar>
        <Eyebrow>Active takeoffs</Eyebrow>
        <Mono>3</Mono>
      </SectionBar>

      <div>
        {TAKEOFFS.map((t) => (
          <Link key={t.name} href={`/takeoff/${t.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <Row lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{t.name[0]}</span>}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="v2-h3">{t.name}</div>
                <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{t.client}</div>
              </div>
              <Pill tone={t.tone} dot={t.tone === "live"}>
                {t.state}
              </Pill>
            </Row>
          </Link>
        ))}
      </div>
    </>
  );
}

import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Pill } from "@/components/ui";
import { getTakeoffs } from "@/server/estimator";

export async function EstimatorHome() {
  const { cards, finishedAi } = await getTakeoffs();

  return (
    <>
      <Pad>
        <Stack>
          <Eyebrow>Takeoff desk</Eyebrow>
          <H1>{cards.length} {cards.length === 1 ? "bid" : "bids"} in flight.</H1>
          <div className="v2-quiet v2-body">
            {finishedAi} plan {finishedAi === 1 ? "set" : "sets"} finished auto-takeoff · review before it goes out.
          </div>
        </Stack>
      </Pad>

      <SectionBar>
        <Eyebrow>Active takeoffs</Eyebrow>
        <Mono>{cards.length}</Mono>
      </SectionBar>

      <div>
        {cards.map((t) => (
          <Link key={t.id} href={`/takeoff/${t.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
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

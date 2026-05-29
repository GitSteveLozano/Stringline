import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Pill } from "@/components/ui";
import { money0 } from "@/lib/demo-data";
import { getBidQueue } from "@/server/estimator";

export async function EstimatorQueue() {
  const { stages, inFlightValue, winRate } = await getBidQueue();

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Pipeline value</Eyebrow>
          <H1>{money0(inFlightValue)}</H1>
          <div className="v2-quiet v2-body">
            Out the door and on the desk.
            {winRate != null && ` ${Math.round(winRate * 100)}% win rate on decided bids.`}
          </div>
        </Stack>
      </Pad>

      {stages.map((stage) => (
        <div key={stage.key}>
          <SectionBar>
            <Eyebrow>{stage.label}</Eyebrow>
            <Mono>{stage.items.length ? money0(stage.total) : "—"}</Mono>
          </SectionBar>
          {stage.items.length === 0 ? (
            <Pad>
              <div className="v2-quiet" style={{ fontSize: 13 }}>Nothing here.</div>
            </Pad>
          ) : (
            <div>
              {stage.items.map((item) => (
                <Link
                  key={item.id}
                  href={`/takeoff/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <Row lead={<span className="v2-mono" style={{ fontWeight: 700 }}>{item.name[0]}</span>}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="v2-h3">{item.name}</div>
                      <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{item.client}</div>
                    </div>
                    <Mono>{money0(item.value)}</Mono>
                    {stage.tone && <Pill tone={stage.tone} dot={stage.tone === "live"}>{stage.label}</Pill>}
                  </Row>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

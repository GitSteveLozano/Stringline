"use client";

import { useState } from "react";
import {
  Screen,
  AppBar,
  IconButton,
  Eyebrow,
  H1,
  Row,
  SectionBar,
  Pill,
  Mono,
  BottomBar,
  Scroll,
  Pad,
  Stack,
  Spread,
  type TabItem,
} from "@/components/ui";

const OWNER_TABS: TabItem[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "money", label: "Money" },
  { id: "team", label: "Team" },
  { id: "more", label: "More" },
];

const PROJECTS = [
  { name: "Hillcrest Mews — Ph 4", meta: "Day 18 of 32 · 4 crew on site", tone: "good" as const, status: "ON TRACK" },
  { name: "Aspen Ridge Townhomes", meta: "Day 12 of 35 · 6 crew on site", tone: "live" as const, status: "WATCH" },
  { name: "Greenwillow Senior Living", meta: "Closeout · invoice sent", tone: undefined, status: "AWAITING $" },
];

export default function Home() {
  const [tab, setTab] = useState("home");

  return (
    <div className="v2-frame">
      <Screen>
        <AppBar
          title="Stringline"
          trailing={
            <>
              <Pill>Wearing · Owner</Pill>
              <IconButton aria-label="Menu">≡</IconButton>
            </>
          }
        />

        <Scroll>
          <Pad>
            <Stack>
              <Eyebrow>Tuesday · May 28</Eyebrow>
              <H1>You&apos;re caught up.</H1>
              <div className="v2-quiet v2-body">
                3 jobs running · 18 crew on the clock · nothing needs you.
              </div>
            </Stack>
          </Pad>

          <SectionBar>
            <Eyebrow>Today on site</Eyebrow>
            <Mono>3</Mono>
          </SectionBar>

          <div>
            {PROJECTS.map((p) => (
              <Row
                key={p.name}
                lead={<span style={{ fontFamily: "var(--v2-font-mono)", fontWeight: 700 }}>{p.name[0]}</span>}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="v2-h3">{p.name}</div>
                  <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>
                    {p.meta}
                  </div>
                </div>
                <Pill tone={p.tone} dot={p.tone === "live"}>
                  {p.status}
                </Pill>
              </Row>
            ))}
          </div>

          <Pad>
            <Spread>
              <Eyebrow>Scaffolding demo</Eyebrow>
              <Mono>v2 primitives</Mono>
            </Spread>
          </Pad>
        </Scroll>

        <BottomBar tabs={OWNER_TABS} active={tab} onChange={setTab} />
      </Screen>
    </div>
  );
}

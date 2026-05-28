import { Pad, Stack, Eyebrow, Pill, BigNum, Button, StatusBlock, Tile, Mono } from "@/components/ui";
import { Icon } from "@/components/icon";

// Worker runs the dark theme (AppShell sets it). One decision per screen.
export function WorkerHome() {
  return (
    <Pad>
      <Stack>
        <Stack gap="tight">
          <Eyebrow>Monday · Apr 28</Eyebrow>
          <div className="v2-h2">Hey, Marcus.</div>
        </Stack>

        <Pill tone="live" dot>
          Hillcrest Mews · clocked in
        </Pill>

        <StatusBlock>
          <Eyebrow>On the clock since 7:02 AM</Eyebrow>
          <div style={{ marginTop: 8 }}>
            <BigNum>4:24</BigNum>
          </div>
          <div className="v2-quiet" style={{ marginTop: 6, fontSize: 13 }}>
            EPS · East elevation · scoped by Ana
          </div>
        </StatusBlock>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Button>Break</Button>
          <Button variant="danger">Clock out</Button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {(["camera", "log", "field", "scope"] as const).map((name, i) => (
            <Tile key={name}>
              <Icon name={name} />
              <Mono>{["Photo", "Note", "Issue", "Scope"][i]}</Mono>
            </Tile>
          ))}
        </div>
      </Stack>
    </Pad>
  );
}

import { Pad, Stack, Eyebrow, H2 } from "@/components/ui";

/** Body for tabs that aren't built yet — keeps navigation whole. */
export function Placeholder({ label }: { label: string }) {
  return (
    <Pad>
      <Stack>
        <Eyebrow>{label}</Eyebrow>
        <H2>Coming soon.</H2>
        <div className="v2-quiet v2-body">
          This screen is scaffolded but not built yet. The navigation and shell are live.
        </div>
      </Stack>
    </Pad>
  );
}

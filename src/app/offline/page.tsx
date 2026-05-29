import { AuthShell, Logo } from "@/components/auth-shell";
import { Pad, Stack, Eyebrow, H1, Mono } from "@/components/ui";

// Served by the service worker when a navigation fails with no cached copy.
export default function OfflinePage() {
  return (
    <AuthShell>
      <Pad>
        <Stack gap="loose">
          <Stack gap="tight">
            <Logo />
            <H1 style={{ marginTop: 8 }}>You&apos;re offline.</H1>
            <Eyebrow>No connection</Eyebrow>
          </Stack>
          <div className="v2-body" style={{ fontSize: 15, lineHeight: 1.5 }}>
            Stringline needs a connection for this screen. Your last-loaded pages
            still work — clock entries and logs you made offline will sync when
            you&apos;re back.
          </div>
          <Mono>Reconnect and pull to refresh.</Mono>
        </Stack>
      </Pad>
    </AuthShell>
  );
}

import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, Field, Button, Card, Mono, Fill } from "@/components/ui";
import { Logo } from "@/components/auth-shell";
import { verifyOtp } from "@/server/auth-actions";

export function CodeEntry({ phone, dev, error }: { phone: string; dev?: string; error?: string }) {
  return (
    <Pad>
      <Stack gap="loose">
        <Stack gap="tight">
          <Logo />
          <H1 style={{ marginTop: 8 }}>Enter your code.</H1>
          <Eyebrow>Sent to {phone || "your phone"}</Eyebrow>
        </Stack>

        {dev && (
          <Card>
            <Mono>Dev mode · no SMS provider</Mono>
            <div className="v2-body" style={{ fontSize: 14, marginTop: 6 }}>
              Your code is <strong style={{ fontFamily: "var(--v2-font-mono)" }}>{dev}</strong>
            </div>
          </Card>
        )}
        {error === "badcode" && (
          <div className="v2-body" style={{ color: "var(--v2-bad)", fontSize: 14 }}>
            That code didn&apos;t match or expired.
          </div>
        )}

        <form action={verifyOtp}>
          <Stack>
            <input type="hidden" name="phone" value={phone} />
            <Field label="6-digit code" name="code" inputMode="numeric" placeholder="123456" required />
            <Button variant="primary" type="submit">Verify + sign in</Button>
          </Stack>
        </form>

        <Fill />
        <Link href="/signin/phone" className="v2-btn ghost">
          Use a different number
        </Link>
      </Stack>
    </Pad>
  );
}

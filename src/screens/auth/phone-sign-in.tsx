import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, Field, Button, Fill } from "@/components/ui";
import { Logo } from "@/components/auth-shell";
import { requestOtp } from "@/server/auth-actions";

export function PhoneSignIn({ error }: { error?: string }) {
  return (
    <Pad>
      <Stack gap="loose">
        <Stack gap="tight">
          <Logo />
          <H1 style={{ marginTop: 8 }}>Crew sign-in.</H1>
          <Eyebrow>We&apos;ll text you a code.</Eyebrow>
        </Stack>

        {error === "unknown" && (
          <div className="v2-body" style={{ color: "var(--v2-bad)", fontSize: 14 }}>
            No crew member found for that number.
          </div>
        )}

        <form action={requestOtp}>
          <Stack>
            <Field label="Mobile number" name="phone" type="tel" placeholder="+1 403 555 0142" autoComplete="tel" required />
            <Button variant="primary" type="submit">Send me a code</Button>
          </Stack>
        </form>

        <Fill />
        <Link href="/signin" className="v2-btn ghost">
          Office? Use email instead
        </Link>
      </Stack>
    </Pad>
  );
}

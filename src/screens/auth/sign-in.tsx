import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, Field, Fill, Button } from "@/components/ui";
import { Logo } from "@/components/auth-shell";
import { signInPassword, devSignIn } from "@/server/auth-actions";

export function SignIn({ error }: { error?: string }) {
  return (
    <Pad>
      <Stack gap="loose">
        <Stack gap="tight">
          <Logo />
          <H1 style={{ marginTop: 8 }}>Stringline</H1>
          <Eyebrow>Run the day.</Eyebrow>
        </Stack>

        {error && (
          <div className="v2-body" style={{ color: "var(--v2-bad)", fontSize: 14 }}>
            That email and password didn&apos;t match. Try again.
          </div>
        )}

        <form action={signInPassword}>
          <Stack>
            <Field label="Email" name="email" type="email" placeholder="you@company.co" autoComplete="email" required />
            <Field label="Password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" required />
            <Button variant="primary" type="submit">Sign in</Button>
          </Stack>
        </form>

        <Link href="/signin/magic" className="v2-btn ghost">
          Send a magic link instead
        </Link>
        <Link href="/signin/phone" className="v2-btn ghost">
          Crew? Sign in with your phone
        </Link>

        <Stack gap="tight">
          <Eyebrow>Or</Eyebrow>
          <form action={devSignIn.bind(null, "owner")}>
            <Button type="submit" style={{ width: "100%" }}>Continue with Apple</Button>
          </form>
          <form action={devSignIn.bind(null, "owner")}>
            <Button type="submit" style={{ width: "100%" }}>Continue with Google</Button>
          </form>
        </Stack>

        <Fill />
        <div className="v2-quiet v2-body" style={{ fontSize: 14 }}>
          New to Stringline?{" "}
          <Link href="/onboarding" style={{ color: "var(--v2-ink)", fontWeight: 700 }}>
            Create a workspace
          </Link>
        </div>
      </Stack>
    </Pad>
  );
}

import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, Field, Fill } from "@/components/ui";
import { Logo } from "@/components/auth-shell";

export function SignIn() {
  return (
    <Pad>
      <Stack gap="loose">
        <Stack gap="tight">
          <Logo />
          <H1 style={{ marginTop: 8 }}>Stringline</H1>
          <Eyebrow>Run the day.</Eyebrow>
        </Stack>

        <Stack>
          <Field label="Email" type="email" placeholder="you@company.co" defaultValue="" />
          <Field label="Password" type="password" placeholder="••••••••" defaultValue="" />
          <Link href="/owner" className="v2-btn primary">
            Sign in
          </Link>
          <Link href="/signin/magic" className="v2-btn ghost">
            Send a magic link instead
          </Link>
        </Stack>

        <Stack gap="tight">
          <Eyebrow>Or</Eyebrow>
          <Link href="/owner" className="v2-btn">
            Continue with Apple
          </Link>
          <Link href="/owner" className="v2-btn">
            Continue with Google
          </Link>
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

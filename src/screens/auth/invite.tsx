import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, Card, Mono, Fill } from "@/components/ui";
import { Logo } from "@/components/auth-shell";
import type { Role } from "@/lib/personas";

type InviteCopy = {
  inviter: string;
  blurb: string;
  bullets: string[];
  cta: string;
  dark?: boolean;
};

const COPY: Record<Exclude<Role, "owner">, InviteCopy> = {
  worker: {
    inviter: "Ana added you to the crew",
    blurb: "Davis Stucco",
    bullets: ["Auto clock-in on arrival", "Tap to flag a problem", "Daily photos — nothing else to learn"],
    cta: "Send me a code",
    dark: true,
  },
  foreman: {
    inviter: "Sarah invited you to run the crew",
    blurb: "Davis Stucco · 3 sites · 8 crew",
    bullets: ["Brief the crew each morning", "Approve time + resolve blockers", "Submit the daily log"],
    cta: "Accept · set password",
  },
  estimator: {
    inviter: "Sarah invited you to the bid desk",
    blurb: "Davis Stucco",
    bullets: ["Ingest plan sets", "Run takeoffs (AI assisted)", "Deliver bid PDFs"],
    cta: "Accept · set password",
  },
};

export function Invite({ role }: { role: Exclude<Role, "owner"> }) {
  const c = COPY[role];
  return (
    <Pad>
      <Stack gap="loose">
        <Stack gap="tight">
          <Logo />
          <Eyebrow accent>{c.inviter}</Eyebrow>
          <H1 style={{ marginTop: 4 }}>Join {c.blurb} on your phone.</H1>
        </Stack>

        <Card accent={!c.dark}>
          <Stack gap="tight">
            {c.bullets.map((b) => (
              <Mono key={b}>· {b}</Mono>
            ))}
          </Stack>
        </Card>

        <Fill />
        <Stack>
          <Link href={`/${role}`} className="v2-btn primary">
            {c.cta}
          </Link>
          <div className="v2-quiet v2-body" style={{ fontSize: 12, textAlign: "center" }}>
            By continuing you accept the Terms + Privacy.
          </div>
        </Stack>
      </Stack>
    </Pad>
  );
}

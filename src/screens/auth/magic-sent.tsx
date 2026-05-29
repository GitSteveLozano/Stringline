import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, Card, Mono, Button } from "@/components/ui";
import { Icon } from "@/components/icon";
import { devSignIn } from "@/server/auth-actions";

export function MagicSent() {
  return (
    <Pad>
      <Stack gap="loose">
        <Stack gap="tight">
          <Icon name="check" size={40} />
          <H1>Check your email.</H1>
          <Eyebrow>Magic link sent</Eyebrow>
        </Stack>

        <Card>
          <Mono>m•••@hillcresthomes.co</Mono>
          <div className="v2-body" style={{ fontSize: 14, marginTop: 8 }}>
            Open the link on this device to sign in here. Valid for 15 minutes.
          </div>
        </Card>

        <Stack>
          {/* No email provider in dev — this button stands in for the link. */}
          <form action={devSignIn.bind(null, "owner")}>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>Open the link (dev)</Button>
          </form>
          <Link href="/signin" className="v2-btn ghost">
            Use a password instead
          </Link>
        </Stack>
      </Stack>
    </Pad>
  );
}

import { AuthShell } from "@/components/auth-shell";
import { MagicSent } from "@/screens/auth/magic-sent";

export default function MagicPage() {
  return (
    <AuthShell>
      <MagicSent />
    </AuthShell>
  );
}

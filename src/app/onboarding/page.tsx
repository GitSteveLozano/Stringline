import { AuthShell } from "@/components/auth-shell";
import { Onboarding } from "@/components/onboarding";

export default function OnboardingPage() {
  return (
    <AuthShell>
      <Onboarding />
    </AuthShell>
  );
}

import { AuthShell } from "@/components/auth-shell";
import { SignIn } from "@/screens/auth/sign-in";

export default function SignInPage() {
  return (
    <AuthShell>
      <SignIn />
    </AuthShell>
  );
}

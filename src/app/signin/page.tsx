import { AuthShell } from "@/components/auth-shell";
import { SignIn } from "@/screens/auth/sign-in";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <AuthShell>
      <SignIn error={error} />
    </AuthShell>
  );
}

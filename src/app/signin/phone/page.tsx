import { AuthShell } from "@/components/auth-shell";
import { PhoneSignIn } from "@/screens/auth/phone-sign-in";

export default async function PhoneSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <AuthShell dark>
      <PhoneSignIn error={error} />
    </AuthShell>
  );
}

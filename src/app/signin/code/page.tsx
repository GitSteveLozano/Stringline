import { AuthShell } from "@/components/auth-shell";
import { CodeEntry } from "@/screens/auth/code-entry";

export default async function CodePage({
  searchParams,
}: {
  searchParams: Promise<{ phone?: string; dev?: string; error?: string }>;
}) {
  const { phone, dev, error } = await searchParams;
  return (
    <AuthShell dark>
      <CodeEntry phone={phone ?? ""} dev={dev} error={error} />
    </AuthShell>
  );
}

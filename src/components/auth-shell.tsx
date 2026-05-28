import { Screen } from "@/components/ui";

/** Full-screen auth/onboarding shell: phone frame + screen, no app bar or tabs. */
export function AuthShell({ dark, children }: { dark?: boolean; children: React.ReactNode }) {
  return (
    <div className="v2-frame">
      <Screen dark={dark}>{children}</Screen>
    </div>
  );
}

/** The SL monogram tile. */
export function Logo({ size = 48 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: "var(--v2-accent)",
        border: "2px solid var(--v2-ink)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--v2-font-tight)",
        fontWeight: 900,
        fontSize: size * 0.42,
        color: "var(--v2-accent-ink)",
        letterSpacing: "-0.04em",
      }}
    >
      SL
    </div>
  );
}

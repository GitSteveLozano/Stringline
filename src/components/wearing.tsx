"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pill, Eyebrow } from "@/components/ui";
import { ROLES, roleMeta, type Role } from "@/lib/personas";

/** The "Wearing {role}" pill + the role-switcher sheet. One operator, many hats. */
export function WearingControl({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const meta = roleMeta(role);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Switch role"
        style={{ background: "none", border: 0, padding: 0, cursor: "pointer" }}
      >
        <Pill>Wearing · {meta.label}</Pill>
      </button>
      {open && (
        <RoleSwitcher
          current={role}
          onClose={() => setOpen(false)}
          onPick={(r) => {
            setOpen(false);
            if (r !== role) router.push(`/${r}`);
          }}
        />
      )}
    </>
  );
}

function RoleSwitcher({
  current,
  onClose,
  onPick,
}: {
  current: Role;
  onClose: () => void;
  onPick: (role: Role) => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Switch role"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(15,14,12,0.5)" }}
      />
      <div style={{ position: "relative", background: "var(--v2-sand)", borderTop: "2px solid var(--v2-ink)" }}>
        <div className="v2-section-bar">
          <Eyebrow>You wear {ROLES.length} hats</Eyebrow>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{ background: "none", border: 0, fontFamily: "var(--v2-font-mono)", fontSize: 14, cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
        {ROLES.map((r) => {
          const active = r.role === current;
          return (
            <button
              key={r.role}
              type="button"
              onClick={() => onPick(r.role)}
              className="v2-row"
              style={{
                width: "100%",
                textAlign: "left",
                background: active ? "var(--v2-accent)" : "transparent",
                color: active ? "var(--v2-accent-ink)" : "var(--v2-ink)",
                borderLeft: 0,
                borderRight: 0,
                borderTop: 0,
                cursor: "pointer",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="v2-h3">{r.label}</div>
                <div style={{ fontSize: 13, opacity: 0.75 }}>{r.blurb}</div>
              </div>
              {active && <span className="v2-mono">CURRENT</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

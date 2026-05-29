/**
 * Stringline V2 primitive component library.
 * Typed React wrappers over the `.v2-*` design-system classes in globals.css.
 * Ported from designs/v2 — keep visual parity with designs/v2/styles.css.
 */
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/* ── DataTable: desktop dense grid-table; whole row links via <a> ── */
export type TableColumn = { label: string; num?: boolean; width?: string };
export type TableRow = { id: string; href?: string; cells: React.ReactNode[] };

export function DataTable({ columns, rows }: { columns: TableColumn[]; rows: TableRow[] }) {
  const template = columns.map((c) => c.width ?? "1fr").join(" ");
  return (
    <div className="v2-gtable">
      <div className="v2-gtable-head" style={{ gridTemplateColumns: template }}>
        {columns.map((c, i) => (
          <div key={i} className={cn("v2-gth", c.num && "num")}>{c.label}</div>
        ))}
      </div>
      {rows.map((r) => {
        const cells = columns.map((c, i) => (
          <div key={i} className={cn("v2-gtd", c.num && "num")}>{r.cells[i]}</div>
        ));
        return r.href ? (
          <Link key={r.id} href={r.href} className="v2-gtable-row link" style={{ gridTemplateColumns: template }}>
            {cells}
          </Link>
        ) : (
          <div key={r.id} className="v2-gtable-row" style={{ gridTemplateColumns: template }}>
            {cells}
          </div>
        );
      })}
    </div>
  );
}

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/* ── Screen: the phone shell. Wrap every screen in this. ── */
export function Screen({
  dark,
  className,
  children,
  ...rest
}: DivProps & { dark?: boolean }) {
  return (
    <div className={cn("v2", "v2-screen", dark && "dark", className)} {...rest}>
      {children}
    </div>
  );
}

/* ── AppBar ── */
export function AppBar({
  title,
  leading,
  trailing,
  className,
  ...rest
}: Omit<DivProps, "title"> & {
  title?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <div className={cn("v2-appbar", className)} {...rest}>
      {leading}
      <div className="v2-appbar-title">{title}</div>
      {trailing}
    </div>
  );
}

/* ── IconButton ── */
export function IconButton({
  accent,
  className,
  children,
  ...rest
}: ButtonProps & { accent?: boolean }) {
  return (
    <button type="button" className={cn("v2-iconbtn", accent && "accent", className)} {...rest}>
      {children}
    </button>
  );
}

/* ── Eyebrow (mono uppercase label) ── */
export function Eyebrow({
  accent,
  className,
  children,
  ...rest
}: DivProps & { accent?: boolean }) {
  return (
    <div className={cn("v2-eyebrow", accent && "accent", className)} {...rest}>
      {children}
    </div>
  );
}

/* ── Typography ── */
export function H1({ className, ...rest }: DivProps) {
  return <div className={cn("v2-h1", className)} {...rest} />;
}
export function H2({ className, ...rest }: DivProps) {
  return <div className={cn("v2-h2", className)} {...rest} />;
}
export function H3({ className, ...rest }: DivProps) {
  return <div className={cn("v2-h3", className)} {...rest} />;
}
export function Mono({ className, ...rest }: DivProps) {
  return <span className={cn("v2-mono", className)} {...(rest as React.HTMLAttributes<HTMLSpanElement>)} />;
}

/* ── BigNum (hero number with optional unit) ── */
export function BigNum({
  unit,
  className,
  children,
  ...rest
}: DivProps & { unit?: React.ReactNode }) {
  return (
    <div className={cn("v2-bignum", className)} {...rest}>
      {children}
      {unit != null && <span className="unit">{unit}</span>}
    </div>
  );
}

/* ── Rule ── */
export function Rule({ soft, className }: { soft?: boolean; className?: string }) {
  return <div className={cn(soft ? "v2-rule-soft" : "v2-rule", className)} />;
}

/* ── Button ── */
export function Button({
  variant,
  className,
  children,
  ...rest
}: ButtonProps & { variant?: "primary" | "ghost" | "danger" }) {
  return (
    <button type="button" className={cn("v2-btn", variant, className)} {...rest}>
      {children}
    </button>
  );
}

/* ── Card ── */
export function Card({
  accent,
  className,
  children,
  ...rest
}: DivProps & { accent?: boolean }) {
  return (
    <div className={cn("v2-card", accent && "accent", className)} {...rest}>
      {children}
    </div>
  );
}

/* ── StatTile: labelled metric card (Eyebrow + big value) ── */
export function StatTile({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card>
      <Eyebrow>{label}</Eyebrow>
      <div className="v2-h2" style={{ marginTop: 8 }}>{children}</div>
    </Card>
  );
}

/* ── Meter: thin progress bar, value 0..1, red when danger ── */
export function Meter({ value, danger }: { value: number; danger?: boolean }) {
  const pct = Math.min(100, Math.max(0, value * 100));
  return (
    <div style={{ height: 8, background: "var(--v2-sand-2)", border: "1px solid var(--v2-ink)", marginTop: 6 }}>
      <div style={{ width: `${pct}%`, height: "100%", background: danger ? "var(--v2-bad)" : "var(--v2-accent)" }} />
    </div>
  );
}

/* ── Row (list item, optional lead slot) ── */
export function Row({
  lead,
  className,
  children,
  ...rest
}: DivProps & { lead?: React.ReactNode }) {
  return (
    <div className={cn("v2-row", className)} {...rest}>
      {lead != null && <div className="lead">{lead}</div>}
      {children}
    </div>
  );
}

/* ── SectionBar ── */
export function SectionBar({ className, children, ...rest }: DivProps) {
  return (
    <div className={cn("v2-section-bar", className)} {...rest}>
      {children}
    </div>
  );
}

/* ── Pill ── */
export function Pill({
  tone,
  dot,
  className,
  children,
  ...rest
}: Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> & {
  tone?: "live" | "good" | "bad";
  dot?: boolean;
}) {
  return (
    <span className={cn("v2-pill", tone, className)} {...rest}>
      {dot && <span className="dot" />}
      {children}
    </span>
  );
}

/* ── StatusBlock ── */
export function StatusBlock({ className, children, ...rest }: DivProps) {
  return (
    <div className={cn("v2-status-block", className)} {...rest}>
      {children}
    </div>
  );
}

/* ── Tile ── */
export function Tile({
  variant,
  className,
  children,
  ...rest
}: ButtonProps & { variant?: "accent" | "dark" | "danger" }) {
  return (
    <button type="button" className={cn("v2-tile", variant, className)} {...rest}>
      {children}
    </button>
  );
}

/* ── BottomBar ── */
export type TabItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

export function BottomBar({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: TabItem[];
  active: string;
  onChange?: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("v2-bottombar", className)}>
      {tabs.map((t) => (
        <button
          key={t.id}
          className={cn("v2-bottombar-tab", active === t.id && "active")}
          onClick={() => onChange?.(t.id)}
          aria-current={active === t.id ? "page" : undefined}
        >
          {t.icon}
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ── Layout helpers ── */
export function Pad({ className, ...rest }: DivProps) {
  return <div className={cn("v2-pad", className)} {...rest} />;
}
export function Stack({
  gap = "regular",
  className,
  ...rest
}: DivProps & { gap?: "tight" | "regular" | "loose" }) {
  const g = gap === "tight" ? "v2-stack-tight" : gap === "loose" ? "v2-stack-loose" : "v2-stack";
  return <div className={cn(g, className)} {...rest} />;
}
export function Spread({ className, ...rest }: DivProps) {
  return <div className={cn("v2-row-spread", className)} {...rest} />;
}
export function Fill({ className, ...rest }: DivProps) {
  return <div className={cn("v2-flex-1", className)} {...rest} />;
}
export function Scroll({ className, ...rest }: DivProps) {
  return <div className={cn("v2-flex-1", className)} style={{ overflowY: "auto" }} {...rest} />;
}

/* ── Field (text input) ── */
export function Field({
  label,
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label style={{ display: "block" }}>
      {label && (
        <div className="v2-eyebrow" style={{ marginBottom: 6 }}>
          {label}
        </div>
      )}
      <input className={cn("v2-field", className)} {...rest} />
    </label>
  );
}

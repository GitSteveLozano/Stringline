/**
 * Stringline V2 primitive component library.
 * Typed React wrappers over the `.v2-*` design-system classes in globals.css.
 * Ported from designs/v2 — keep visual parity with designs/v2/styles.css.
 */
import * as React from "react";
import { cn } from "@/lib/cn";

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
    <button className={cn("v2-iconbtn", accent && "accent", className)} {...rest}>
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
    <button className={cn("v2-btn", variant, className)} {...rest}>
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
    <button className={cn("v2-tile", variant, className)} {...rest}>
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

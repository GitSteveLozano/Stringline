import type { IconName } from "@/components/icon";

export type Role = "owner" | "estimator" | "foreman" | "worker";

export type Tab = {
  id: string;
  label: string;
  icon: IconName;
  href: string;
};

/** Bottom-nav tabs per persona. First tab is the role's home. */
export const TABS: Record<Role, Tab[]> = {
  owner: [
    { id: "home", label: "Home", icon: "home", href: "/owner" },
    { id: "projects", label: "Projects", icon: "projects", href: "/owner/projects" },
    { id: "money", label: "Money", icon: "money", href: "/owner/money" },
    { id: "team", label: "Team", icon: "team", href: "/owner/team" },
    { id: "more", label: "More", icon: "more", href: "/owner/more" },
  ],
  estimator: [
    { id: "projects", label: "Projects", icon: "projects", href: "/estimator" },
    { id: "queue", label: "Queue", icon: "queue", href: "/estimator/queue" },
    { id: "clients", label: "Clients", icon: "clients", href: "/estimator/clients" },
    { id: "library", label: "Library", icon: "library", href: "/estimator/library" },
    { id: "more", label: "More", icon: "more", href: "/estimator/more" },
  ],
  foreman: [
    { id: "today", label: "Today", icon: "today", href: "/foreman" },
    { id: "crew", label: "Crew", icon: "crew", href: "/foreman/crew" },
    { id: "field", label: "Field", icon: "field", href: "/foreman/field" },
    { id: "log", label: "Log", icon: "log", href: "/foreman/log" },
    { id: "time", label: "Time", icon: "time", href: "/foreman/time" },
  ],
  worker: [
    { id: "today", label: "Today", icon: "today", href: "/worker" },
    { id: "scope", label: "Scope", icon: "scope", href: "/worker/scope" },
    { id: "hours", label: "Hours", icon: "hours", href: "/worker/hours" },
    { id: "log", label: "Log", icon: "log", href: "/worker/log" },
  ],
};

export type RoleMeta = {
  role: Role;
  label: string;
  blurb: string;
  dark: boolean;
};

/** Role metadata for the "Wearing" switcher sheet. Worker runs the dark theme. */
export const ROLES: RoleMeta[] = [
  { role: "owner", label: "Owner", blurb: "Business · Money · Approvals", dark: false },
  { role: "estimator", label: "Estimator", blurb: "Takeoff · Bids · Clients", dark: false },
  { role: "foreman", label: "Foreman", blurb: "Crew · Briefs · Daily log", dark: false },
  { role: "worker", label: "Crew", blurb: "Clock · Scope · Log", dark: true },
];

export function roleMeta(role: Role): RoleMeta {
  return ROLES.find((r) => r.role === role) ?? ROLES[0];
}

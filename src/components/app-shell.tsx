"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconButton } from "@/components/ui";
import { Icon } from "@/components/icon";
import { WearingControl } from "@/components/wearing";
import { signOut } from "@/server/auth-actions";
import { TABS, roleMeta, type Role } from "@/lib/personas";
import { cn } from "@/lib/cn";

/**
 * Responsive app chrome. Above 900px it's a desktop sidebar + topbar; below,
 * the mobile appbar + bottom tab bar. Both layouts share the same nav links and
 * wrap the same screen content — CSS in globals.css toggles them by breakpoint.
 */
export function AppShell({
  role,
  title,
  roles,
  children,
}: {
  role: Role;
  title: string;
  roles?: Role[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const tabs = TABS[role];
  const meta = roleMeta(role);
  const homeHref = tabs[0].href;

  const isActive = (href: string) =>
    href === homeHref ? pathname === homeHref : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className={cn("v2", "v2-screen", "v2-app", meta.dark && "dark")}>
      {/* Desktop sidebar */}
      <aside className="v2-sidebar">
        <div className="v2-sidebar-brand">Stringline</div>
        <nav className="v2-sidebar-nav" aria-label={`${meta.label} navigation`}>
          {tabs.map((t) => (
            <Link
              key={t.id}
              href={t.href}
              className={cn("v2-sidebar-tab", isActive(t.href) && "active")}
              aria-current={isActive(t.href) ? "page" : undefined}
            >
              <Icon name={t.icon} />
              <span>{t.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="v2-shell-main">
        {/* Topbar (desktop) / appbar (mobile) */}
        <header className="v2-topbar">
          <div className="v2-appbar-title" style={{ flex: 1 }}>{title}</div>
          <WearingControl role={role} roles={roles} />
          <form action={signOut}>
            <IconButton aria-label="Sign out" type="submit">⏻</IconButton>
          </form>
        </header>

        <div className="v2-main-scroll">
          <div className="v2-main-inner">{children}</div>
        </div>

        {/* Mobile bottom tab bar */}
        <nav className="v2-bottombar" aria-label={`${meta.label} navigation`}>
          {tabs.map((t) => (
            <Link
              key={t.id}
              href={t.href}
              className={cn("v2-bottombar-tab", isActive(t.href) && "active")}
              aria-current={isActive(t.href) ? "page" : undefined}
            >
              <Icon name={t.icon} />
              <span>{t.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Screen, AppBar, IconButton } from "@/components/ui";
import { Icon } from "@/components/icon";
import { WearingControl } from "@/components/wearing";
import { TABS, roleMeta, type Role } from "@/lib/personas";
import { cn } from "@/lib/cn";

/** Phone frame + app bar (with the Wearing pill) + the role's bottom tab bar. */
export function AppShell({
  role,
  title,
  children,
}: {
  role: Role;
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const tabs = TABS[role];
  const meta = roleMeta(role);
  const homeHref = tabs[0].href;

  const isActive = (href: string) =>
    href === homeHref ? pathname === homeHref : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="v2-frame">
      <Screen dark={meta.dark}>
        <AppBar
          title={title}
          trailing={
            <>
              <WearingControl role={role} />
              <IconButton aria-label="Menu">≡</IconButton>
            </>
          }
        />

        <div className="v2-flex-1" style={{ overflowY: "auto" }}>
          {children}
        </div>

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
      </Screen>
    </div>
  );
}

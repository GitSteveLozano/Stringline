import Link from "next/link";
import { Screen, AppBar } from "@/components/ui";
import { Icon } from "@/components/icon";

/** Drill-in screen: phone frame + app bar with a back link, no bottom tabs.
 *  Server component (Link-based back) so the body renders server-side. */
export function DetailShell({
  title,
  backHref = "/owner",
  dark,
  children,
}: {
  title: string;
  backHref?: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="v2-frame">
      <Screen dark={dark}>
        <AppBar
          title={title}
          leading={
            <Link href={backHref} className="v2-iconbtn" aria-label="Back">
              <Icon name="back" size={20} />
            </Link>
          }
        />
        <div className="v2-flex-1" style={{ overflowY: "auto" }}>
          {children}
        </div>
      </Screen>
    </div>
  );
}

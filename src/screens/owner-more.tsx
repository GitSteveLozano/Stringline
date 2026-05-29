import Link from "next/link";
import { SectionBar, Eyebrow, Row } from "@/components/ui";
import { Icon, type IconName } from "@/components/icon";
import { getWorkspaceInfo } from "@/server/workspace";

const GROUPS: { heading: string; items: { label: string; icon: IconName; href?: string }[] }[] = [
  {
    heading: "Workflow",
    items: [
      { label: "Rentals", icon: "queue", href: "/dispatch" },
      { label: "Measurements", icon: "scope" },
      { label: "Estimates", icon: "projects" },
      { label: "Clients", icon: "clients" },
    ],
  },
  {
    heading: "Workspace",
    items: [
      { label: "Settings", icon: "more" },
      { label: "Pricing book", icon: "money" },
      { label: "Integrations", icon: "queue" },
    ],
  },
  {
    heading: "You",
    items: [
      { label: "Profile", icon: "clients" },
      { label: "Help + support", icon: "bell" },
    ],
  },
];

export async function OwnerMore() {
  const workspace = await getWorkspaceInfo();
  return (
    <>
      <div className="v2-pad">
        <Eyebrow>Workspace</Eyebrow>
        <div className="v2-h2" style={{ marginTop: 6 }}>{workspace.name}</div>
        <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>
          {workspace.owner} · Owner
        </div>
      </div>

      <div className="v2-cols">
        {GROUPS.map((g) => (
          <div key={g.heading}>
            <SectionBar>
              <Eyebrow>{g.heading}</Eyebrow>
            </SectionBar>
            <div>
              {g.items.map((it) => {
                const row = (
                  <Row lead={<Icon name={it.icon} size={20} />}>
                    <div style={{ flex: 1, minWidth: 0 }} className="v2-h3">
                      {it.label}
                    </div>
                    <Icon name="chevron" size={16} />
                  </Row>
                );
                return it.href ? (
                  <Link key={it.label} href={it.href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                    {row}
                  </Link>
                ) : (
                  <div key={it.label}>{row}</div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="v2-pad">
        <div className="v2-quiet" style={{ fontFamily: "var(--v2-font-mono)", fontSize: 11 }}>
          Stringline · v2 · build dev
        </div>
      </div>
    </>
  );
}

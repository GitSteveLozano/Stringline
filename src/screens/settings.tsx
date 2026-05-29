import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Pill, Button, StatTile } from "@/components/ui";
import { getWorkspaceSettings } from "@/server/workspace";
import { signOut } from "@/server/auth-actions";

export async function Settings() {
  const s = await getWorkspaceSettings();
  if (!s) {
    return <Pad><div className="v2-quiet v2-body">Not signed in.</div></Pad>;
  }

  const details = [
    { label: "Trade", value: s.trade.charAt(0) + s.trade.slice(1).toLowerCase() },
    { label: "Subdomain", value: `${s.subdomain}.stringline.app` },
    { label: "Timezone", value: s.timezone },
    { label: "Since", value: s.foundedOn },
  ];

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Workspace</Eyebrow>
          <H1>{s.name}</H1>
          <div className="v2-quiet v2-body">{s.owner} · Owner</div>
        </Stack>
      </Pad>

      <Pad>
        <div className="v2-stat-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
          <StatTile label="Team">{s.counts.members}</StatTile>
          <StatTile label="Projects">{s.counts.projects}</StatTile>
          <StatTile label="Clients">{s.counts.clients}</StatTile>
        </div>
      </Pad>

      <div className="v2-cols">
        <section>
          <SectionBar><Eyebrow>Integrations</Eyebrow></SectionBar>
          <div>
            {s.integrations.map((i) => (
              <Row key={i.label}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="v2-h3">{i.label}</div>
                  <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{i.note}</div>
                </div>
                {i.connected ? <Pill tone="good">Connected</Pill> : <Pill>Connect</Pill>}
              </Row>
            ))}
          </div>
        </section>

        <section>
          <SectionBar><Eyebrow>Workspace details</Eyebrow></SectionBar>
          <div>
            {details.map((d) => (
              <Row key={d.label}>
                <div style={{ flex: 1, minWidth: 0 }} className="v2-body">{d.label}</div>
                <Mono>{d.value}</Mono>
              </Row>
            ))}
          </div>
        </section>
      </div>

      <SectionBar><Eyebrow>Your account</Eyebrow></SectionBar>
      <Pad>
        <Stack>
          <Row>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="v2-h3">{s.me.name}</div>
              <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{s.me.roles.join(" · ")}</div>
            </div>
          </Row>
          <form action={signOut}>
            <Button variant="danger" type="submit" style={{ width: "100%" }}>Sign out</Button>
          </form>
        </Stack>
      </Pad>
    </>
  );
}

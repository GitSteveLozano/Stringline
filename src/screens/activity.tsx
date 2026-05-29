import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row } from "@/components/ui";
import { Icon } from "@/components/icon";
import { getActivity, type ActivityItem } from "@/server/activity";

function ActivityRow({ a }: { a: ActivityItem }) {
  const body = (
    <>
      <Row lead={<Icon name={a.icon} size={20} />}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="v2-h3">{a.title}</div>
          <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{a.kind} · {a.sub}</div>
        </div>
        <Mono>{a.ago}</Mono>
      </Row>
    </>
  );
  return a.projectId ? (
    <Link href={`/project/${a.projectId}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      {body}
    </Link>
  ) : (
    <div>{body}</div>
  );
}

export async function Activity() {
  const { total, items } = await getActivity();

  return (
    <>
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Activity</Eyebrow>
          <H1>{total === 0 ? "Nothing yet." : "What's happening."}</H1>
          <div className="v2-quiet v2-body">Payments, approvals, and field logs across every job.</div>
        </Stack>
      </Pad>

      <SectionBar>
        <Eyebrow>Recent</Eyebrow>
        <Mono>{items.length}</Mono>
      </SectionBar>
      <div>
        {items.length === 0 ? (
          <Pad><div className="v2-quiet v2-body">No activity yet.</div></Pad>
        ) : (
          items.map((a) => <ActivityRow key={a.id} a={a} />)
        )}
      </div>
    </>
  );
}

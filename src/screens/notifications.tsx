import Link from "next/link";
import { Pad, Stack, Eyebrow, H1, SectionBar, Mono, Row, Button } from "@/components/ui";
import { getNotifications, type NotificationItem } from "@/server/notifications";
import { markNotificationRead, markAllNotificationsRead } from "@/server/actions";

function NotificationRow({ n }: { n: NotificationItem }) {
  const body = (
    <div style={{ flex: 1, minWidth: 0 }}>
      <Eyebrow accent={!n.read}>
        {n.kind} · {n.ago}
      </Eyebrow>
      <div className="v2-h3" style={{ marginTop: 2 }}>{n.title}</div>
      {n.body && (
        <div className="v2-quiet" style={{ fontSize: 13, marginTop: 2 }}>{n.body}</div>
      )}
    </div>
  );

  return (
    <Row
      lead={
        <span
          aria-hidden
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: n.read ? "transparent" : "var(--v2-accent)",
            border: n.read ? "2px solid var(--v2-line-soft)" : "2px solid var(--v2-ink)",
            display: "inline-block",
          }}
        />
      }
    >
      {n.projectId ? (
        <Link href={`/project/${n.projectId}`} style={{ textDecoration: "none", color: "inherit", flex: 1, minWidth: 0 }}>
          {body}
        </Link>
      ) : (
        body
      )}
      {!n.read && (
        <form action={markNotificationRead.bind(null, n.id)}>
          <Button variant="ghost" type="submit" aria-label="Mark read">✓</Button>
        </form>
      )}
    </Row>
  );
}

export async function Notifications() {
  const items = await getNotifications();
  const unread = items.filter((n) => !n.read);
  const earlier = items.filter((n) => n.read);

  return (
    <>
      <Pad>
        <Stack>
          <Eyebrow>Inbox</Eyebrow>
          <H1>{unread.length ? `${unread.length} unread` : "You're all caught up."}</H1>
          {unread.length > 0 && (
            <form action={markAllNotificationsRead}>
              <Button variant="ghost" type="submit">Mark all read</Button>
            </form>
          )}
        </Stack>
      </Pad>

      {items.length === 0 ? (
        <Pad>
          <div className="v2-quiet v2-body">No notifications yet.</div>
        </Pad>
      ) : (
        <div className="v2-cols">
          <section>
            <SectionBar>
              <Eyebrow>New</Eyebrow>
              <Mono>{unread.length}</Mono>
            </SectionBar>
            {unread.length === 0 ? (
              <Pad><div className="v2-quiet v2-body">Nothing new.</div></Pad>
            ) : (
              unread.map((n) => <NotificationRow key={n.id} n={n} />)
            )}
          </section>

          <section>
            <SectionBar>
              <Eyebrow>Earlier</Eyebrow>
              <Mono>{earlier.length}</Mono>
            </SectionBar>
            {earlier.length === 0 ? (
              <Pad><div className="v2-quiet v2-body">Nothing earlier.</div></Pad>
            ) : (
              earlier.map((n) => <NotificationRow key={n.id} n={n} />)
            )}
          </section>
        </div>
      )}
    </>
  );
}

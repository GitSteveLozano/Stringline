import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";

export type PhotoItem = { id: string; tag: string; time: string; who: string; url: string | null };
export type PhotoDay = { day: string; items: PhotoItem[] };

const DAY_MS = 86_400_000;

/** All site photos for a project, grouped by day (newest first). Workspace-scoped. */
export async function getProjectPhotos(projectId: string): Promise<{
  project: string | null;
  total: number;
  sections: PhotoDay[];
}> {
  const workspaceId = await getActiveWorkspaceId();
  const project = await db.project.findFirst({ where: { id: projectId, workspaceId }, select: { name: true } });
  if (!project) return { project: null, total: 0, sections: [] };

  const photos = await db.photo.findMany({ where: { projectId }, orderBy: { takenAt: "desc" } });
  const userIds = [...new Set(photos.map((p) => p.userId))];
  const users = await db.user.findMany({ where: { id: { in: userIds } }, select: { id: true, name: true } });
  const nameById = new Map(users.map((u) => [u.id, u.name.split(" ")[0]]));

  const todayStr = new Date().toDateString();
  const yestStr = new Date(Date.now() - DAY_MS).toDateString();
  const groups = new Map<string, PhotoItem[]>();
  const order: string[] = [];
  for (const p of photos) {
    const ds = p.takenAt.toDateString();
    const label =
      ds === todayStr
        ? `Today · ${p.takenAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
        : ds === yestStr
          ? `Yesterday · ${p.takenAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
          : p.takenAt.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    if (!groups.has(label)) {
      groups.set(label, []);
      order.push(label);
    }
    groups.get(label)!.push({
      id: p.id,
      tag: p.tag,
      time: p.takenAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      who: nameById.get(p.userId) ?? "Crew",
      url: p.url,
    });
  }

  return { project: project.name, total: photos.length, sections: order.map((day) => ({ day, items: groups.get(day)! })) };
}

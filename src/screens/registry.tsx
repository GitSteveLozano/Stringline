import type { ComponentType } from "react";
import type { Role } from "@/lib/personas";
import { TABS } from "@/lib/personas";
import { Placeholder } from "@/components/placeholder";
import { OwnerHome } from "./owner-home";
import { OwnerProjects } from "./owner-projects";
import { OwnerMoney } from "./owner-money";
import { OwnerTeam } from "./owner-team";
import { OwnerMore } from "./owner-more";
import { EstimatorHome } from "./estimator-home";
import { ForemanHome } from "./foreman-home";
import { ForemanCrew } from "./foreman-crew";
import { ForemanField } from "./foreman-field";
import { ForemanLog } from "./foreman-log";
import { ForemanTime } from "./foreman-time";
import { WorkerHome } from "./worker-home";

type Entry = { title: string; Comp: ComponentType };

/** Keyed by `role` (home tab) or `role/tab`. Missing keys fall back to Placeholder. */
const REGISTRY: Record<string, Entry> = {
  owner: { title: "Stringline", Comp: OwnerHome },
  "owner/projects": { title: "Projects", Comp: OwnerProjects },
  "owner/money": { title: "Money", Comp: OwnerMoney },
  "owner/team": { title: "Team", Comp: OwnerTeam },
  "owner/more": { title: "More", Comp: OwnerMore },
  estimator: { title: "Takeoffs", Comp: EstimatorHome },
  foreman: { title: "Today", Comp: ForemanHome },
  "foreman/crew": { title: "Crew", Comp: ForemanCrew },
  "foreman/field": { title: "Field", Comp: ForemanField },
  "foreman/log": { title: "Daily log", Comp: ForemanLog },
  "foreman/time": { title: "Time", Comp: ForemanTime },
  worker: { title: "Today", Comp: WorkerHome },
};

export function resolveScreen(role: Role, tab: string | null): Entry {
  const key = tab ? `${role}/${tab}` : role;
  const hit = REGISTRY[key];
  if (hit) return hit;
  const tabDef = TABS[role].find((t) => t.id === tab);
  return { title: tabDef?.label ?? "Soon", Comp: () => <Placeholder label={tabDef?.label ?? "Soon"} /> };
}

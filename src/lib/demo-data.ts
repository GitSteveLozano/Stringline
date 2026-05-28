/**
 * In-memory demo data for building screens before a database is wired up.
 * Shapes mirror prisma/schema.prisma so swapping to Prisma loaders is mechanical.
 * Ported from the V2 / V1 design fixtures (exterior cladding contractor, AB).
 */

export type ProjectStatus =
  | "DRAFTING"
  | "SENT"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "DONE"
  | "PAID"
  | "ARCHIVED";

export type ProjectHealth = "ON_TRACK" | "OVER_BUDGET" | "AT_RISK" | "PENDING";

export type Project = {
  id: string;
  name: string;
  client: string;
  address: string;
  status: ProjectStatus;
  health: ProjectHealth;
  dayOf?: number;
  dayTotal?: number;
  crewSize: number;
  contractValue: number;
  spent: number;
  progress: number; // 0..1
};

export type Crew = {
  id: string;
  name: string;
  initials: string;
  role: "Lead" | "Crew" | "Foreman";
  clockedIn: boolean;
  hoursWeek: number;
  project: string;
};

export const workspace = {
  name: "Davis Stucco LLC",
  trade: "STUCCO",
  owner: "Sarah Davis",
};

export const projects: Project[] = [
  {
    id: "p-hillcrest",
    name: "Hillcrest Mews — Ph 4",
    client: "Hillcrest Homes",
    address: "4820 Crestline Dr, Calgary AB",
    status: "IN_PROGRESS",
    health: "ON_TRACK",
    dayOf: 18,
    dayTotal: 32,
    crewSize: 4,
    contractValue: 184250,
    spent: 108600,
    progress: 0.62,
  },
  {
    id: "p-aspen",
    name: "Aspen Ridge Townhomes",
    client: "Cardinal Group",
    address: "88 Aspen Ridge Bv, Canmore AB",
    status: "IN_PROGRESS",
    health: "OVER_BUDGET",
    dayOf: 12,
    dayTotal: 35,
    crewSize: 6,
    contractValue: 312800,
    spent: 121400,
    progress: 0.34,
  },
  {
    id: "p-greenwillow",
    name: "Greenwillow Senior Living",
    client: "Sage Care Properties",
    address: "1100 Greenwillow Cr, Edmonton AB",
    status: "DONE",
    health: "ON_TRACK",
    crewSize: 8,
    contractValue: 428900,
    spent: 392100,
    progress: 0.96,
  },
  {
    id: "p-riverbend",
    name: "Riverbend Retail Shell",
    client: "Northline Builders",
    address: "212 Riverbend Way, Calgary AB",
    status: "SENT",
    health: "PENDING",
    crewSize: 0,
    contractValue: 93200,
    spent: 0,
    progress: 0,
  },
  {
    id: "p-foothills",
    name: "Foothills Medical Annex",
    client: "AHS Capital",
    address: "1403 29 St NW, Calgary AB",
    status: "DRAFTING",
    health: "PENDING",
    crewSize: 0,
    contractValue: 156400,
    spent: 0,
    progress: 0,
  },
];

export const crew: Crew[] = [
  { id: "w1", name: "Ana Castillo", initials: "AC", role: "Lead", clockedIn: true, hoursWeek: 32.5, project: "p-hillcrest" },
  { id: "w2", name: "Marcus Lee", initials: "ML", role: "Crew", clockedIn: true, hoursWeek: 30.0, project: "p-hillcrest" },
  { id: "w3", name: "Diego Fontana", initials: "DF", role: "Crew", clockedIn: true, hoursWeek: 28.5, project: "p-aspen" },
  { id: "w4", name: "Priya Shah", initials: "PS", role: "Foreman", clockedIn: true, hoursWeek: 36.0, project: "p-aspen" },
  { id: "w5", name: "Tomás Reyes", initials: "TR", role: "Crew", clockedIn: false, hoursWeek: 24.0, project: "p-hillcrest" },
];

/** Aggregates the owner dashboard cares about. */
export function dashboardSummary() {
  const running = projects.filter((p) => p.status === "IN_PROGRESS");
  const crewOnClock = crew.filter((c) => c.clockedIn).length;
  const atRisk = projects.filter((p) => p.health === "OVER_BUDGET" || p.health === "AT_RISK");
  return {
    runningCount: running.length,
    crewOnClock,
    atRisk,
    onSite: running,
  };
}

export const healthLabel: Record<ProjectHealth, string> = {
  ON_TRACK: "On track",
  OVER_BUDGET: "Over budget",
  AT_RISK: "At risk",
  PENDING: "Pending",
};

export const statusLabel: Record<ProjectStatus, string> = {
  DRAFTING: "Drafting",
  SENT: "Sent",
  ACCEPTED: "Accepted",
  IN_PROGRESS: "In progress",
  DONE: "Done",
  PAID: "Paid",
  ARCHIVED: "Archived",
};

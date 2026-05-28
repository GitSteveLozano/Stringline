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

export function projectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

// ── Team ──────────────────────────────────────────────────────
export type TeamRole = "Owner" | "Estimator" | "Office mgr" | "Foreman" | "Crew";
export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  role: TeamRole;
  rate?: number;
  group: "Office" | "Field";
  pending?: boolean;
};

export const team: TeamMember[] = [
  { id: "u1", name: "Sarah Davis", initials: "SD", role: "Owner", group: "Office" },
  { id: "u2", name: "Maya Okonkwo", initials: "MO", role: "Estimator", group: "Office" },
  { id: "u3", name: "Tom Reyes", initials: "TR", role: "Office mgr", group: "Office" },
  { id: "w1", name: "Ana Castillo", initials: "AC", role: "Foreman", rate: 42, group: "Field" },
  { id: "w4", name: "Priya Shah", initials: "PS", role: "Foreman", rate: 42, group: "Field" },
  { id: "w2", name: "Marcus Lee", initials: "ML", role: "Crew", rate: 32, group: "Field" },
  { id: "w3", name: "Diego Fontana", initials: "DF", role: "Crew", rate: 30, group: "Field" },
  { id: "w5", name: "Hank Mueller", initials: "HM", role: "Crew", rate: 30, group: "Field", pending: true },
];

// ── Approvals queue ───────────────────────────────────────────
export type Approval = {
  id: string;
  who: string;
  site: string;
  kind: "Materials" | "Time / OT" | "Equipment";
  detail: string;
  amount: string;
  age: string;
  urgent?: boolean;
};

export const approvals: Approval[] = [
  { id: "a1", who: "Ana C.", site: "Hillcrest", kind: "Materials", detail: "EPS 1.5\" · 12 sheets · over yard stock", amount: "$510", age: "12m", urgent: true },
  { id: "a2", who: "Priya S.", site: "Aspen Ridge", kind: "Time / OT", detail: "Weekend OT · 3 crew · Saturday pour", amount: "12 hrs", age: "2h" },
  { id: "a3", who: "Ana C.", site: "Hillcrest", kind: "Equipment", detail: "Scissor lift · 1 extra week", amount: "$840", age: "5h" },
];

// ── Money (owner only) ────────────────────────────────────────
export const money = {
  cashIn30: 142800,
  cashOut30: 98400,
  payrollThisWeek: 18960,
  unbilled: 23700,
  ar: [
    { client: "Hillcrest Homes", amount: 22250, age: "due Jun 25" },
    { client: "Cardinal Group", amount: 11820, age: "due Jun 26" },
    { client: "Sage Care Properties", amount: 4495, age: "overdue 3d" },
  ],
};

// ── Per-project detail ────────────────────────────────────────
export type BudgetLine = { label: string; bid: number; spent: number };
export type ChangeOrderRow = {
  number: number;
  description: string;
  delta: number;
  status: "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED";
};
export type MilestoneRow = { label: string; percent: number; amount: number; paid: boolean };

export const projectExtras: Record<
  string,
  { budget: BudgetLine[]; changeOrders: ChangeOrderRow[]; milestones: MilestoneRow[] }
> = {
  "p-hillcrest": {
    budget: [
      { label: "EPS + basecoat", bid: 92000, spent: 58400 },
      { label: "Stone feature", bid: 41400, spent: 22100 },
      { label: "Caulk + flashing", bid: 26800, spent: 19800 },
      { label: "Labor — loaded", bid: 24050, spent: 8300 },
    ],
    changeOrders: [
      { number: 1, description: "Added soffit detail · east elevation", delta: 4250, status: "ACCEPTED" },
    ],
    milestones: [
      { label: "Deposit", percent: 25, amount: 46062, paid: true },
      { label: "Midpoint", percent: 35, amount: 64487, paid: true },
      { label: "Substantial", percent: 30, amount: 55275, paid: false },
      { label: "Final", percent: 10, amount: 18425, paid: false },
    ],
  },
  "p-aspen": {
    budget: [
      { label: "Block A basecoat", bid: 148000, spent: 71200 },
      { label: "Block B finish", bid: 96000, spent: 34100 },
      { label: "Detail + punch", bid: 38800, spent: 9200 },
      { label: "Labor — loaded", bid: 30000, spent: 18900 },
    ],
    changeOrders: [],
    milestones: [
      { label: "Deposit", percent: 25, amount: 78200, paid: true },
      { label: "Progress", percent: 50, amount: 156400, paid: false },
      { label: "Final", percent: 25, amount: 78200, paid: false },
    ],
  },
};

export const LIFECYCLE: ProjectStatus[] = [
  "DRAFTING",
  "SENT",
  "ACCEPTED",
  "IN_PROGRESS",
  "DONE",
  "PAID",
];

export function money0(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

// ── Foreman: field intake ─────────────────────────────────────
export type FieldItem = {
  id: string;
  who: string;
  site: string;
  kind: "Blocker" | "Photo" | "Note";
  detail: string;
  time: string;
  resolved?: boolean;
};

export const fieldItems: FieldItem[] = [
  { id: "f1", who: "Diego F.", site: "Hillcrest", kind: "Blocker", detail: "Out of EPS 1.5\" · 12 sheets to finish east wall", time: "12:48 PM" },
  { id: "f2", who: "Marcus L.", site: "Hillcrest", kind: "Photo", detail: "East wall · auto-tagged EPS · 4 photos", time: "2:18 PM" },
  { id: "f3", who: "Sara B.", site: "Aspen Ridge", kind: "Note", detail: "Stone delivery confirmed 7:30 AM tomorrow", time: "3:02 PM" },
  { id: "f4", who: "Tomás R.", site: "Hillcrest", kind: "Blocker", detail: "Scaffold tag missing on tower 3", time: "11:10 AM", resolved: true },
];

// ── Foreman: today's daily log (auto-populated context + narrative) ──
export const todayLog = {
  site: "Hillcrest Mews — Ph 4",
  weather: "Partly cloudy · 64°F · 8 mph SW · 0% rain",
  photos: 12,
  crewHours: 32.3,
  sqftDone: 980,
  sqftPlanned: 1284,
  submitted: false,
  narrative:
    "EPS 76% complete on east elevation. Marcus and Tomás taped seams ahead of schedule. Found a soft spot near the vapor barrier — flagged for inspection.",
};

// ── Foreman: this week's crew hours (no dollars — money hidden) ──
export const foremanWeek = {
  label: "Week of May 25",
  totalHours: 189,
  crewCount: 5,
  flagged: 1,
  days: [
    { d: "M", h: 38 },
    { d: "T", h: 39 },
    { d: "W", h: 40 },
    { d: "T", h: 38 },
    { d: "F", h: 34 },
  ],
};

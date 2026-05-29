/**
 * Seed the database from the V2 demo fixtures (src/lib/demo-data.ts), so the
 * real backend reflects exactly what the screens were built against.
 *
 * Idempotent: wipes the demo workspace and reseeds. Run with `npm run db:seed`.
 */
import { PrismaClient, BaseRole, ProjectStatus, ProjectHealth, ProjectType } from "@prisma/client";
import {
  projects as fxProjects,
  team as fxTeam,
  crew as fxCrew,
  projectExtras,
} from "../src/lib/demo-data";

const db = new PrismaClient();

const SUBDOMAIN = "davis";

// View-model status/health strings already match the Prisma enums 1:1.
const statusEnum = (s: string) => s as ProjectStatus;
const healthEnum = (h: string) => h as ProjectHealth;

const dayMs = 24 * 60 * 60 * 1000;
const today = new Date();
const isoTime = (h: number, m: number) =>
  `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

async function main() {
  // ── Reset — full wipe for a clean, single-tenant dev seed ────
  // Deleting workspaces cascades all workspace-scoped rows; users are global,
  // so clear them separately. Notifications are user-keyed only, clear too.
  await db.notification.deleteMany();
  await db.workspace.deleteMany();
  await db.user.deleteMany();

  // ── Workspace ────────────────────────────────────────────────
  const ws = await db.workspace.create({
    data: {
      name: "Davis Stucco LLC",
      trade: "STUCCO",
      subdomain: SUBDOMAIN,
      timezone: "America/Edmonton",
    },
  });

  // ── Office-manager custom role (base OWNER, may view costs) ───
  const officeMgrRole = await db.customRole.create({
    data: {
      workspaceId: ws.id,
      name: "Office mgr",
      base: BaseRole.OWNER,
      canViewCosts: true,
      canCreateProject: true,
    },
  });

  // ── Users + memberships (the team roster) ────────────────────
  // Maps each fixture team member to a base role (+ optional custom role).
  type Spec = { base: BaseRole; customRoleId?: string };
  const roleSpec: Record<string, Spec> = {
    Owner: { base: BaseRole.OWNER },
    Estimator: { base: BaseRole.ESTIMATOR },
    "Office mgr": { base: BaseRole.OWNER, customRoleId: officeMgrRole.id },
    Foreman: { base: BaseRole.FOREMAN },
    Crew: { base: BaseRole.WORKER },
  };

  const userByName = new Map<string, string>();
  for (const m of fxTeam) {
    const spec = roleSpec[m.role];
    const user = await db.user.create({
      data: {
        name: m.name,
        email:
          m.group === "Office"
            ? `${m.name.split(" ")[0].toLowerCase()}@davisstucco.com`
            : null,
        memberships: {
          create: {
            workspaceId: ws.id,
            role: spec.base,
            customRoleId: spec.customRoleId,
            baseHourly: m.rate ?? null,
            pending: m.pending ?? false,
          },
        },
      },
    });
    userByName.set(m.name, user.id);
  }

  // ── Clients (unique by project client name) ──────────────────
  const leadNames = new Set(["Northline Builders", "AHS Capital"]); // prospects / bids out
  const clientByName = new Map<string, string>();
  for (const p of fxProjects) {
    if (clientByName.has(p.client)) continue;
    const client = await db.client.create({
      data: {
        workspaceId: ws.id,
        name: p.client,
        kind: "BUILDER",
        isLead: leadNames.has(p.client),
      },
    });
    clientByName.set(p.client, client.id);
  }

  // ── Projects (+ schedule, cached rollups, budget, COs, invoices) ──
  for (const p of fxProjects) {
    const startedOn =
      p.dayOf != null ? new Date(today.getTime() - (p.dayOf - 1) * dayMs) : null;

    const project = await db.project.create({
      data: {
        workspaceId: ws.id,
        clientId: clientByName.get(p.client)!,
        name: p.name,
        type: ProjectType.FIXED_BID,
        status: statusEnum(p.status),
        health: healthEnum(p.health),
        address: p.address,
        contractValue: p.contractValue,
        startedOn,
        durationDays: p.dayTotal ?? null,
        crewSize: p.crewSize,
        spentToDate: p.spent,
        progress: p.progress,
      },
    });

    const extras = projectExtras[p.id];
    if (!extras) continue;

    // Budget lines
    await db.budgetLine.createMany({
      data: extras.budget.map((b, i) => ({
        projectId: project.id,
        label: b.label,
        bid: b.bid,
        spent: b.spent,
        sort: i,
      })),
    });

    // Change orders
    for (const c of extras.changeOrders) {
      await db.changeOrder.create({
        data: {
          projectId: project.id,
          number: c.number,
          description: c.description,
          valueDelta: c.delta,
          status: c.status,
          createdById: userByName.get("Sarah Davis")!,
          approvedById: c.status === "ACCEPTED" ? userByName.get("Sarah Davis")! : null,
        },
      });
    }

    // One invoice carrying the billing milestones; unpaid milestones become A/R.
    if (extras.milestones.length) {
      const amount = extras.milestones.reduce((s, m) => s + m.amount, 0);
      const unpaid = extras.milestones.filter((m) => !m.paid);
      // Invoice is due when the next unpaid milestone comes due.
      const dueOn = unpaid.length ? new Date(today.getTime() + 14 * dayMs) : null;
      await db.invoice.create({
        data: {
          projectId: project.id,
          number: `INV-${p.id.replace("p-", "").slice(0, 6).toUpperCase()}`,
          amount,
          status: unpaid.length ? "PARTIAL" : "PAID",
          dueOn,
          milestones: {
            create: extras.milestones.map((m) => ({
              label: m.label,
              percent: m.percent,
              amount: m.amount,
              paidOn: m.paid ? new Date(today.getTime() - 20 * dayMs) : null,
            })),
          },
        },
      });
    }
  }

  // ── Open time entries → "crew on the clock" on the owner home ──
  const projectIdByFixtureId = new Map<string, string>();
  for (const p of fxProjects) {
    const row = await db.project.findFirst({
      where: { workspaceId: ws.id, name: p.name },
      select: { id: true },
    });
    if (row) projectIdByFixtureId.set(p.id, row.id);
  }
  // Match clocked-in crew to known team users by name where possible.
  const nameAlias: Record<string, string> = { "Tomás Reyes": "Marcus Lee" };
  for (const c of fxCrew) {
    if (!c.clockedIn) continue;
    const userId = userByName.get(c.name) ?? userByName.get(nameAlias[c.name] ?? "");
    const projectId = projectIdByFixtureId.get(c.project);
    if (!userId || !projectId) continue;
    await db.timeEntry.create({
      data: {
        projectId,
        userId,
        date: today,
        clockIn: isoTime(7, 30),
        clockOut: null,
        hours: 0,
        source: "AUTO",
      },
    });
  }

  const counts = {
    users: await db.user.count(),
    projects: await db.project.count(),
    budgetLines: await db.budgetLine.count(),
    milestones: await db.milestone.count(),
    openClockIns: await db.timeEntry.count({ where: { clockOut: null } }),
  };
  console.log("Seed complete:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

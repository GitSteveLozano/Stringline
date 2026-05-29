/**
 * Seed the database from the V2 demo fixtures (src/lib/demo-data.ts), so the
 * real backend reflects exactly what the screens were built against.
 *
 * Idempotent: wipes the demo workspace and reseeds. Run with `npm run db:seed`.
 */
import {
  PrismaClient,
  BaseRole,
  ProjectStatus,
  ProjectHealth,
  ProjectType,
  FieldKind,
  ApprovalKind,
  TxnType,
  Confidence,
  MeasurementSource,
  Anomaly,
} from "@prisma/client";
import {
  projects as fxProjects,
  team as fxTeam,
  crew as fxCrew,
  projectExtras,
  fieldItems as fxFieldItems,
  todayLog as fxTodayLog,
  workerScope as fxWorkerScope,
  workerPhotos as fxWorkerPhotos,
  approvals as fxApprovals,
  money as fxMoney,
} from "../src/lib/demo-data";
import { SCOPES, demoSheets, aiDraft } from "../src/lib/takeoff";

const db = new PrismaClient();

const SUBDOMAIN = "davis";

// View-model status/health strings already match the Prisma enums 1:1.
const statusEnum = (s: string) => s as ProjectStatus;
const healthEnum = (h: string) => h as ProjectHealth;

const dayMs = 24 * 60 * 60 * 1000;
const today = new Date();
const isoTime = (h: number, m: number) =>
  `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

/** Parse a fixture clock string like "12:48 PM" into a Date earlier today. */
function clockToday(t: string): Date {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  const d = new Date(today);
  if (m) {
    let h = Number(m[1]) % 12;
    if (/PM/i.test(m[3])) h += 12;
    d.setHours(h, Number(m[2]), 0, 0);
  }
  return d;
}

/** The Monday→Friday dates of the current work week. */
function workWeek(): Date[] {
  const monday = new Date(today);
  const dow = (monday.getDay() + 6) % 7; // 0 = Monday
  monday.setDate(monday.getDate() - dow);
  monday.setHours(8, 0, 0, 0);
  return Array.from({ length: 5 }, (_, i) => new Date(monday.getTime() + i * dayMs));
}

/** Resolve a fixture display name ("Diego F.", "Marcus Lee") to a seeded user. */
function resolveUser(byName: Map<string, string>, display: string): string | undefined {
  if (byName.has(display)) return byName.get(display);
  const first = display.split(/[\s.]/)[0].toLowerCase();
  for (const [name, id] of byName) {
    if (name.toLowerCase().startsWith(first)) return id;
  }
  return undefined;
}

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
  const projectIdByFixtureId = new Map<string, string>();
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
    projectIdByFixtureId.set(p.id, project.id);

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

  // Map a fixture "site" word (e.g. "Hillcrest") to a seeded project id.
  const siteToProjectId = (site: string): string | undefined => {
    const fx = fxProjects.find((p) => p.name.toLowerCase().includes(site.toLowerCase()));
    return fx ? projectIdByFixtureId.get(fx.id) : undefined;
  };

  // ── Time entries: this week's hours + who's on the clock now ──
  // Distributes each crew member's weekly hours across the work week.
  // Clocked-in members get an open entry for today (drives "crew on clock").
  const week = workWeek();
  const todayIdx = week.findIndex((d) => d.toDateString() === today.toDateString());
  const lastIdx = todayIdx >= 0 ? todayIdx : week.length - 1;
  for (const c of fxCrew) {
    const userId = resolveUser(userByName, c.name);
    const projectId = projectIdByFixtureId.get(c.project);
    if (!userId || !projectId) continue;
    const daysWorked = lastIdx + 1;
    const perDay = Math.round((c.hoursWeek / daysWorked) * 10) / 10;
    for (let i = 0; i <= lastIdx; i++) {
      if (i === todayIdx && c.clockedIn) {
        await db.timeEntry.create({
          data: { projectId, userId, date: week[i], clockIn: isoTime(7, 30), hours: 0, source: "AUTO" },
        });
      } else {
        await db.timeEntry.create({
          data: {
            projectId,
            userId,
            date: week[i],
            clockIn: isoTime(7, 0),
            clockOut: isoTime(15, 30),
            hours: perDay,
            source: "AUTO",
            approval: "FOREMAN_APPROVED",
            anomalies: c.id === "w5" && i === 0 ? [Anomaly.OVERTIME] : [],
          },
        });
      }
    }
  }

  // ── Worker scope: today's assignment + ordered checklist steps ──
  const hillcrestId = projectIdByFixtureId.get("p-hillcrest")!;
  await db.assignment.create({
    data: {
      projectId: hillcrestId,
      date: today,
      scope: "EPS · East elevation",
      sqft: fxWorkerScope.goalSqft,
      doneSqft: fxWorkerScope.doneSqft,
      status: "CONFIRMED",
      crewUserIds: [userByName.get("Marcus Lee")!],
      scopedById: userByName.get("Ana Castillo")!,
      scopedAt: clockToday(fxWorkerScope.scopedAt),
      onSiteNote: fxWorkerScope.onSite,
      steps: {
        create: fxWorkerScope.steps.map((s, i) => ({
          label: s.label,
          sort: i,
          done: s.done,
          current: Boolean((s as { now?: boolean }).now),
        })),
      },
    },
  });

  // ── Foreman daily log (today, unsubmitted) ───────────────────
  await db.dailyLog.create({
    data: {
      projectId: hillcrestId,
      foremanId: userByName.get("Ana Castillo")!,
      date: today,
      submitted: fxTodayLog.submitted,
      weatherJson: { summary: fxTodayLog.weather },
      crewUserIds: [userByName.get("Marcus Lee")!, userByName.get("Diego Fontana")!],
      crewHours: fxTodayLog.crewHours,
      photoCount: fxTodayLog.photos,
      sqftDone: fxTodayLog.sqftDone,
      sqftPlanned: fxTodayLog.sqftPlanned,
      narrative: fxTodayLog.narrative,
    },
  });

  // ── Field intake (blockers / photos / notes) ─────────────────
  const fieldKind = (k: string): FieldKind =>
    k === "Blocker" ? FieldKind.BLOCKER : k === "Photo" ? FieldKind.PHOTO : FieldKind.NOTE;
  for (const f of fxFieldItems) {
    const userId = resolveUser(userByName, f.who);
    const projectId = siteToProjectId(f.site);
    if (!userId || !projectId) continue;
    await db.fieldReport.create({
      data: {
        projectId,
        userId,
        kind: fieldKind(f.kind),
        detail: f.detail,
        resolved: f.resolved ?? false,
        createdAt: clockToday(f.time),
      },
    });
  }

  // ── Worker photo log (scope-tagged) ──────────────────────────
  const marcusId = userByName.get("Marcus Lee")!;
  for (const group of fxWorkerPhotos) {
    const dayBase = group.day.startsWith("Yesterday")
      ? new Date(today.getTime() - dayMs)
      : today;
    for (const item of group.items) {
      const takenAt = item.time ? clockToday(item.time) : dayBase;
      if (group.day.startsWith("Yesterday")) takenAt.setDate(dayBase.getDate());
      await db.photo.create({
        data: { projectId: hillcrestId, userId: marcusId, tag: item.tag, takenAt },
      });
    }
  }

  // ── Approvals queue (materials / OT / equipment) ─────────────
  const approvalKind = (k: string): ApprovalKind =>
    k === "Materials" ? ApprovalKind.MATERIALS : k.includes("Time") ? ApprovalKind.TIME_OT : ApprovalKind.EQUIPMENT;
  const ageToDate = (age: string): Date => {
    const m = age.match(/(\d+)\s*([mh])/);
    if (!m) return today;
    const ms = Number(m[1]) * (m[2] === "h" ? 3600_000 : 60_000);
    return new Date(today.getTime() - ms);
  };
  for (const a of fxApprovals) {
    const userId = resolveUser(userByName, a.who);
    const projectId = siteToProjectId(a.site);
    if (!userId || !projectId) continue;
    const isHours = /hr/i.test(a.amount);
    const amount = Number(a.amount.replace(/[^0-9.]/g, "")) || 0;
    await db.approval.create({
      data: {
        projectId,
        requesterUserId: userId,
        kind: approvalKind(a.kind),
        detail: a.detail,
        amount,
        unit: isHours ? "hrs" : "USD",
        urgent: a.urgent ?? false,
        createdAt: ageToDate(a.age),
      },
    });
  }

  // ── Pricing book (scope items / assemblies) ──────────────────
  const rates: Record<string, { unit: string; cost: number; sell: number }> = {
    EPS: { unit: "sqft", cost: 3.2, sell: 5.6 },
    BASE: { unit: "sqft", cost: 2.1, sell: 3.9 },
    STONE: { unit: "sqft", cost: 9.4, sell: 16.5 },
    CAULK: { unit: "lf", cost: 1.3, sell: 2.8 },
  };
  for (const s of SCOPES) {
    const r = rates[s.code] ?? { unit: "sqft", cost: 2, sell: 4 };
    await db.scopeItem.create({
      data: {
        workspaceId: ws.id,
        code: s.code,
        name: s.name,
        unit: r.unit,
        costRate: r.cost,
        sellRate: r.sell,
        color: s.color,
      },
    });
  }

  // ── Takeoff sheets + AI-detected measurements (scale gate) ───
  for (const [fixtureId, sheets] of Object.entries(demoSheets)) {
    const projectId = projectIdByFixtureId.get(fixtureId);
    if (!projectId) continue;
    for (let si = 0; si < sheets.length; si++) {
      const s = sheets[si];
      const sheet = await db.sheet.create({
        data: {
          projectId,
          name: s.name,
          scale: s.scale,
          scaleConfidence: s.confidence as Confidence,
          // HIGH-confidence scales are pre-verified; MED/LOW await the gate.
          scaleVerifiedAt: s.confidence === "HIGH" ? new Date(today.getTime() - dayMs) : null,
          sort: si,
        },
      });
      // Seed the first sheet of each project with the canned AI takeoff.
      if (si === 0) {
        for (const m of aiDraft(s.scale)) {
          await db.measurement.create({
            data: {
              projectId,
              sheetId: sheet.id,
              code: m.scope,
              qty: m.sf,
              unit: "sqft",
              pointsJson: m.points,
              confidence: m.confidence as Confidence,
              source: MeasurementSource.AI,
            },
          });
        }
      }
    }
  }

  // ── Cash ledger → owner money tiles ──────────────────────────
  const wkStart = week[0];
  const txns: { type: TxnType; amount: number; description: string; date: Date; site?: string }[] = [
    { type: TxnType.PAYMENT_IN, amount: 90000, description: "Hillcrest — midpoint draw", date: new Date(today.getTime() - 12 * dayMs), site: "Hillcrest" },
    { type: TxnType.PAYMENT_IN, amount: 52800, description: "Aspen Ridge — deposit", date: new Date(today.getTime() - 3 * dayMs), site: "Aspen" },
    { type: TxnType.MATERIAL_COST, amount: 60000, description: "EPS + basecoat — supplier", date: new Date(today.getTime() - 10 * dayMs), site: "Hillcrest" },
    { type: TxnType.EQUIPMENT, amount: 19440, description: "Scissor lift + scaffold rental", date: new Date(today.getTime() - 5 * dayMs), site: "Hillcrest" },
    { type: TxnType.PAYROLL, amount: fxMoney.payrollThisWeek, description: "Crew payroll — this week", date: wkStart },
  ];
  for (const t of txns) {
    await db.transaction.create({
      data: {
        workspaceId: ws.id,
        projectId: t.site ? siteToProjectId(t.site) ?? null : null,
        type: t.type,
        amount: t.amount,
        description: t.description,
        date: t.date,
      },
    });
  }

  const counts = {
    users: await db.user.count(),
    projects: await db.project.count(),
    timeEntries: await db.timeEntry.count(),
    fieldReports: await db.fieldReport.count(),
    approvals: await db.approval.count(),
    scopeSteps: await db.scopeStep.count(),
    photos: await db.photo.count(),
    sheets: await db.sheet.count(),
    measurements: await db.measurement.count(),
    scopeItems: await db.scopeItem.count(),
    transactions: await db.transaction.count(),
  };
  console.log("Seed complete:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

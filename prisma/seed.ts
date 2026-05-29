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
  DispatchStatus,
  GuardrailType,
  GuardrailStatus,
  AssignmentStatus,
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
import { randomBytes, scryptSync } from "node:crypto";

const db = new PrismaClient();

// Matches verifyPassword() in src/server/auth.ts (salt$hash, scrypt keylen 64).
function hashPassword(pw: string): string {
  const salt = randomBytes(16).toString("hex");
  return `${salt}$${scryptSync(pw, salt, 64).toString("hex")}`;
}

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

  // Credentials: office signs in with email + password "demo"; crew use a
  // phone + SMS code. Phones are deterministic so the demo is reproducible.
  const userByName = new Map<string, string>();
  let phoneSeq = 100;
  for (const m of fxTeam) {
    const spec = roleSpec[m.role];
    const isOffice = m.group === "Office";
    const user = await db.user.create({
      data: {
        name: m.name,
        email: isOffice ? `${m.name.split(" ")[0].toLowerCase()}@davisstucco.com` : null,
        phone: isOffice ? null : `+1403555${phoneSeq++}`,
        passwordHash: isOffice ? hashPassword("demo") : null,
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

  // The owner wears every hat (solo-operator demo) — add the other three
  // memberships AFTER the roster so the dedicated crew stay "first" for the
  // role-scoped queries (worker = Marcus, foreman = Ana, estimator = Maya).
  const ownerId = userByName.get("Sarah Davis")!;
  for (const role of [BaseRole.ESTIMATOR, BaseRole.FOREMAN, BaseRole.WORKER]) {
    await db.membership.create({ data: { userId: ownerId, workspaceId: ws.id, role } });
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
            // Flag one real, seeded crew member's Monday entry for overtime
            // (the fixture's w5 "Tomás" isn't in the team roster, so it'd drop).
            anomalies: c.id === "w3" && i === 0 ? [Anomaly.OVERTIME] : [],
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

  // ── Crew schedule (upcoming assignments across jobs) ─────────
  // Marcus stays on today only (his worker scope reads the latest assignment
  // from today forward); the week is built around Diego and Hank.
  const DAY_MS = 86_400_000;
  const diegoId = userByName.get("Diego Fontana")!;
  const hankId = userByName.get("Hank Mueller")!;
  const anaSchedId = userByName.get("Ana Castillo")!;
  const priyaId = userByName.get("Priya Shah")!;
  const aspenSchedId = projectIdByFixtureId.get("p-aspen");
  const day = (n: number) => new Date(today.getTime() + n * DAY_MS);
  const scheduleRows = [
    { projectId: hillcrestId, date: day(0), scope: "Block B finish", crewUserIds: [diegoId, hankId], status: AssignmentStatus.CONFIRMED, sqft: 1100, plannedHr: 16, scopedById: anaSchedId },
    { projectId: aspenSchedId, date: day(1), scope: "Detail + punch", crewUserIds: [hankId], status: AssignmentStatus.SENT, sqft: 600, plannedHr: 8, scopedById: priyaId },
    { projectId: hillcrestId, date: day(1), scope: "EPS · North elevation", crewUserIds: [diegoId], status: AssignmentStatus.CONFIRMED, sqft: 900, plannedHr: 8, scopedById: anaSchedId },
    { projectId: hillcrestId, date: day(2), scope: "Stone veneer · lobby", crewUserIds: [diegoId, hankId], status: AssignmentStatus.SENT, sqft: 450, plannedHr: 18, scopedById: anaSchedId },
    { projectId: aspenSchedId, date: day(3), scope: "Caulk + seal", crewUserIds: [diegoId], status: AssignmentStatus.PENDING, sqft: 800, plannedHr: 9, scopedById: priyaId },
    { projectId: hillcrestId, date: day(4), scope: "Punch list", crewUserIds: [hankId], status: AssignmentStatus.PENDING, sqft: 300, plannedHr: 6, scopedById: anaSchedId },
  ].filter((r) => r.projectId) as { projectId: string; date: Date; scope: string; crewUserIds: string[]; status: AssignmentStatus; sqft: number; plannedHr: number; scopedById: string }[];
  for (const r of scheduleRows) {
    await db.assignment.create({ data: r });
  }

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

  // ── Daily-log history (submitted journal entries) ────────────
  const crewPair = [userByName.get("Marcus Lee")!, userByName.get("Diego Fontana")!];
  const logHistory = [
    { projectId: hillcrestId, foremanId: anaSchedId, daysAgo: 1, weather: "Sunny · 18°C", crewHours: 32, photos: 5, sqftDone: 1180, sqftPlanned: 1200, narrative: "East elevation EPS wrapped. Crew of 4 ran clean; mesh embed started on the north corner." },
    { projectId: hillcrestId, foremanId: anaSchedId, daysAgo: 2, weather: "Overcast · 14°C", crewHours: 30, photos: 4, sqftDone: 960, sqftPlanned: 1000, narrative: "Base coat on south wall. Lost an hour to a late EPS delivery — flagged to the office." },
    { projectId: hillcrestId, foremanId: anaSchedId, daysAgo: 3, weather: "Light rain AM · 12°C", crewHours: 22, photos: 3, sqftDone: 540, sqftPlanned: 800, narrative: "Rain held us to interior prep until 11. Scaffolded the west face for tomorrow." },
    { projectId: aspenSchedId, foremanId: priyaId, daysAgo: 1, weather: "Sunny · 20°C", crewHours: 36, photos: 6, sqftDone: 820, sqftPlanned: 700, narrative: "Block B finish ahead of plan. Punch list started on units 4–6." },
    { projectId: aspenSchedId, foremanId: priyaId, daysAgo: 2, weather: "Windy · 16°C", crewHours: 34, photos: 4, sqftDone: 610, sqftPlanned: 750, narrative: "Wind slowed stone veneer hoisting. Detail crew caught up on caulking." },
  ].filter((l) => l.projectId) as { projectId: string; foremanId: string; daysAgo: number; weather: string; crewHours: number; photos: number; sqftDone: number; sqftPlanned: number; narrative: string }[];
  for (const l of logHistory) {
    const d = day(-l.daysAgo);
    await db.dailyLog.create({
      data: {
        projectId: l.projectId,
        foremanId: l.foremanId,
        date: d,
        submitted: true,
        submittedAt: d,
        weatherJson: { summary: l.weather },
        crewUserIds: crewPair,
        crewHours: l.crewHours,
        photoCount: l.photos,
        sqftDone: l.sqftDone,
        sqftPlanned: l.sqftPlanned,
        narrative: l.narrative,
      },
    });
  }

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

  // ── Assets + dispatch (equipment out on jobs) ────────────────
  const DAY = 86_400_000;
  const aspenId = projectIdByFixtureId.get("p-aspen") ?? null;
  const assetSpecs = [
    { sku: "SCAF-01", name: "Scaffold frame set", category: "Access", dailyRate: 12, ownedQty: 40, replacement: 180 },
    { sku: "MIX-01", name: "Mortar mixer", category: "Mixing", dailyRate: 35, ownedQty: 4, replacement: 2200 },
    { sku: "PUMP-01", name: "Mortar pump", category: "Mixing", dailyRate: 85, ownedQty: 2, replacement: 9800 },
    { sku: "GEN-01", name: "Generator 7kW", category: "Power", dailyRate: 45, ownedQty: 3, replacement: 1600 },
    { sku: "LAS-01", name: "Rotary laser level", category: "Layout", dailyRate: 18, ownedQty: 5, replacement: 700 },
  ];
  const assetBySku = new Map<string, string>();
  for (const a of assetSpecs) {
    const asset = await db.asset.create({ data: { workspaceId: ws.id, ...a } });
    assetBySku.set(a.sku, asset.id);
  }
  // dueInDays < 0 reads as overdue (derived at query time from dueBack).
  const dispatchSpecs = [
    { ticket: "D-1042", sku: "SCAF-01", qty: 24, project: hillcrestId, sentDaysAgo: 10, dueInDays: 20, returned: false },
    { ticket: "D-1043", sku: "MIX-01", qty: 2, project: aspenId, sentDaysAgo: 5, dueInDays: -2, returned: false },
    { ticket: "D-1044", sku: "GEN-01", qty: 1, project: hillcrestId, sentDaysAgo: 3, dueInDays: 10, returned: false },
    { ticket: "D-1045", sku: "PUMP-01", qty: 1, project: hillcrestId, sentDaysAgo: 1, dueInDays: 6, returned: false },
    { ticket: "D-1039", sku: "LAS-01", qty: 1, project: aspenId, sentDaysAgo: 12, dueInDays: -5, returned: true },
  ];
  for (const d of dispatchSpecs) {
    if (!d.project) continue;
    await db.dispatch.create({
      data: {
        ticketId: d.ticket,
        assetId: assetBySku.get(d.sku)!,
        qty: d.qty,
        projectId: d.project,
        sentOn: new Date(Date.now() - d.sentDaysAgo * DAY),
        dueBack: new Date(Date.now() + d.dueInDays * DAY),
        status: d.returned ? DispatchStatus.RETURNED : DispatchStatus.OUT,
        signedBy: "Ana Castillo",
      },
    });
  }

  // ── Guardrails (per-project risk monitors) ───────────────────
  const guardrailData = [
    // Aspen is over budget → margin guardrail tripped, schedule slipping.
    aspenId && { projectId: aspenId, type: GuardrailType.MARGIN, threshold: 18, currentValue: 11, status: GuardrailStatus.TRIGGERED },
    aspenId && { projectId: aspenId, type: GuardrailType.SCHEDULE, threshold: 3, currentValue: 4, status: GuardrailStatus.TRIGGERED },
    // Hillcrest is healthy → guardrails armed and quiet.
    { projectId: hillcrestId, type: GuardrailType.MARGIN, threshold: 18, currentValue: 24, status: GuardrailStatus.ARMED },
    { projectId: hillcrestId, type: GuardrailType.SCHEDULE, threshold: 3, currentValue: 1, status: GuardrailStatus.ARMED },
    { projectId: hillcrestId, type: GuardrailType.SAFETY, threshold: 4, currentValue: 4, status: GuardrailStatus.ARMED },
  ].filter(Boolean) as { projectId: string; type: GuardrailType; threshold: number; currentValue: number; status: GuardrailStatus }[];
  await db.guardrail.createMany({ data: guardrailData });

  // ── Notifications (per-persona inbox) ────────────────────────
  // Kind taxonomy mirrors the schema comment: owner AUTH|RISK|LOG|PAID ·
  // foreman BLOCKER|CREW|SCHEDULE|AUTH · worker NEXT|BRIEF|PAY|LOG.
  const HOUR = 3_600_000;
  const sarahId = userByName.get("Sarah Davis")!;
  const mayaId = userByName.get("Maya Okonkwo")!;
  const anaId = userByName.get("Ana Castillo")!;
  const marcusLeeId = userByName.get("Marcus Lee")!;

  await db.notification.createMany({
    data: [
      // Owner
      { userId: sarahId, audience: BaseRole.OWNER, kind: "RISK", title: "Aspen Ridge is over budget", body: "Labor is tracking 14% above the bid.", projectId: aspenId, createdAt: new Date(Date.now() - 1 * HOUR) },
      { userId: sarahId, audience: BaseRole.OWNER, kind: "AUTH", title: "3 approvals waiting", body: "Materials and OT requests need your sign-off.", projectId: null, createdAt: new Date(Date.now() - 3 * HOUR) },
      { userId: sarahId, audience: BaseRole.OWNER, kind: "PAID", title: "Cardinal Group paid $234,600", body: "Invoice cleared for Aspen Ridge Townhomes.", projectId: aspenId, createdAt: new Date(Date.now() - 26 * HOUR) },
      { userId: sarahId, audience: BaseRole.OWNER, kind: "LOG", title: "Daily log submitted", body: "Hillcrest Mews — Ph 4, Day 18.", projectId: hillcrestId, read: true, createdAt: new Date(Date.now() - 30 * HOUR) },
      // Estimator
      { userId: mayaId, audience: BaseRole.ESTIMATOR, kind: "BID", title: "Riverbend Retail Shell is out for bid", body: "$93,200 sent to Northline Builders.", projectId: null, createdAt: new Date(Date.now() - 5 * HOUR) },
      { userId: mayaId, audience: BaseRole.ESTIMATOR, kind: "WON", title: "Greenwillow Senior Living — won", body: "$428,900 moved to accepted.", projectId: null, read: true, createdAt: new Date(Date.now() - 48 * HOUR) },
      // Foreman
      { userId: anaId, audience: BaseRole.FOREMAN, kind: "BLOCKER", title: "Scaffold delivery delayed", body: "Hillcrest east elevation — crew blocked until noon.", projectId: hillcrestId, createdAt: new Date(Date.now() - 2 * HOUR) },
      { userId: anaId, audience: BaseRole.FOREMAN, kind: "CREW", title: "Diego clocked in", body: "Hillcrest Mews — Ph 4.", projectId: hillcrestId, read: true, createdAt: new Date(Date.now() - 4 * HOUR) },
      // Worker
      { userId: marcusLeeId, audience: BaseRole.WORKER, kind: "NEXT", title: "Today: EPS · East elevation", body: "Scoped by Ana — 1,200 sqft goal.", projectId: hillcrestId, createdAt: new Date(Date.now() - 1 * HOUR) },
      { userId: marcusLeeId, audience: BaseRole.WORKER, kind: "PAY", title: "Timesheet approved", body: "Last week — 41.5 hrs.", projectId: null, read: true, createdAt: new Date(Date.now() - 72 * HOUR) },
    ],
  });

  const counts = {
    users: await db.user.count(),
    assets: await db.asset.count(),
    dispatches: await db.dispatch.count(),
    guardrails: await db.guardrail.count(),
    assignments: await db.assignment.count(),
    dailyLogs: await db.dailyLog.count(),
    notifications: await db.notification.count(),
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
  console.log("\nDemo sign-in:");
  console.log("  Office: sarah@davisstucco.com / demo  (owner — wears all four hats)");
  console.log("          maya@davisstucco.com / demo   (estimator)");
  console.log("  Crew:   phone +1403555102 (Marcus, worker) — code shown on screen");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

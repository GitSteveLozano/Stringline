# Stringline — design read-through

A thorough walk-through of the design package at `designs/`. Synthesizes 121 artboards + ~12k LOC of React mockup source into one document, organized so we can refer back to it as we build.

---

## 1. Executive summary

**Stringline is a mobile app for construction subcontractors** — specifically exterior cladding contractors (EIFS, stucco, masonry, siding). The design targets the Alberta market (Mountain Time, Canadian holidays, AB regional pricing comps), but the model generalizes.

It is a **three-persona system**:

| Persona | Theme | Primary surface | Key job |
|---|---|---|---|
| **Owner / PM** | Light (sand + warm orange) | "Calm" dashboard, 5-tab nav | Bid → estimate → run jobs → invoice → close |
| **Foreman** | Light (denser) | Today multi-site, **Field** tab inbox, 5-tab nav | Brief crew, log days, approve crew time, surface blockers |
| **Worker / Crew** | **Dark** (cream on espresso) | Today running timer, 4-tab nav | Clock in/out, follow today's scope, flag issues, photo logs |

The app's **defining design choices**:

1. **"Project IS the estimate"** until the client accepts. No separate bid/proposal/contract records, no v1/v2 versioning. The Worksheet (internal) and Proposal (client view) are tabs on the same record.
2. **"Calm by default"** dashboards. Default state is a 1-line greeting + project list. KPIs only surface when something needs attention. Snooze actions feed the AI rule engine.
3. **AI is a hierarchy of primitives**, not a chatbot. From smallest to most assertive: `MSpark` → `MAttribution` → `MAiEyebrow` → `MAiStripe` → `MAiAgent` (dashed border, autonomous draft).
4. **Three-layered data moat** for AI:
   - your own historical estimates vs actuals
   - your loss-reason log (archived bids capture *why* they lost)
   - regional cross-tenant pricing comps
5. **QBO is the integration spine** — pulls pricing book, loaded labor rates, team, active projects on day 1; pushes invoices, billing cycles, and the sync queue.
6. **Geofence + auto clock-in** is the time-tracking spine. Manual clock-in is the fallback, with reason picker; every manual entry pings the foreman.
7. **A single project-scoped audit log** is shared across all three roles. Same record, role-gated edit rights, role-colored badges.

---

## 2. Reading the codebase: filename → content map

The `designs/source/` filenames don't match their contents. Use this map; do not infer from names.

| Filename | Actually contains |
|---|---|
| `tweaks-panel.jsx` | **CSS design tokens** (root vars, all `.m-*` styles) |
| `tweaks-panel.early.jsx` | Earlier draft of tweaks panel; can be ignored |
| `mobile-tokens.css` | **React primitives library** — `MI` icons + `MTopBar`, `MLargeHead`, `MSectionH`, `MRow`, `MKpi`, `MPill`, `MBottomTabs`, `MQA`, `MAvatarGroup`, `MBanner`, `MStage`; **AI atoms** `MSpark`, `MAttribution`, `MAiEyebrow`, `MAiStripe`, `MAiAgent` |
| `mobile-primitives.jsx` | **10 worker app screens** (`WorkerInviteAccept`, `WorkerFirstRun`, `WorkerClockInManual`, `WorkerClockOutSuccess`, `WorkerIssueSubmitted`, `WorkerHoursCorrection`, `WorkerTimeOff`, `WorkerLogHistory`, `WorkerNotifications`, `WorkerProfile`) |
| `mb-app.jsx` | **iOS 26 device frame** (`IOSDevice`, status bar, dynamic island, `IOSGlassPill`, `IOSNavBar`, `IOSList`, `IOSListRow`, `IOSKeyboard`) |
| `data.js` | **Android Material 3 device frame** (`AndroidDevice`, `AndroidStatusBar`, etc.) |
| `ios-frame.jsx` | **DesignCanvas wrapper** — Figma-like canvas with artboards, post-its, drag/drop |
| `android-frame.jsx` | **The HTML index page** that loads everything via Babel + ESM imports |
| `design-canvas.jsx` | **`window.STRINGLINE_DATA` — the canonical data model + demo data.** Most important file. |
| `mb-screens-1.jsx` | DesignCanvas root + section orchestration; contains `DashboardPM` |
| `mb-screens-2.jsx` | **Section 2** (Navigation: `NavBottomIOS`, `NavTopAppBar`, `NavSwitcher`, `NavMore`, `NavDrawerOverflow`) **+ Section 13** (System states: `PWASplash`, `DashboardPM` etc.) |
| `mb-screens-3.jsx` | **Section 7** (Schedule: `ScheduleDay`, `ScheduleWeek`, `ScheduleCreateAssignment`) + `TimeBurden` + `TimeForemanEntry` |
| `mb-screens-4.jsx` | **Section 9** (Rentals: `RentalsCatalog`, `RentalsScan`, `RentalsDispatch`, `RentalsReturn`, `RentalsUtilization`) + **Section 10** (Settings home, Pricing, Team, Hours) + `WorkerToday`, `WorkerHoursWeek`, `WorkerLogPhoto` |
| `mb-screens-5.jsx` | **Section 12** (Foreman app: `ForemanTabs`, `ForemanToday`, `ForemanDailyLog`, `ForemanScheduleAhead`, `ForemanField`, `ForemanBriefCrew`, `ForemanCrew`) + **Section 13** (most system states) |
| `mb-screens-bid.jsx` | **Section 11** (Worker app completion: `WorkerTabs`, `WorkerClockInSuccess`, `WorkerScopeToday`, `WorkerIssue`, `ForemanCrewMap`) |
| `mb-screens-create.jsx` | **Section 5** (Estimate as a view on the project) — Worksheet/Proposal tabs + Archive sheet |
| `mb-screens-crew.jsx` | **Section 14** (Project creation: three entry paths + QB dedupe) |
| `mb-screens-cross-role-ext.jsx` | **Crew & Hours** — project-scoped time approval (`ProjectCrewOwner`, `ProjectCrewForeman`, `TimeQueueAllProjects`) |
| `mb-screens-foreman-ext.jsx` | **Cross-role extensions** — `SafetyInterrupt`, `OwnerAuthorizations`, `ForemanDailyLogReview`, `ForemanNotifications`, `OwnerBroadcast`, `ProjectActivityLog`, `SettingsPermissions` |
| `mb-screens-onboarding.jsx` | **Foreman extensions** — invite, first run, materials request, project chat (list + thread), foreman project detail, time week, daily log submitted, brief preview, crew member sheet, foreman profile |
| `mb-screens-owner-ext.jsx` | **Section 14 onboarding** — owner workspace setup |
| `mb-screens-owner-ext2.jsx` | Owner extensions — sign-in (returning user), clients (list + detail), notifications inbox, invoice → paid |
| `mb-screens-project-detail.jsx` | Owner extensions round 2 — `AttentionSnoozeSheet`, share-sheet, schedule edit + empty, rentals dispatch entry, `SettingsPricingItemNew`, `SettingsTeamMember`, `SettingsConnect`, `ProfileAccount`, `HelpSupport`, sample project, `StateStale` |
| `mb-screens-worker-ext.jsx` | **Project Detail** — the linear estimating-canvas page (Drafting → Sent → Accepted → In progress → Done → Archived) |

`designs/index.html` is a static visual index of all 121 artboards, grouped into 14 sections. Useful as a roadmap; references `screens/<id>.png` (works because index lives at `designs/` root).

---

## 3. Design system foundations

### 3.1 Color tokens (from `tweaks-panel.jsx:1-55`)

```
Surfaces:  sand        #f5f1ec
           sand-2      #ebe6df
           card        #ffffff
           card-soft   #f7f4ef
           line        #e8e3db / #d8d2c7

Ink:       ink-1       #1c1816  (primary)
           ink-2       #5b544c
           ink-3       #8a8278
           ink-4       #aea69a

Brand:     accent      #d9904a   (warm terracotta / burnt orange)
           accent-ink  #b46e2c

Semantic:  ok          #2c8a55
           danger      #c0463d
           warn        #c98a2e
           info        #2f6fb5
           (each with ~10% soft variant for tinted backgrounds)
```

The accent is read as construction/trades — clay, EIFS finish-coat, kraft paper — not tech-startup blue. This is deliberate.

### 3.2 Typography

- Stack: **Geist** + **Geist Mono** (Google Fonts), falling back to `-apple-system`, `system-ui`.
- Numerics use `font-feature-settings: "tnum"` everywhere money / time / % appears.
- Display H1 30/700/-0.02em; topbar title 17/600; body 15; supporting 11–13; eyebrow 10–11/600 uppercase 0.06em tracking.

### 3.3 Spacing, radii, shadows

- 4px implicit grid
- Radii: `r-sm 8`, `r 12`, `r-lg 18`, `r-xl 24`; sheets have 24px top corners; pills 999; buttons 14; FAB 16
- Three shadow tiers, all very soft. FAB has a tinted accent glow (`0 4px 12px rgba(217,144,74,.40)`)

### 3.4 Theming

Light/sand is default. A `.m-dark` variant flips bg to `#0e0c0a`, text to `#f3ecdf`. Applied to:

- **Worker app** (all worker screens except `WorkerHoursWeek` — see open question below)
- Splash, offline banner, drawer header, brief-preview, SafetyInterrupt
- Not a persona switch in code; applied per-screen

### 3.5 Primitives

In `mobile-tokens.css` (the misnamed primitives file):

- `MI.*` — icon set (~50 inline SVGs)
- `MTopBar` — back chevron + title + 1–2 trailing actions
- `MLargeHead` — iOS-style large title
- `MSectionH` — section header with optional link
- `MRow` — leading-icon list row with optional chevron
- `MKpi` — labeled metric tile
- `MPill` — status pill with optional dot
- `MBottomTabs` — 5-tab bottom nav for owner (Home / Projects / Schedule / Time / More)
- `MQA` — quick-action button
- `MAvatarGroup` — stacked avatars with `+N` overflow
- `MBanner` — tone-coded inline alert

Separate `ForemanTabs` and `WorkerTabs` exist for the other personas.

### 3.6 AI atom hierarchy

This is one of the most important design decisions in the system. AI presence is **graded**, not binary:

| Atom | Visual | When to use |
|---|---|---|
| `MSpark` | 11–12px 4-pointed star, accent | **Mark** — denotes "this is AI-derived". States: `dim` / `muted` / `accent` / `strong` (ordinal confidence) |
| `MAttribution` | `★ Based on **7 closed jobs**.` Small muted text | **Provenance** — quietly shows the data moat. Dismissable bottom row of any AI claim |
| `MAiEyebrow` | UPPERCASE 10/700 with spark prefix | **Claim** — replaces generic "Heads up". Sits at top of an AI card |
| `MAiStripe` | Card + 3px left-border (accent / warn / good) | **Insight** — the canonical AI container. Title + body + optional attribution + optional action + always dismissable |
| `MAiAgent` | **Dashed accent border** + sand fill + floating "Agent draft · review before sending" eyebrow | **Autonomous output** requiring explicit human approval. The "be careful" visual treatment |

Workers see only `MSpark` (auto-tag photos, SLA reassurance). They never see `MAttribution` or `MAiStripe` — workers stay in execution mode.

Foremen see `MAiAgent` once: the daily log narrative, drafted from "12 photos · 2 voice memos · clock-in data."

Owners see all five. `MAiStripe` is the dashboard attention card. `MAiAgent` only appears in onboarding (the QBO ingest agent).

---

## 4. Information architecture

### 4.1 Bottom tabs per persona

```
Owner:    Home  Projects  Schedule  Time  More
Foreman:  Today  Crew  Field  Log  Time
Worker:   Today  Scope  Hours  Log
```

The role's tab bar is the cleanest expression of what they do. Owner = portfolio + workflow. Foreman = today's people + field intake. Worker = today's work, hours, photos.

### 4.2 Top-app-bar pattern

56px tall, back chevron + title + 1–2 trailing actions. On detail screens (`ProjectDetail`), the top bar becomes a 140px gradient hero (`linear-gradient(135deg, #E8A86B 0%, #C77B4F 100%)`) with translucent glass back/more buttons.

### 4.3 Workspace + project switcher

A single bottom sheet (70% max height) consolidates **workspace switching** (multi-LLC owners) and **project switching** in one surface. Three regions: Workspace list → Search → Pinned projects + All active.

This is clever for multi-LLC owners but mixes two mental models (org vs job) — flagged in open questions.

### 4.4 More tab

Section-grouped overflow for the owner:

- **Workflow** — Rentals, Measurements, Estimates, Crews
- **Workspace** — Settings, Pricing book, Integrations (QBO/Gusto/Stripe), Notifications
- **You** — Profile, Privacy & data, Help

Clients is also reached from "More" — agent flagged this as second-class IA worth reconsidering, given the CRM positioning.

---

## 5. Data model (from `design-canvas.jsx`)

The canonical data model. This is where to start when building the backend.

### 5.1 Entities

| Entity | Key fields | Notes |
|---|---|---|
| `scopeItems` | code, name, unit (sqft/lf), rate, color | The trade item catalog — EPS, BASE, FIN, STONE, AIRB, CMNB, ENV, CAULK, FLASH |
| `projects` | id, name, client, address, division, status (active/bid/closeout), bid, bid_psf, sqft_total, laborRate, **targetSqftHr**, bonusPool, progress, daysActive, crewSize, health (on-track/over-budget/pending), created, cover | targetSqftHr drives `suggestedHr` in schedule |
| `measurements` | per-project: id, code, notes, qty, unit, **points: [[x,y]…]** | Polygon vertices in 0–100 normalized coords for blueprint overlay |
| `workers` | id, name, role (Owner/Lead/Foreman/Crew), initials, clockedIn, hoursWeek, project, tone | `tone` is avatar color index |
| `workerRates` | per-worker: base, ins%, ben%, ot% | Loaded cost = base × (1 + ins% + ben%) + OT premium |
| `scheduleWeek` | days, assignments[] | Legacy single-week |
| `schedule4Week` | weeks[idx 0–3], assignments[] with week+day | **4-week look-ahead in data; UI only renders week 0** |
| `timeEntries` | worker, date, project, clockIn, clockOut, hours, source (auto/foreman/manual/reminder), **anomalies[]**, geo, scope, note | Anomaly flags: overtime, outside_geofence, no_clockout, manual_override, under_scheduled, duplicate |
| `dailyLogs` | project, foreman, submitted, weather, crewOnsite, crewHours, photos, scheduleHits, progress.sqft + pct, blockers, **narrative** | Narrative is the AI-drafted free-text field |
| `notifications` | kind, worker, project, when, title, body, requiresConfirm | Worker-flavored kinds in data; owner inbox surfaces a broader set |
| `catalog` | sku, name, category, daily, owned, replacement, **drift**, **idleDays**, lastCount | Drift = physical − system count; negative = system overcounts |
| `dispatches` | ticketId, sku, qty, project, sentOn, dueBack, status (out/overdue/returned), signedBy | Multiple lines grouped by ticketId (one truck, one signature) |
| `returns` | ticketId, sku, qty, returnedOn, **condition: {good, damaged, lost}**, charges, project, workOrder? | Damaged spawns a workOrder |
| `workOrders` | sku, qty, opened, returnId?, issue, estCost, status (open/in_repair/closed), assignee, closed? | Repair tracking |
| `billingCycles` | project, period, lines, amount, status (ready/review/pushed), dueOn | QBO push queue |
| `billingLines` | per-cycle: sku, qty, days, daily, amount, kind?: credit | Multi-line invoices, supports credits |
| `reservations` | sku, week, qty, project | Future commitments per SKU per week — forecasting curve **(data exists, no UI)** |
| `rentalSuggestions` | per-project: sku, qty, reason, already | Takeoff → SKU rule ("every 1000 sqft EPS → 8 scaffold + 24 planks") **(data exists, no UI)** |
| `syncQueue` | kind, entity, status, ts | Bidirectional QBO sync log |

### 5.2 Loaded labor formula

```
true_cost(worker, hours) = base × (1 + ins% + ben%) × hours
                         + base × ot% × overtime_hours
```

Worked example surfaced in `set-burden`:

- Base wage $38.00
- + Payroll tax (FICA/FUTA) $4.85
- + Workers' comp $3.42
- + Health + benefits $5.20
- + PTO accrual $1.55
- + Truck/tools per hr $1.18
- **= $54.20 / hr loaded**

The pedagogical callout: "Bidding at base $38/hr leaves you 30% short on margin."

### 5.3 Project lifecycle states

```
       ┌──────────────────────────────────────────────────────┐
       │                                                      │
       ▼                                                      │
  Drafting ──Send─→ Sent ──Accept─→ Accepted ──Start─→ In progress ──Complete─→ Done ──Invoice─→ Paid + Closed
       │           │                                                                              ▲
       └──Archive──┴─────────────────► Archived (loss reason captured)                            │
                                                                                                  │
       (Live margin tracked throughout; final margin lands at Paid)──────────────────────────────┘
```

- **"Project IS the estimate"** until accepted — same record, same URL, same activity log
- Required at create: **Client + Project type** (5 types: Fixed-bid / T&M / Service / Rental / Internal)
- Three create entry paths converge on the same sheet: Start blank, Templates (clone past), QBO pull (with dedupe match)
- Sharing the proposal **auto-transitions Drafting → Sent**
- Accepting opens the geofence setup + pre-kickoff checklist (Materials / Crew / Site setup / Approvals)
- **Archive (loss branch)** captures loss reason — feeds the AI moat

### 5.4 Status taxonomy is dual

Every project has two parallel statuses:

- **Lifecycle state** — Drafting / Sent / Accepted / In progress / Done / Paid / Archived
- **Health** — on-track / over-budget / pending / hot

The Projects list shows both ("Day 18 of 32 · 4 crew" vs "$1.2k over plan · 6 crew"). Filter chips bucket by **who owes the next action** ("Yours to move · 3 / Awaiting client · 2 / Closeout · 1") — not by state — which is a nicer affordance than typical state filters.

---

## 6. Major flows

### 6.1 Owner onboarding (10 steps + branches)

Source: `mb-screens-owner-ext.jsx`. Uses a shared `OnbShell` with progress bar `step/10`.

```
Sign up ───┬─→ Email magic link
           ├─→ Phone SMS (6-digit code)
           └─→ Apple / Google SSO
              │
              ▼
1.  Company          (name, logo; region & subdomain auto)
2.  Trade + crew     (multi-select trades, slider 1–50+)
3.  Hours + tz       (working days, start/end times; tz auto)
4.  Allow location   (geofence preview; "skip → manual clock-in")
5.  Connect QBO ─────┬──→ 6a. Agent setup (working state; ingests 1,284 txns)
                     │       │
                     │       ▼
                     │      7. Pricing review (118 high / 17 needs / 7 excluded)
                     │       ▼
                     └──→ 6b. Pricing template (regional starter book by trade)
              │
              ▼
8.  Invite team       (14 from QBO pre-selected; toggle Foreman / Worker)
9.  Allow notifs      (4 channels: tomorrow assignment / schedule change / approval / tips)
10. First project ────┬──→ Real project (name + address)
                      └──→ Sample project (Maple Lane Townhomes, read-only tour)
              │
              ▼
done. "You're in · took 1 min 48 sec"
+ 4 ambient tasks (payroll burden, geofence, Stripe, remaining QBO invites)
  — live in Settings → Setup, dismissible
```

**Key patterns:**
- Permissions deferred and contextualized (location is step 4, framed for auto clock-in; notifications is step 9, after data ingest so channels are concrete)
- AI is data-attributed throughout (`OnbAiBadge` reused: "Auto", "Auto-detected", "From QuickBooks", "Agent draft · review before approve")
- Confidence is exposed (pricing review surfaces high/needs/excluded counts; per-row dot indicators)
- Time-to-value claim ("1 min 48 sec") is aspirational; depends on QBO ingest speed

### 6.2 Project create

```
+ New ──┬─→ Start blank      → Client + Type → Drafting
        ├─→ Templates         → Clone past job → Client + Type → Drafting
        └─→ Pull from QBO     → Match modal → Link or Create new → Client + Type → Drafting
```

**QB dedupe** modal: typed name fuzzy-matched against QBO customer records ("You typed: Acme Holdngs — 92% match: Acme Holdings, LLC · 4 jobs · last invoice Mar 14"). Two CTAs: Link or Create new.

### 6.3 Drafting an estimate (blueprint canvas)

1. Upload elevations PDF; opens dark fullscreen canvas
2. Tools (right rail): Polygon / Subtract / Scale / Photo
3. Tap to set polygon vertices; orange = completed, blue dashed = in-progress
4. Each polygon tagged with a scope code (EPS, BASE, STONE, …) → quantity × scope rate → material line
5. `suggestedHr` derived from `targetSqftHr` on the project
6. Worksheet (internal cost→price) and Proposal (client view) are tabs on the same record
7. **Send** auto-transitions to Sent and opens the share sheet (PDF + 4 native share buttons)

### 6.4 Time tracking loop

```
Worker walks into geofence
   ├─→ Auto clock-in (success screen, 2-min undo affordance)
   └─→ Fallback: Manual clock-in (reason picker → foreman approves)
        │
        ▼
  Worker tracks scope, takes photos (auto-tagged by elevation + scope)
        │
        ▼
  Clock-out (success: hours, photos, steps, gross $)
        │
        ▼
  Foreman: Today's crew, edit times (In/Lunch/Out) → Submit week for owner approval
        │
        ▼
  Owner: TimeQueueAllProjects (cross-project) or ProjectCrewOwner (per-project)
        ├─→ Bulk "Approve N clean"
        └─→ Per-flag review (anomaly badges: overtime, outside_geofence, no_clockout, …)
        │
        ▼
  Approved entries roll up to billing + payroll
```

### 6.5 Daily log

Foreman drafts, owner reviews:

```
Auto-populated context (foreman side):
  - Weather (from API)
  - Crew on site + hours (from time entries)
  - Photos count (from worker LogPhoto, auto-tagged)
  - Schedule hits (from schedule assignments)
  - Progress (sqftDone / sqftPlanned / pct from measurements)

+ Foreman fills narrative:
  - MAiAgent surface drafts from "12 photos · 2 voice memos · clock-in data"
  - Foreman edits, adds blockers

→ Submit → Owner ForemanDailyLogReview screen
  - Approve / Reply / Forward to client
  - Surfaces flagged issues separately
```

### 6.6 Materials request (foreman → owner)

```
Worker flags blocker via wk-issue ("Out of EPS 1.5"")
  → Foreman Field tab inbox
     → ForemanMaterials sheet
        ├─→ Pull from yard + order rest (if under $400)
        ├─→ Order all from supplier (if under $400)
        └─→ Ask Sarah to authorize (auto-shown if > $400 limit)
              → Owner Approvals queue (OwnerAuthorizations)
                 - Approve / Modify / Reply / Deny
                 - Auto-escalates to phone after 30m
```

### 6.7 Rentals (catalog → dispatch → return → bill)

```
Catalog (filter Out/Available/Service)
  → Multi-select (Available only) → Dispatch sheet
     - One ticket (T-1042) groups multiple SKU lines under one signature
     - To: project + miles; When: pickup + expected return + duration
     - Cost preview: days × daily + setup/breakdown
  → Items now Out

QR scan ← physical asset tag
  → Recognized: SKU + current location + status
  → Mark returned / Move to another job / Open details

Return + condition
  - Photo step (auto-timestamped)
  - Condition checklist (good / damaged / lost split)
  - Damaged items spawn workOrder
  - Lost units trigger flat charge
  → Billing card sums days × daily + repair charges

Utilization (per-asset bar list)
  - Fleet utilization %
  - Underperformer callout: "Out only 5 of 30 days … Sell or list externally?"
```

### 6.8 Invoicing

```
Project hits Done → invoice draft generated
  - Contract + change orders + variance
  - "Already billed" milestone progress (e.g. 25/35/30/10 schedule)
  → Send → Stripe link
     → Synced to QuickBooks
        → Paid → final margin lands (gap from Done's projected to Paid's actual is unexplained — open Q)
```

---

## 7. AI / intelligence layer

Stringline's AI is **graded, attributed, and dismissible** — never a chatbot.

### 7.1 Where AI shows up

| Surface | Atom | What it does | Data source |
|---|---|---|---|
| Onboarding QBO ingest | `MAiAgent` | Drafts pricing book + team + projects from QBO | 12 months of QBO transactions |
| Onboarding pricing review | `MAttribution` | Per-row confidence dot, 118 high / 17 needs / 7 excluded | Above ingest + regional comps |
| Worksheet (Drafting) | `MSpark` strip | "Wall assembly is at $4.32/sf — your usual is $4.85. +$1,180 if applied" | Your past estimates |
| Proposal (Drafting) | `MSpark` strip | "Similar jobs over 2,500 sf have averaged 12% under actual" | Your closed jobs |
| New pricing item | `MSpark` card | "Two stucco shops in your region sell limestone veneer at $32.50/sf. Apply $32.50" | Regional cross-tenant comps |
| Schedule create | `MSpark` strip | "Suggesting 3 crew × 3 hours based on past pace at this elevation type" | Your scheduleHistory × measurements |
| Dashboard attention card | `MAiStripe warn` | "At risk · 18% over labor" + Why this card? + Open project | Live timeEntries vs scheduleHistory vs guardrails |
| Snooze sheet | (feedback) | "Not a problem twice in a row asks if the rule should change" | Implicit — tunes future alerts |
| Worker photo capture | `MSpark` banner | "EPS install · East elevation · auto-tagged" | CV / elevation + project context |
| Worker correction / time-off | `MSpark` text | SLA reassurance ("Ana reviews within ~2h") | n/a — automation, not AI |
| Foreman daily log narrative | `MAiAgent` | Drafts from 12 photos + 2 voice memos + clock-in data | Project-day context |
| Foreman chat | (system) | "Materials blocker · auto-attached" eyebrow on relevant messages | System tagging |
| Done state suggestion | `MSpark` card | "Across 4 similar jobs, your wall lines are averaging 4-6% over — bumping the rate to $5.10/sf would close the gap" | Your project history |
| Archive (loss) | `MSpark` card | "3 of your last 8 losses cited price" | Your loss-reason log |
| Rentals utilization | (warn callout) | "Out only 5 of 30 days. Sell or list externally?" | catalog.idleDays |
| Help search | input | "Ask anything — we answer with examples from your data" | RAG over your workspace |

### 7.2 The data moat, three layers

1. **Your own historical estimates vs actuals** — calibrates suggested prices, hours, productivity
2. **Your loss-reason log** — archived bids capture *why* they lost (Price / Timing / Lost to competitor / No response / Scope / Other), tunes future quoting
3. **Regional cross-tenant pricing comps** — "Two stucco shops in your region sell …" — requires aggregating across many tenants

This is a defensible position. The product gets smarter the longer you use it AND the more tenants are on it.

### 7.3 The feedback loop

Three explicit feedback mechanisms tune the AI:

- **Dashboard snooze** — dismissing an attention card with "Not a problem" twice in a row prompts to adjust the rule
- **Loss reasons on archive** — every lost bid captured
- **Foreman log review** — owner Approve / Reply / Forward edits feed back into narrative drafting

---

## 8. Cross-role handoffs

The product is fundamentally a **handoff machine**. Here's every event that crosses persona boundaries:

| Trigger | From | To | Surface | SLA / behavior |
|---|---|---|---|---|
| Manual clock-in (auto failed) | Worker | Foreman | Foreman Field tab | "Ana gets a ping to approve" |
| Auto clock-in success | Worker (geofence) | (none) | Worker Today | 2-min undo affordance |
| Worker blocker / issue | Worker | Foreman | Foreman Field tab → live timeline back to worker | Push notification |
| Materials request (under limit) | Foreman | (none) | Auto-confirmed | Notifies worker |
| Materials request (over $400 limit) | Foreman | Owner | Owner Approvals queue | Auto-escalates to phone after 30m |
| Hours correction | Worker | Foreman | Foreman week view | "Within ~2h" SLA |
| Foreman submits daily log | Foreman | Owner | Owner ForemanDailyLogReview | Approve / Reply / Forward to client |
| Foreman submits week | Foreman | Owner | Owner TimeQueueAllProjects + per-project | Bulk approve clean + per-flag review |
| Owner approves time | Owner | Foreman + Worker | Notifications | Time entries lock |
| Owner snoozes attention card | Owner | (AI rule engine) | Future alerts tuned | "Not a problem 2× in a row" prompts rule change |
| Owner broadcast | Owner | All field staff or Foremen or single project | Worker pinned banner on Today; Foreman Notifications tab | Push + SMS for urgent |
| Schedule change | Owner | Foreman + Worker | Notification, requires confirm | Worker sees on next clock-in |
| Time off request | Worker | Foreman | Notification + schedule auto-adjusts | "Ana gets a ping" |
| Safety stop (worker triggers) | Worker | Foreman + Owner | **Full-screen interrupt** | Single dominant Acknowledge CTA |
| Estimate share | Owner | Client | PDF + native share | Auto state → Sent; read tracked |
| Invoice send | Owner | Client | Stripe payment link | Synced to QBO |

The `ProjectActivityLog` (`mb-screens-foreman-ext.jsx:329`) is the unified record of these — single audit trail, role-color-coded (Owner blue / Foreman amber / Worker neutral), edit-gated by role.

---

## 9. Per-section quick reference

### Sign in (2 screens)
- Default: email + password with Apple/Google SSO + magic-link fallback + forgot password
- Magic-link sent screen with masked email, 15-min expiry, resend
- No SMS at sign-in (only at sign-up)
- "switch workspace" link implies multi-LLC selector elsewhere

### Navigation (4 screens)
- Bottom tabs (5) — Owner only; foreman/worker have different tab bars
- Top app bar (56px standard, 140px gradient hero on detail screens)
- Workspace + project switcher in one sheet
- More tab with section grouping (Workflow / Workspace / You)

### Owner home (5 screens)
- 3 dashboard variants: caught-up / 1 thing needs you / triage (3+ items)
- Attention card uses `MAiStripe` with warn tone
- Snooze sheet (4 options, feedback loop to rule engine)
- OwnerAuthorizations approval queue (Materials / Time-OT / Equipment filter)
- *Three are separate components, not states of one* — consolidate during build

### Projects lifecycle (22 screens — biggest section)
- States: Drafting / Sent / Accepted / In progress / Done / Invoice / Paid + Archived
- Same `ProjectHeader` across all states; `totalLabel` swaps (Estimate → Contract → Spent → Final)
- Tab system per project: Overview / Estimate / Crew / Schedule / Time / Files / Activity
- Blueprint canvas with polygon takeoff
- Geofence setup at Accept
- Owner vs foreman crew views (approval vs CRUD)
- Live-vs-budget defaults to portfolio view
- Files: 40 photos auto-tagged by elevation + scope (AI)
- Loss reasons captured on archive

### Clients (2 screens)
- 14 total, lifetime $, leads warm count
- Per-client: KPI (Lifetime / Active / Avg margin); 4 tabs (Projects / Contacts / Invoices / Notes)
- Reached via "More" — agent flagged as second-class IA

### Notifications (2 screens)
- Inbox: kind-icon-coded, filter chips (Approvals / Schedule / Field / Money), grouped by recency
- Broadcast compose: 3 audience options (All field / Foremen only / Single project), 3 types (Heads-up / Urgent / Holiday), char-limited

### Schedule (5 screens)
- Day stream (foreman default), Week capacity (owner default)
- 4-week look-ahead in data — only week 0 renders
- Assignment states: confirmed / sent / pending / declined — only confirmed + pending get distinct visual treatment
- Edit-on-tap is a sheet of canned actions, not inline editing
- Empty state: 3-step indicator + AI hint about pre-filling from takeoff + capacity

### Time approvals (1 screen)
- Cross-project queue grouped by project
- Bulk "Approve N clean" + per-flag review
- Anomaly array collapses to single flag UI (data has multiple flags per entry)
- Project-scoped variant lives in `ProjectCrewOwner` (owner approval) / `ProjectCrewForeman` (foreman CRUD)

### Rentals (6 screens)
- Catalog → Multi-select → Dispatch (one ticket groups multiple SKUs by signature)
- QR scan resolves to SKU + location, offers return/transfer/details
- Return: photo + condition checklist (good/damaged/lost), spawns workOrder if damaged
- Utilization: per-asset bar, fleet KPI, underperformer callout
- **Rental suggestions data exists per-project, no UI surface yet**
- **Reservations forecast curve exists in data, no UI surface yet**
- **Drift and lastCount are in data, not surfaced**

### Settings (12 screens)
- Header card + "Finish workspace setup" progress + 3 sections (Workspace / Integrations / Account)
- Pricing book: tabs Materials/Labor/Equipment, margin pills (green ≥40 / amber ≥35 / red below), AI suggestions
- Team: 5 visible roles (Owner / Estimator / Office mgr / Foreman / Crew), permissions matrix has only 3
- Working hours: tz, days, OT after 40h, auto-deduct break, grace ±10 min, holidays
- Estimates defaults: cover note with tokens, auto-nudges, PDF settings, auto-numbering
- Loaded labor: 6-component breakdown viz — **read-only, no editor**
- Connect vendor: QBO / Gusto / Stripe / Xero / Calendar — no rental-yard or supplier connectors
- Permissions matrix: 3 system roles × 11 capabilities
- Help: AI search "answer with examples from your data" + human channels

### Worker app (16 screens)
- Dark theme: bg #0e0c0a, text #f3ecdf, accent #d9904a
- 4 tabs: Today / Scope / Hours / Log
- One decision per screen, glove-friendly buttons (50–54px)
- Auto + manual clock-in with reason picker; clock-out shows day's contribution
- Issue flagging with live status timeline + "what can I do while waiting?" calming option
- Hours week + correction sheet + time off (all bottom sheets ping foreman)
- Photo log auto-tagged by elevation + scope
- Notifications (4 kinds), Profile with pay summary
- **Worker AI is invisible & helpful, not analytic** — no `MAttribution`, no `MAiStripe`
- **Foreman is named (Ana)** in every ping flow — humanizes the loop

### Foreman app (20 screens)
- Light theme, denser than worker
- 5 tabs: Today / Crew / Field / Log / Time
- Today is **stacked multi-site cards** (not tabs), with primary site highlighted
- Field tab is the novel UX: combined inbox + triage + chat (chat is a Field sub-surface)
- Brief crew (scope picker + goal + step plan + voice memo) → Preview shows worker's dark Scope verbatim
- Daily log narrative uses `MAiAgent` (drafts from 12 photos + 2 voice memos + clock-in data)
- Materials request with 3 fulfillment options; over-$400 routes to owner
- Crew map with live GPS pins — no on-screen privacy framing
- **Intentionally walled off from money** — no margin/cost numbers on project detail

### System states (8 screens)
- Splash: dark canvas, SL logo, "Syncing 18 projects · offline ready"
- Offline: dark banner with queued items, "4 changes will sync"
- Error: red-soft tile, error reference code, "data still saved" reassurance
- Empty: dashed terracotta illustration, "+ New project" + "Import from QuickBooks"
- Loading: layout-true skeleton mirroring real screen (no jarring shift)
- Permission denied (location): amber tile, "Open settings / Continue without"
- Stale (new version): blue refresh icon, "Reload now / Read what's new"
- **Safety interrupt: full-bleed deep red, hatch pattern, pulsing pill, single Acknowledge CTA** — the only "alarm" pattern, deliberately unlike everything else

---

## 10. Open questions / inconsistencies (consolidated punch list)

A working list of items to resolve before/during build.

### Branding
- **PNG screenshots render "Sitelayer"** while source is renamed to "Stringline". When we rebuild the app, branding will be correct from the start; the PNGs are stale visual artifacts.

### Data model gaps
- **Owner notifications schema is thin** — `notifications` array in data has only 4 worker-flavored kinds (assignment_new / assignment_moved / clock_warning / approval_needed); owner inbox shows 7+ kinds. Need to extend.
- **Guardrails / snooze state not modeled** — dashboard refers to rules ("flag when labor > 15% of plan") and snooze actions ("snooze until Friday") but no schema for rules or snooze persistence.
- **Change orders unmodeled** — Paid invoice shows "change orders +$4,250" but no schema for change orders.
- **Loss reasons** — captured in UI (`mb-screens-create.jsx` Archive sheet) but no schema field on `projects` in the data file.

### UI gaps (data exists, no surface)
- **`schedule4Week`** has 4 weeks of data, UI only shows week 0 — no pagination.
- **`rentalSuggestions`** per-project takeoff→SKU mappings exist in data; no AI suggestions card in Rentals.
- **`reservations`** forecast curve exists in data; no UI on Utilization.
- **`catalog.drift` and `catalog.lastCount`** in data; not surfaced on Catalog or Utilization.
- **`condition: {good, damaged, lost}`** split in returns data; Return UI flattens to single message.
- **`anomalies[]`** is an array; Time queue UI renders only the first flag per entry.

### Implementation notes
- **Three dashboard variants** (`DashboardPM`, `DashboardCalmDefault`, `DashboardCalmFiltered`) are separate components. Comment in source implies they should be modes of one — consolidate.
- **`WorkerHoursWeek` is light-themed** while every other worker screen is dark — port to dark theme for consistency.
- **`WorkerTabsLocal` vs `WorkerTabs`** — possible naming drift.
- **`TimeForemanEntry` lives in `mb-screens-3.jsx`** (Schedule section) but logically belongs in Section 12 (Foreman) — source has a comment acknowledging this.
- **`TimeApprovalQueue` was deleted** in favor of `TimeQueueAllProjects` + `ProjectCrewOwner` — confirm all callers were rewired.

### Design / UX questions
- **Permissions matrix has 3 system roles; Team labels 5** (Estimator + Office mgr collapse to Owner-tier with overrides "coming later"). Should the matrix expose all 5 from day 1?
- **No "I'm running late" affordance** before clock-in — workers either auto-clock or manual-clock; if stuck in traffic, only signal is delayed auto-clock.
- **No offline state for workers** — `MI.wifioff` exists but no worker screen handles "saved offline, will sync." Critical for jobsites with bad signal.
- **Crew map has no on-screen privacy framing** — geofence permission screen has it, but `ForemanCrewMap` doesn't restate.
- **Clients are reached via "More"** — second-class IA given CRM positioning. Consider promoting.
- **Workspace + project switcher in same sheet** — mixes two mental models (org vs job).
- **OwnerBroadcast targeting is shallow** — All field / Foremen only / Single project. No "specific role on a project" or "specific crew."
- **Activity log is project-scoped only** — no cross-project firmwide view, no role-pivoted "what did Ana do this week."
- **Approvals queue and calm-filtered "5 to approve" card** are two paths to the same thing — clarify tap-through model.

### Settings questions
- **Burden screen is read-only** — no editable inputs for ins% / ben% / OT% / truck-tools. Where do these get configured? Per-worker on Team member sheet (which only shows base rate + OT multiplier)?
- **No tax / overhead / default margin field** in Estimates defaults.
- **No rental yard or supplier integration** in Connect catalog — despite Rentals being a first-class section.

### Finance questions
- **Done margin (33%) vs Paid margin (36.4%) gap** unexplained — likely retainage release, last-minute change orders, or final labor true-up. Surface the diff?
- **Net-pay reveal** on Worker Hours ("~$985 take-home") — jurisdiction-dependent, flag for finance review.
- **Foreman spending limit ($400)** is hard-coded — should be a Settings field.

### Domain questions
- **AB regional positioning** — Mountain Time, Canadian holidays, AB pricing comps. Is this the launch market only or built-in?
- **"Auto-tag photos by elevation + scope"** depends on knowing the elevation. How does the worker associate a photo with elevation? GPS proximity, manual tap, or pure ML?

---

## 11. Recommended next steps (for build)

Not prescriptive — just a starting point.

1. **Pick the stack.** Suggestion: Next.js + TypeScript + Tailwind + Prisma + Postgres for full-stack, OR React Native + Expo if we lean mobile-native. The designs are mobile-first PWA-ish (the index references `Mobile.html` and PWA splash) — Next.js PWA is the lowest-friction path.
2. **Port the data model.** `design-canvas.jsx` is the schema. Convert to Prisma (or equivalent) — entities are well-shaped, just need FK relations made explicit.
3. **Port design tokens.** Convert `tweaks-panel.jsx` `:root` vars to Tailwind theme extension.
4. **Build the primitives library.** `MTopBar`, `MRow`, `MKpi`, `MPill`, `MBottomTabs`, plus the AI atoms (`MSpark`, `MAttribution`, `MAiEyebrow`, `MAiStripe`, `MAiAgent`). These are reused across every screen.
5. **Build the three tab bars** (`MBottomTabs`, `ForemanTabs`, `WorkerTabs`) — they're the IA spine.
6. **Build the Project entity end-to-end** before any other vertical. The lifecycle states + dual status taxonomy + Worksheet/Proposal tabs are the most complex pattern; everything else attaches to it.
7. **Defer** the AI/data-moat features — implement the primitives but stub the data. The product is usable without the suggestions; the moat comes online after you have data.
8. **Defer** the cross-tenant comp pricing — this requires multiple tenants and a separate aggregation pipeline.

---

## 12. References

- **Visual index:** `designs/index.html` — 14 sections, 121 artboards, with the canonical screen IDs and component names
- **Data model:** `designs/source/design-canvas.jsx` — `window.STRINGLINE_DATA`
- **Design tokens:** `designs/source/tweaks-panel.jsx` — `:root` vars + all `.m-*` styles
- **Primitives library:** `designs/source/mobile-tokens.css` (yes, the `.css` file; it's actually JSX)
- **Filename → content map:** §2 above

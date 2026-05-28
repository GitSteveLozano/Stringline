# Stringline V2 — design read-through

A thorough walk-through of the **V2 "master flow"** redesign at `designs/v2/`. V2 is a complete redesign that **replaced V1** (deleted from the repo). It was built specifically to close the punch list from the V1 analysis, and it also rethinks the product around a new Estimator persona and an AI-forward estimating canvas.

Synthesizes the 12 source modules + the full stylesheet into one reference, organized so we can refer back as we build.

---

## 1. Executive summary

**Stringline V2** is a mobile-first app for construction subcontractors (exterior cladding: EIFS, stucco, masonry, siding; Alberta market). Same domain as V1, materially evolved.

### What changed from V1

| Dimension | V1 | V2 |
|---|---|---|
| **Brand** | Warm sand + terracotta `#d9904a`, Geist, soft shadows/rounded | **Editorial/brutalist**: yellow `#FFD400` on sand `#EDE7DA`, **hard 2px black borders**, no radii, no shadows. Inter Tight + Inter + JetBrains Mono |
| **Personas** | 3 (Owner, Foreman, Worker) | **4** — adds **Estimator** (takeoff/bid desk) |
| **Role model** | Fixed roles per login | **"Wearing" hat-switcher** — one person can hold multiple roles and switch views; **custom roles** with inheritance |
| **Estimating** | Manual polygon takeoff on a blueprint | **PlanSwift-class AI takeoff**: plan ingest → auto scale-detect → AI auto-takeoff + auto-count with HIGH/MED/LOW confidence and exception-based review |
| **Owner nav** | Home/Projects/Schedule/Time/More | Home/Projects/**Money**/Team/More |
| **Format** | Static PNG artboards | Live interactive standalone bundle (readable JSX) |

### V2's defining design choices

1. **Brutalist/editorial visual system** — hierarchy comes from 2px-vs-1px rule weight, the yellow block, and type scale, not depth. "No grays. Hard edges." Mono type is used for all labels/data (instrument-readout feel).
2. **"Wearing" role model** — a real product feature: a solo operator wears all 4 hats and switches; the app reshapes per role. Pill lives top-right of every app bar.
3. **AI estimating with a strict human-in-the-loop contract** — nothing is trusted until verified; AI output is always a DRAFT; review is exception-based (confident items pass, only flagged/low-confidence demand a tap). Confidence is tri-level HIGH/MED/LOW everywhere.
4. **`V2SchemaSpec` is a literal backend contract** — the designer specced the three critical schema gaps (Guardrail+Snooze, ChangeOrder, LostReason) as a screen.
5. **Money is now first-class for the owner** (dedicated tab) and **walled off from the foreman** (soft "denied" screens route spend decisions to the owner) — though this wall leaks (see §11).
6. **Per-persona everything** — separate notification kinds, status bars, and tab bars per role.
7. **Alberta-specific** — WCB Alberta comp codes, Canadian holidays, Mountain Time, regional pricing.

---

## 2. Reading the codebase: filename → content map (V2)

Source is readable JSX in `designs/v2/source/`. Module names were assigned by content (the bundle stripped originals). All components are prefixed `V2*`.

| File | Components (sections) |
|---|---|
| `system-states.jsx` | `V2SbLight`, `V2SbDark`, `V2StateSplash`, `V2StateOffline`, `V2StateError`, `V2StateEmpty`, `V2StateLoading`, `V2StatePermDenied`, `V2StateStale`, `V2StateSafetyInterrupt` |
| `auth-onboarding.jsx` | `V2SignIn`, `V2MagicLinkSent`, `V2OnbCompany`, `V2OnbCrewSize`, `V2OnbIntegrations`, `V2OnbReady`, `V2WorkerInvite`, `V2ForemanInvite`, `V2EstimatorInvite`, `V2ForemanFirstRun`, `V2RoleSwitcher`, `V2WearingPill`, `V2WearingDemo` |
| `owner.jsx` | `V2OwnerTabs`, `V2OwnerDashboardCalm`, `V2OwnerDashboardAttention`, `V2OwnerProjects`, `V2OwnerProjectInProgress`, `V2OwnerProjectAtRisk`, `V2OwnerMoney`, `V2OwnerApprovals`, `V2OwnerTeam`, `V2OwnerMore`, `V2OwnerNewProject` |
| `estimator-canvas.jsx` | `V2EstHome`, `V2EstTabs`, `V2EstNewProject`, `V2EstPlanIngest`, `V2EstScaleAuto`, `V2EstScaleManual`, `V2EstCanvasManual`, `V2EstCanvasAutoDetect`, `V2EstAutoTakeoffReview`, `V2EstAutoCountReview`, `V2EstItemPicker`, `V2EstItemAttached`, `V2EstSummary`, `V2EstSheetNav`, `V2EstSheetRef`, `V2EstPdfPreview`, `V2EstSendClient` (+ deprecated `V2EstClientProfile` shim) |
| `flows-ai-budget-co-invoice.jsx` | `V2AILaunchChooser`, `V2AITakeoffSetup`, `V2AICountSetup`, `V2LinHeightCapture`, `V2EditMeasurement`, `V2BulkSelect`, `V2PriceAndSend`, `V2BudgetTab`, `V2ChangeOrderNew`, `V2ChangeOrderDetail`, `V2InvoiceCreate`, `V2InvoiceSent`, `V2RecoveryPlan`, `V2PostMortem`, `V2IngestFailure`, `V2ScheduleEditSheet`, `V2GenericBlockerResolve`, `V2ForemanTimeApprove` |
| `foreman.jsx` | `V2ForemanTabs`, `V2ForemanToday`, `V2ForemanTodayQuiet`, `V2ForemanField`, `V2ForemanFieldEmpty`, `V2ForemanBriefCrew`, `V2ForemanBriefPreview`, `V2ForemanCrew`, `V2ForemanCrewByPerson`, `V2ForemanCrewMap`, `V2ForemanDailyLogDraft`, `V2ForemanDailyLogSubmitted`, `V2MaterialsRequest` |
| `worker.jsx` | `V2WorkerTabs`, `V2WorkerToday`, `V2WorkerTodayPreClockIn`, `V2WorkerTodayOff`, `V2WorkerClockInSuccess`, `V2WorkerClockInManual`, `V2WorkerClockOutSuccess`, `V2WorkerScopeToday`, `V2WorkerScopeDone`, `V2WorkerHoursWeek`, `V2WorkerLogPhoto`, `V2WorkerIssue`, `V2WorkerIssueEmpty` |
| `settings.jsx` | `V2SettingsHome`, `V2SettingsPricing`, `V2SettingsBurden`, `V2SettingsHours`, `V2SettingsIntegrations`, `V2SettingsInvite`, `V2SettingsNotifications`, `V2SettingsProfile`, `V2SettingsRoles`, `V2SettingsHelp` |
| `comms.jsx` | `V2NotifOwner`, `V2NotifForeman`, `V2NotifWorker`, `V2ChatList`, `V2ChatThread`, `V2Broadcast`, `V2ActivityLog`, `V2ClientProfile` |
| `rentals.jsx` | `V2RentCatalog`, `V2RentScan`, `V2RentDispatch`, `V2RentReturn`, `V2RentAsset`, `V2RentService`, `V2RentUtilization` |
| `schedule-time-clients.jsx` | `V2ScheduleWeek`, `V2NewAssignment`, `V2TimeApprovals`, `V2SnoozeSheet`, `V2ClientsList`, `V2ProjectState` |
| `gap-closers-schema.jsx` | `V2SchemaSpec`, `V2ChangeOrder*` helpers, `V2ProjectLost`, `V2StateOfflineWorker`, `V2BurdenLineEdit`, `V2CustomRoleEditor`, `V2CrewRowMultiAnomaly`, `V2PricingItemEdit`, `V2ForemanDenied`, `V2WearingAppbarDemo` |

- `designs/v2/standalone.html` — runnable self-contained bundle (the source of truth; embeds React + fonts + all modules)
- `designs/v2/styles.css` — the full design-system stylesheet (`:root` tokens + 29 `.v2-*` component classes, 197 rules)

**Branding note:** source still says "Sitelayer"/"SL" in places (`styles.css:860`, splash wordmark, `help@sitelayer.co`, `SLR_` error prefix). Product is **Stringline**; rename happens when we build.

---

## 3. Design system foundations

### 3.1 Tokens (`styles.css:865-890`)

```
Surfaces:  sand       #EDE7DA   sand-2  #E0D8C5   sand-soft #F4EFE3
Ink ramp:  ink        #0F0E0C   ink-2 #2E2A23   ink-3 #5F584C   ink-4 #8B8474
Lines:     line       #0F0E0C (= ink)           line-soft #C8C0AC
Accent:    accent     #FFD400 (single)          accent-ink #1F1900 (text on yellow)
Semantic:  good       #1A8A4C   bad #C7331E   warn #C58A14
Type:      Inter Tight (display) · Inter (body) · JetBrains Mono (labels)
```

Philosophy is explicit in source: **"No grays. Hard edges."** Warm ink ramp instead of neutral gray. **2px solid ink borders** on every container (card/button/tile/appbar/bottombar); inner separators drop to 1px soft. **No border-radius, no box-shadow** in the component layer. Hierarchy = rule weight + the yellow block + type scale.

### 3.2 Primitive class inventory (`.v2-*`)

- Layout: `.v2`, `.v2-screen` (+ `.dark` modifier → ink bg / sand text), `.v2-pad`, `.v2-stack`/`-tight`/`-loose`, `.v2-row-spread`, `.v2-flex-1`
- Chrome: `.v2-appbar` + `.v2-appbar-title`, `.v2-iconbtn` (+ `.accent`), `.v2-bottombar` + `.v2-bottombar-tab` (+ `.active`)
- Type: `.v2-h1` (Tight 800/40), `.v2-h2` (700/26), `.v2-h3` (600/19), `.v2-body`, `.v2-quiet`, `.v2-mono`, `.v2-bignum` (Tight 800/84, tabular, `.unit` span), `.v2-eyebrow` (mono uppercase 11px; `.accent` = yellow chip)
- Surfaces: `.v2-card` (+ `.accent`), `.v2-row` (64px min, lead slot), `.v2-tile` (110px min; `.accent`/`.dark`/`.danger`), `.v2-section-bar`
- Bits: `.v2-rule` (2px) / `.v2-rule-soft` (1px), `.v2-btn` (+ `.primary`/`.ghost`/`.danger`, 56px min), `.v2-pill` (+ `.live`/`.good`/`.bad`/`.dot`), `.v2-status-block`

### 3.3 Theming

- **Light/sand is default** (Owner, Foreman, Estimator).
- **Worker app is dark** (`.v2-screen.dark`): ink field, sand text, yellow accent preserved (sun-glare / glove-friendly rationale from V1 retained). **Exception: `V2WorkerHoursWeek` is still light-themed** — a V1 bug carried forward.
- **Full-bleed color moods** (3): sand (default), ink (dark/worker), and alarm/announce — **yellow** (splash, stale/new-version) and **red** (Safety Interrupt only).

### 3.4 Typography mechanics

Three families with strict roles: **Inter Tight** = display only (h1/h2/h3, app-bar title, bignum, logo — heavy 700–900, tight tracking down to −0.035em). **Inter** = body/buttons. **JetBrains Mono** = ALL labels (eyebrows, pills, tab labels, status-bar clock, error codes, timestamps, stat captions — uppercase, 9–12px, +0.04–0.12em). The mono-for-labels choice is the signature move: micro-copy reads as a machine/instrument readout (`SLR_504`, `0:24` timer, `STOP WORK · LIVE`).

---

## 4. Information architecture

### 4.1 Per-persona tab bars

```
Owner:      HOME    PROJECTS  MONEY    TEAM   MORE      (approvals badge rides on TEAM)
Estimator:  PROJECTS QUEUE    CLIENTS  LIBRARY MORE     (QUEUE badge = AI jobs in flight)
Foreman:    TODAY   CREW      FIELD    LOG    TIME      (FIELD badge = unresolved pings)
Worker:     TODAY   SCOPE     HOURS    LOG
```

Notable shifts from V1: owner loses **Schedule** and **Time** as tabs (now folded into projects/team), gains **Money**. Approvals has no tab — it hangs off the Team badge (semantically odd; flagged). Estimator's nav is entirely takeoff-centric (Queue = AI jobs, Library = CSI item catalog).

### 4.2 The "Wearing" role model

A real feature, not a demo toggle:
- **`V2WearingPill`** — mono "WEARING {ROLE} ▾", top-right of every app bar (after title, before menu). Auto-hides for single-role users.
- **`V2RoleSwitcher`** — bottom sheet: OWNER (Business·Money·Approvals) / ESTIMATOR (Takeoff·Bids·Clients) / FOREMAN (Crew·Briefs·Daily Log) / CREW (Clock·Scope·Log). "You wear 4 hats… the app reshapes around the role."
- Solo onboarding seeds all 4 hats. Role IDs: UI shows "CREW" but the id is `worker` — keep that mapping consistent.

### 4.3 Custom roles

`V2CustomRoleEditor` + `V2SettingsRoles`: **4 built-in roles** (Owner/Estimator/Foreman/Crew, up from V1's 3) plus **custom roles that inherit from one base** and add **additive toggles** with parameterized thresholds: AUTH MATERIALS up to `$X`, EDIT PRICING BOOK on/off, APPROVE OT up to `Nh`, CREATE PROJECT on/off. Permission matrix = 8 actions × 4 roles; STOP WORK locked on for all.

---

## 5. The Estimator persona + AI takeoff (the headline of V2)

Positioned as a **"PlanSwift-class takeoff — mobile-first, AI-forward."** This is the biggest net-new area.

### 5.1 The estimating pipeline

```
V2EstHome (projects: DUE TODAY / AI READY / IN PROGRESS / DRAFT)
  → V2EstNewProject (client-first, step 1/3)
  → V2EstPlanIngest (step 3/3): upload PDF → AI pipeline:
       PDF uploaded → 22 sheets detected → cross-sheet refs linked
       → scale auto-detect → scope pre-classify (EPS/base/stone/plumbing)
       (failure path: V2IngestFailure — no-text-layer/scanned/corrupt/>200MB)
  → SCALE GATE (hard): V2EstScaleAuto (per-sheet detected scale + HIGH/MED/LOW
       confidence; "quantities won't be trusted until every sheet verified";
       Open Takeoff DISABLED until all verified) / V2EstScaleManual (2-tap +
       real length → ratio, PROVISIONAL until verified)
  → THE CANVAS:
       V2EstCanvasManual    — POLY/RECT/LIN/PT tools, draggable vertices,
                              window cut-outs (deduct), loupe magnifier
       V2EstCanvasAutoDetect — TAP tool: AI pre-fills regions; tap to flood;
                              low-conf regions render red/dashed w/ coaching
                              ("add a cut-line to seal it"); INSIDE/CENTER/
                              OUTSIDE measurement-reference toggle (EIFS)
  → AI RUN: V2AILaunchChooser (Count one thing everywhere | Draft whole takeoff)
       V2AICountSetup  — pick symbol, sensitivity STRICT/NORMAL/LOOSE, sheets,
                         "RUN · scan 4 sheets · ~30s"
       V2AITakeoffSetup — measure targets (EPS net area @ 8ft, basecoat=match EPS,
                         stone=hatch footprint, window/door=deduct), "~3m"
  → REVIEW (exception-based):
       V2EstAutoCountReview  — 214 found = HIGH 196 / MED 14 / LOW 4; dots on
                              canvas (yellow=confident, red ?=low); "REVIEW 4 ·
                              APPROVE 210" (approve-all-minus-flagged)
       V2EstAutoTakeoffReview — "drafted in 42s", per-item confidence, "ACCEPT DRAFT"
  → EDIT: V2EditMeasurement (reassign/edit-geom/duplicate/delete), V2LinHeightCapture
       (trace LF × height → SF live), V2BulkSelect (rubber-band, bulk reassign/delete)
  → ITEMS: V2EstItemPicker (CSI codes — 09 24 00 EPS, 04 73 00 stone — search +
       category), V2EstItemAttached (item = ASSEMBLY: fans qty to priced parts;
       EPS board + basecoat + mesh + labor hrs → subtotal)
  → V2EstSummary (all verified ✓) → V2EstPdfPreview (PLAN ONLY / WITH TAKEOFF) →
       V2EstSendClient (private share link, auto-attaches deliverable to client profile)
```

### 5.2 The human-in-the-loop contract

- AI work is always **badged** with an accent eyebrow (`AI · AUTO-TAKEOFF`, `AI AUTOSCALE`, `AI · TAP TO DETECT`).
- **Confidence is tri-level HIGH/MED/LOW**, surfaced per-sheet, per-item, per-count-mark, with numeric splits.
- **Nothing is trusted until verified** — the scale gate literally disables the takeoff button until every sheet is verified.
- AI output is **always a DRAFT** ("ACCEPT DRAFT").
- Review is **exception-based** — confident items pass silently; only flagged/low-confidence items demand a tap.
- Low confidence renders **red with actionable coaching**, not just a warning.
- **Timing transparency** ("drafted in 42s", "~30s", "~3m").

### 5.3 Estimating → bid handoff

The Estimator's deliverable is the **takeoff/quantities** (sent via `V2EstSendClient`). **Pricing/margin is a separate step** — `V2PriceAndSend` (owner/bid desk): internal YOUR COST → MARGIN slider (34%) → SELL TOTAL, with a "CLIENT SEES" transparency toggle (quantities locked on, cost/line-prices off, one sell total on). This sell total + margin becomes the basis for change-order pricing, invoice contract value, and post-mortem target.

---

## 6. Data model

### 6.1 The schema spec (the backend contract — `V2SchemaSpec`)

The designer specced the three critical V1 gaps directly:

```
Guardrail (+ Snooze)
  id · projectId · type(MARGIN|SCHEDULE|SAFETY) · threshold · currentValue
  · status(ARMED|TRIGGERED|SNOOZED|MUTED) · snoozedUntil · mutedReason

ChangeOrder (project addendum)
  id · projectId · number · description · valueDelta
  · status(DRAFT|SENT|ACCEPTED|REJECTED) · createdBy · approvedBy

LostReason (enum + freeform)
  PRICE | TIMING | SCOPE | GHOSTED | COMPETITOR | OTHER · note(optional)
```

### 6.2 Other entities implied by V2 screens

V1's data model (`design-canvas.jsx`, now deleted) still describes most core entities — projects, measurements, workers, scheduleWeek/schedule4Week, timeEntries (with anomalies[]), dailyLogs, catalog, dispatches, returns, workOrders, billingCycles, billingLines, reservations, rentalSuggestions, syncQueue. V2 adds/implies:

- **Estimate/Takeoff** — sheets, per-sheet scale + confidence, measurements with scope/CSI code + confidence + reference (inside/center/outside), AI count results (symbol, sensitivity, per-mark confidence)
- **Item/Assembly** — CSI code, unit, parts breakdown (each priced), labor multiplier, status (Active/Seasonal/Retired), cost history
- **Burden** (now editable, global crew-average): base wage + payroll tax % + workers comp % (WCB code) + health/benefits + PTO + overhead alloc → loaded $/hr
- **Invoice + Milestones** — contract value, up to 3 milestones (deposit/progress/final), Stripe link, dunning timeline state
- **Role / CustomRole** — base role + additive capability toggles + thresholds
- **Notification** — per-persona kinds (owner: AUTH/RISK/LOG/PAID; foreman: BLOCKER/CREW/SCHEDULE/AUTH; worker: NEXT/BRIEF/PAY/LOG)

**Schema gaps that remain unmodeled** (UI exists, no entity specced): post-mortem learning ("EPS labor ran 15% over → +12% buffer"), invoice/milestone persistence.

### 6.3 Project lifecycle (`V2ProjectState` — state machine)

A single state-driven screen switches the whole view across `DRAFTING → SENT → ACCEPTED → (PROGRESS) → PAID`, with a 5-step lifecycle strip. SENT inverts to full-bleed yellow. Margin label flips EST→actual at PAID. **Bug: `PROGRESS` is in the lifecycle strip but missing from the component's `states` map** — a project in progress has no detail screen via this component.

---

## 7. Major flows

### 7.1 Owner onboarding (4 steps — down from V1's 10)

```
Sign in (Apple / Google / Email magic / Phone SMS)  ·  "CREATE COMPANY" for new owners
  1. Company   — name + trade (pre-filled, STUCCO default)
  2. Crew size — JUST ME·SOLO / 2-5 / 6-15 / 15+ (SOLO → "wear all 4 hats")
  3. Integrations (optional) — QBO (books/invoices/pricing), Gusto (payroll/burden),
       Stripe (payments — the one outbound), Xero. PULL not push. Skippable.
  4. Ready — checklist; CREATE FIRST PROJECT (only required action)
```

Dramatically simpler than V1: 4 steps, heavy pre-fill, one required field.

### 7.2 The four invites

- **Foreman** (light): "run the crew", phone pre-filled, ACCEPT · SET PASSWORD
- **Worker** (dark): minimal — "auto clock-in · tap to flag · daily photos / nothing else to learn", SEND ME A CODE (SMS, passwordless)
- **Estimator** (NEW, light/yellow): "ingest plan sets · run takeoffs (AI assisted) · deliver PDFs", ACCEPT · SET PASSWORD
- No **Owner** invite (owners self-serve via CREATE COMPANY)

### 7.3 Money lifecycle

```
Bid:       V2PriceAndSend (cost → margin slider → sell total; client-sees toggle)
Live:      V2BudgetTab (per-line bid/spent/% with on/risk/over bars;
           "77% SPENT · 62% COMPLETE · MARGIN 32%" reconciliation row)
At-risk:   V2OwnerProjectAtRisk → V2RecoveryPlan (AI ranks 3 actions w/ $ + margin%
           impact; "ALL 3 = recovers to 32% · NOTHING = -18% at close")
Change:    V2ChangeOrderNew → V2ChangeOrderDetail (DRAFT→SENT→ACCEPTED→REJECTED;
           accepted → "PROCEED · ADD TO BUDGET")
Bill:      V2InvoiceCreate (milestone/progress billing, Stripe link) → V2InvoiceSent
           (auto-dunning timeline) → mark paid
Close:     V2PostMortem (bid vs delivered by line; AI "next time" buffer rule)
Lost:      V2ProjectLost (reason enum + note → win-rate analytics)
```

### 7.4 Time tracking & approval

Worker clocks in (auto-geofence `V2WorkerClockInSuccess` or manual `V2WorkerClockInManual` with reason → Ana approves) → Foreman first-line approval (`V2ForemanTimeApprove`: bulk approve clean, review flagged, "SEND TO MIKE") → Owner finalizes payroll. Multi-anomaly entries render as stacked chips (`V2CrewRowMultiAnomaly`, foreman-facing).

### 7.5 Field → materials → owner

Worker blocker → Foreman **Field** tab → `V2MaterialsRequest` (pull-from-yard / order / **"ask owner to authorize" if over the foreman's $ limit**) → Owner `V2OwnerApprovals` (Approve/Reply/Deny, auto-escalates to phone after 30m) → if denied, `V2ForemanDenied` returns the owner's reasoning (not raw budget).

---

## 8. AI / intelligence layer

| Surface | Where | What |
|---|---|---|
| Plan ingest pipeline | Estimator | parse sheets, link cross-refs, auto-classify scope |
| Scale auto-detect | Estimator | per-sheet scale + HIGH/MED/LOW confidence |
| Auto-takeoff / auto-count | Estimator | the headline feature; exception-based review |
| Region auto-detect (boundary coaching) | Estimator canvas | "add a cut-line to seal it" |
| Dashboard attention card | Owner | margin/labor guardrail breach → "AT RISK · 18%" |
| Recovery plan | Owner | ranked recovery actions with $ + margin% impact |
| Post-mortem "next time" | Owner | learned rule feeding future bids (no schema yet) |
| Daily-log narrative | Foreman | "AGENT DRAFT" from 12 photos + 2 memos + clock data |
| Photo auto-tag | Worker | "auto-tagged · EPS · East elevation" |
| Geofence auto clock-in | Worker | distance readout, manual fallback |
| Pricing cost history | Settings | "$3.20 (Mar) · up 17% YTD" (rule-based, not AI) |

Confidence is **ordinal/tri-level**, output is **always reviewable**, framing is **never a chatbot** (yellow/ink badges, ranked actions, drafts). The data moat (own history / loss reasons / regional comps) carries from V1 — though the **regional-comp pricing suggestion was dropped** from the V2 pricing editor (regression, §11).

---

## 9. Cross-role handoffs

| Trigger | From → To | Surface |
|---|---|---|
| Manual clock-in | Worker → Foreman | "Ana gets a ping to approve" |
| Blocker / photo / note | Worker → Foreman | Field tab (badge) |
| Brief push | Foreman → Worker | worker Scope tab (preview shows exact worker view) |
| Materials over limit | Foreman → Owner | Approvals queue → denial returns reasoning |
| Daily log | Foreman → Owner (Sarah/Mike — name inconsistent) | review within ~2h |
| Time week | Foreman → Owner | "SEND TO MIKE" → payroll finalize |
| Change order | Owner → Client | DRAFT→SENT→ACCEPTED |
| Takeoff deliverable | Estimator → Client | private share link, attaches to client profile |
| Guardrail breach | System → Owner | attention card → snooze (→ MUTED + reason) |
| Safety stop | Worker → everyone | full-screen red interrupt |
| Chat (auto-context) | any → thread | blocker auto-linked, approvals render as ✓ chips |

`V2ActivityLog` is the shared audit trail (role-color-coded), now with filter chips (Time/Money/Field/Briefs) — still **project-scoped only**, no firmwide view.

---

## 10. Gap-closure scorecard (vs the V1 punch list)

This is why V2 exists. Status of each V1 punch-list item:

### Closed ✅
- **Guardrail + snooze schema** — `V2SchemaSpec` entity + `V2SnoozeSheet` (dismiss → MUTED + reason)
- **Change orders** — `V2ChangeOrderNew/Detail` + schema entity
- **Loss reasons** — `V2ProjectLost` + schema enum + win-rate analytics
- **Owner notification kinds** — per-persona `V2NotifOwner/Foreman/Worker`
- **Money tab** — `V2OwnerMoney` (cash flow / AR-AP / payroll)
- **Worker offline state** — `V2StateOfflineWorker`
- **Burden editor** — `V2SettingsBurden` + `V2BurdenLineEdit` (per-line %, WCB source, recalc-all-bids)
- **Custom roles** — `V2CustomRoleEditor` (4 built-in + inheritance + thresholds); foreman $ limit now configurable
- **Multi-anomaly rendering** — `V2CrewRowMultiAnomaly` (stacked chips) *(but only in the foreman review screen — see Partial)*
- **Clients promoted** — `V2ClientsList` is a top-level screen (Estimator tab), real CRM (LTV / win-rate / hot / lifecycle)
- **Broadcast targeting** — adds CREW segment + by-project
- **Return condition split** — `V2RentReturn` GOOD/WEAR/DAMAGE (3-way) *(uses WEAR not LOST)*
- **Rental service log** — `V2RentService` (work orders / repair / YTD spend)
- **Done→Paid margin reconciliation** — Budget (spent vs complete) → Recovery → Post-mortem chain
- **Pre-clock-in affordance** — `V2WorkerTodayPreClockIn`

### Partial ⚠️
- **Multi-anomaly in Time Approvals** — `V2TimeApprovals` still collapses to a single flag; only `V2CrewRowMultiAnomaly` stacks them
- **"Running late"** — pre-arrival screen exists but no explicit "I'm running late" control (only manual clock-in fallback)
- **Default markup/tax** — overhead now lives in the burden stack, but there's still **no default sell-margin or tax field**; and the V1 AI pricing suggestion + margin pills were **dropped** (regression)
- **Activity log** — adds filter chips but is still project-scoped (no firmwide view)
- **Dashboard variants** — `V2OwnerDashboardCalm`/`Attention` are still **separate components**, not one state-driven screen

### Still open ❌
- **4-week schedule render** — DAY/WEEK/4WK toggle exists but only WEEK renders
- **Assignment-state visuals** — schedule cells don't show confirmed/sent/pending/declined
- **Takeoff → rental SKU suggestions** — not built
- **Reservations forecast curve** — not built
- **Catalog drift / lastCount** — not surfaced
- **Multi-line dispatch ticket** — `V2RentDispatch` is single-asset
- **Crew map privacy framing** — `V2ForemanCrewMap` still shows live GPS + out-of-fence with no consent copy
- **QBO sync in invoicing** — only Stripe appears; V1's QBO push is absent (possible regression)
- **AI crew/hours suggestion in scheduling** — `V2NewAssignment` is manual
- **Rental-yard / supplier integration** — only Procore added

---

## 11. New issues / inconsistencies introduced in V2

A fresh punch list for the V2 build:

### Regressions vs V1
- **Money-wall leaks to foreman** — `V2ForemanToday` shows "SPENT TODAY $724 · −9% UNDER PLAN" and `V2ForemanTimeApprove` shows "$4,180 PAYROLL". Contradicts the "walled off from money" principle the Denied screen otherwise upholds. Decide: does the foreman see dollars or not?
- **QBO sync dropped from invoicing** — only Stripe. If QBO push is required, it regressed.
- **AI pricing suggestion + margin pills dropped** from the pricing editor (V1 had regional comps).
- **2-min clock-in undo dropped** — not present in any V2 clock screen.
- **AI help search dropped** — `V2SettingsHelp` quick links are static now.

### Carried-forward bugs
- **`V2WorkerHoursWeek` still light-themed** — the lone non-dark worker screen (V1 bug not fixed).
- **Crew map privacy framing still absent.**

### New inconsistencies
- **`V2ProjectState` missing `PROGRESS`** — lifecycle strip lists it but the states map omits it.
- **Two status-bar definitions diverge** — `V2SbLight/Dark` (battery glyph) vs canonical `V2Sb({time,dark})` (no battery). Consolidate.
- **PM name inconsistency** — daily log goes to "Sarah", time/denied go to "Mike".
- **Role count inconsistency** — Settings home "3 ROLES · 1 CUSTOM" vs matrix "4 BUILT-IN".
- **Offline count off-by-one** — `V2StateOfflineWorker` hero says "3" but lists 4 rows.
- **`V2RentReturn` uses WEAR not LOST** — can't represent a lost asset.
- **Dashboard Calm/Attention are still two components** — drift risk.
- **Hours settings missing OT / break auto-deduct / grace / timezone** controls (referenced elsewhere, not editable here).
- **Notifications are 3 hardcoded arrays** — schema unification implied, not demonstrated.

### Open product questions
- Does the foreman see money or not? (the leak above)
- Where does CO value actually recompute the contract total? ("ADD TO BUDGET" is the only hook; the invoice screen doesn't show accepted COs)
- Auth model split: workers passwordless (SMS), foreman/estimator set passwords — confirm.
- Is burden global crew-average (as designed) sufficient, or is per-worker needed for varied wages?
- Does count-everywhere (MEP diffusers) belong in a cladding sub's estimate, or is that demoing breadth?

---

## 12. Build implications

V2 is buildable; the brutalist system is actually *simpler* to implement than V1's soft-shadow look.

1. **Stack** — unchanged recommendation: Next.js + TS + Tailwind + Prisma/Postgres (mobile-first PWA; the offline-queue + version-stale screens confirm PWA intent). React Native + Expo if going native — but the offline queue (clock-in/photos/blocker flags) needs real local persistence + background sync either way.
2. **Port tokens + primitives** — `styles.css` is small (197 rules, 29 classes). Translate `:root` to Tailwind theme; build the 29 `.v2-*` as components. The state screens lean on inline styles — promote the recurring patterns (queued-row, banner, 72px glyph, code block, benefits card) into real components.
3. **Schema first** — implement `V2SchemaSpec` (Guardrail, ChangeOrder, LostReason) + the Estimate/Takeoff/Item-Assembly + Burden + Invoice/Milestone + Role/CustomRole + per-persona Notification entities. Add the two unmodeled ones (post-mortem learning, invoice persistence).
4. **Build the role model early** — "Wearing" + custom roles touch every screen's app bar and gate every action. Get `V2WearingPill` + permission checks in the shell first.
5. **Estimator + AI takeoff is the crown jewel and the hardest** — plan ingest, scale detection, polygon/area math, and the AI auto-takeoff/count with confidence scoring. Build the manual canvas + scale gate first (deterministic), stub the AI, then layer auto-detect. This is where the product differentiates.
6. **Then the Project entity end-to-end** — `V2ProjectState` machine + Budget/CO/Invoice. Everything attaches to it.
7. **Resolve §11 before building the affected screens** — especially the foreman money-wall question and the QBO-vs-Stripe invoicing decision.
8. **Accessibility pass** — the high-contrast brutalist style is mostly strong, but small mono labels in ink-3/ink-4 on sand likely fail WCAG AA; animated pulses need `prefers-reduced-motion`.

---

## 13. References

- **Runnable bundle:** `designs/v2/standalone.html`
- **Design system:** `designs/v2/styles.css` (`:root` tokens + `.v2-*` classes)
- **Source modules:** `designs/v2/source/*.jsx` — see filename→content map in §2
- **Backend contract:** `V2SchemaSpec` in `designs/v2/source/gap-closers-schema.jsx`

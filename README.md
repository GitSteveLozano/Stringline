# Stringline

Construction operations for exterior cladding subcontractors (EIFS, stucco, masonry, siding). Responsive PWA with four personas — Owner, Estimator, Foreman, Worker. Mobile-first phone layout (appbar + bottom tabs) below 900px; a desktop sidebar + topbar layout above it, on the same routes.

Built from the V2 designs in [`designs/v2/`](designs/v2/). Start with [`designs/v2/READING.md`](designs/v2/READING.md) for the full product read-through, design system, data model, and open decisions.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind v4** (design tokens in `src/app/globals.css`, ported from `designs/v2/styles.css`)
- **Prisma 6** + **PostgreSQL** (`prisma/schema.prisma`)
- Target: installable PWA (offline-first; see the offline/stale states in the designs)

## Getting started

```bash
npm install
cp .env.example .env        # then fill in DATABASE_URL etc.
npm run db:generate         # generate the Prisma client
npm run dev                 # http://localhost:3000
```

Once a Postgres database is reachable, sync the schema and load the demo
workspace (Davis Stucco LLC — the fixtures the screens were built against):

```bash
npm run db:push             # sync schema to the database (or db:migrate)
npm run db:seed             # seed the demo workspace: team, projects, billing
```

Every persona screen (owner, estimator, foreman, worker) reads live from the
database via the query layer in [`src/server/`](src/server/); interactions are
server actions in [`src/server/actions.ts`](src/server/actions.ts).
`src/lib/demo-data.ts` is now just the seed source + shared label maps.

### Visual review (screenshots)

`npm run shots` drives a headless browser over the running app and writes PNGs to
`shots/` (gitignored) — one per persona/route at both mobile (390px) and desktop
(1440px) widths, so changes can be reviewed without a local UI. It signs in each
persona by minting a session cookie, so the dev server and a seeded database must
be running.

```bash
npm run dev                                   # in one shell
npx playwright install chromium               # one-time, or set PLAYWRIGHT_EXECUTABLE
npm run shots                                 # full catalog → shots/
PERSONAS=owner WIDTHS=desktop ROUTES=/owner npm run shots   # one screen
```

This depends on `playwright-core`, which has no bundled browser: either run
`npx playwright install chromium` or point `PLAYWRIGHT_EXECUTABLE` at a Chromium
binary.

### What's wired end-to-end

The core business loop is interactive and persisted, not mocked:

- **Bids & pipeline** — create a project ("New bid" / "New project"), with an
  existing or new client. The estimator's **Queue** buckets every project by
  stage (drafting → out for bid → won, plus lost) with pipeline value and a win
  rate; **Clients** and the pricing-book **Library** read live too.
- **Takeoff → estimate** — the canvas draws and saves measurements, "Run AI
  takeoff" persists a draft, and "Push to estimate" prices measurements ×
  scope sell rates into the project's bid value.
- **Project lifecycle** — the detail screen advances a project
  `DRAFTING → SENT → ACCEPTED → IN_PROGRESS → DONE → PAID` (forward-only, with
  side effects), or marks a pre-acceptance bid **lost** with a reason.
- **Change orders** — log a CO, accept/reject it; accepted COs fold into the
  contract value.
- **Invoicing** — a completed project generates a final invoice (whose unpaid
  balance surfaces in owner **Money** receivables); recording payment settles
  the milestones and closes the project to PAID.
- **Field** — clock in/out/break, scope steps, daily log, field reports, and
  owner **Approvals**; owners confirm invited **Team** members.

### Signing in

Auth is split — office roles use email + password, crew use a phone + SMS
code (the code is shown on-screen in dev since no SMS provider is wired).
The seed prints credentials; the defaults are:

```
Office:  sarah@davisstucco.com / demo   (owner — wears all four hats)
         maya@davisstucco.com  / demo   (estimator)
Crew:    phone +1403555102  (Marcus, worker)  → code shown on the code screen
```

App routes (`/owner`, `/foreman`, …) require a session; `AUTH_SECRET` in
`.env` signs the session cookie. The app is also an installable PWA
(manifest + service worker) with an offline fallback.

## Layout

```
src/
  app/            Next.js routes (App Router)
  components/
    ui.tsx        V2 primitive component library (.v2-* wrappers)
  lib/
    cn.ts         className join helper
    db.ts         Prisma client singleton
    demo-data.ts  V2 fixtures — seed source + unwired screens
  server/         Prisma-backed query layer (view-model loaders)
prisma/
  schema.prisma   data model — core spine + V2SchemaSpec gap-closers
  seed.ts         loads demo-data.ts fixtures into the database
designs/v2/       the design package this app is built from
```

## Key product decisions

- **Auth**: split — workers passwordless (SMS OTP), office roles email+password/SSO
- **Foreman money**: hidden by default, gated by a `canViewCosts` role capability
- **Invoicing**: Stripe collects payment, QuickBooks Online books the accounting entry
- **Roles**: four built-in (Owner/Estimator/Foreman/Worker) + custom roles via the "Wearing" model

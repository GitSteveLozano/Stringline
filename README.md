# Stringline

Construction operations for exterior cladding subcontractors (EIFS, stucco, masonry, siding). Mobile-first PWA with four personas — Owner, Estimator, Foreman, Worker.

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
database via the query layer in [`src/server/`](src/server/); interactions
(clock in/out, approvals, daily log, scope steps, takeoff scale gate, …) are
server actions in [`src/server/actions.ts`](src/server/actions.ts).
`src/lib/demo-data.ts` is now just the seed source + shared label maps.

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

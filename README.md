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

To run migrations once a Postgres database is reachable:

```bash
npm run db:migrate
```

## Layout

```
src/
  app/            Next.js routes (App Router)
  components/
    ui.tsx        V2 primitive component library (.v2-* wrappers)
  lib/
    cn.ts         className join helper
    db.ts         Prisma client singleton
prisma/
  schema.prisma   data model — core spine + V2SchemaSpec gap-closers
designs/v2/       the design package this app is built from
```

## Key product decisions

- **Auth**: split — workers passwordless (SMS OTP), office roles email+password/SSO
- **Foreman money**: hidden by default, gated by a `canViewCosts` role capability
- **Invoicing**: Stripe collects payment, QuickBooks Online books the accounting entry
- **Roles**: four built-in (Owner/Estimator/Foreman/Worker) + custom roles via the "Wearing" model

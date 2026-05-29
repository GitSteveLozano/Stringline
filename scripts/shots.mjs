// @ts-check
/**
 * Screenshot harness — render the running app and write PNGs so changes can be
 * reviewed visually without a local UI.
 *
 * Usage:
 *   npm run shots                       # full catalog, both widths
 *   PERSONAS=owner WIDTHS=desktop npm run shots
 *   ROUTES=/owner,/owner/money PERSONAS=owner npm run shots
 *
 * Env:
 *   BASE_URL              default http://localhost:3000 (server must be running)
 *   OUT_DIR               default ./shots
 *   PERSONAS              comma list of owner,estimator,foreman,worker (default all)
 *   WIDTHS                comma list of mobile,desktop (default both)
 *   ROUTES                override the per-persona route list (comma separated)
 *   PLAYWRIGHT_EXECUTABLE path to a chromium binary (else Playwright's default)
 *   AUTH_SECRET           must match the app's signing secret
 */
import { chromium } from "playwright-core";
import { PrismaClient } from "@prisma/client";
import { createHmac } from "node:crypto";
import { mkdir } from "node:fs/promises";
import "dotenv/config";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT_DIR = process.env.OUT_DIR || "./shots";
const SECRET = process.env.AUTH_SECRET || "dev-secret-not-for-prod";

const WIDTHS = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1440, height: 900 },
};

const CATALOG = {
  owner: ["/owner", "/owner/projects", "/owner/money", "/owner/team", "/owner/more", "/approvals"],
  estimator: ["/estimator", "/estimator/queue", "/estimator/clients", "/estimator/library", "/estimator/more"],
  foreman: ["/foreman", "/foreman/crew", "/foreman/time"],
  worker: ["/worker", "/worker/scope", "/worker/hours"],
};

const ROLE_BY_PERSONA = { owner: "OWNER", estimator: "ESTIMATOR", foreman: "FOREMAN", worker: "WORKER" };

function mintCookie(uid) {
  const payload = Buffer.from(JSON.stringify({ uid, exp: Date.now() + 86400000 })).toString("base64url");
  const sig = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

const slug = (r) => r.replace(/^\//, "").replace(/\//g, "-") || "root";

async function main() {
  const personas = (process.env.PERSONAS || Object.keys(CATALOG).join(",")).split(",").map((s) => s.trim());
  const widths = (process.env.WIDTHS || Object.keys(WIDTHS).join(",")).split(",").map((s) => s.trim());
  const routeOverride = process.env.ROUTES ? process.env.ROUTES.split(",").map((s) => s.trim()) : null;

  await mkdir(OUT_DIR, { recursive: true });
  const db = new PrismaClient();
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_EXECUTABLE || undefined,
    args: ["--no-sandbox"],
  });

  let count = 0;
  for (const persona of personas) {
    const m = await db.membership.findFirst({ where: { role: ROLE_BY_PERSONA[persona] }, select: { userId: true } });
    if (!m) {
      console.warn(`! no user for persona ${persona}, skipping`);
      continue;
    }
    const cookie = mintCookie(m.userId);
    const routes = routeOverride || CATALOG[persona] || [];

    for (const widthName of widths) {
      const ctx = await browser.newContext({ viewport: WIDTHS[widthName] });
      const url = new URL(BASE_URL);
      await ctx.addCookies([{ name: "sl_session", value: cookie, domain: url.hostname, path: "/" }]);
      const page = await ctx.newPage();
      for (const route of routes) {
        const res = await page.goto(BASE_URL + route, { waitUntil: "networkidle", timeout: 30000 });
        await page.waitForTimeout(250);
        const file = `${OUT_DIR}/${persona}-${slug(route)}-${widthName}.png`;
        await page.screenshot({ path: file, fullPage: true });
        const status = res ? res.status() : "?";
        console.log(`${status === 200 ? "✓" : "✗"} ${status} ${file}`);
        count++;
      }
      await ctx.close();
    }
  }

  await browser.close();
  await db.$disconnect();
  console.log(`\n${count} screenshots → ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

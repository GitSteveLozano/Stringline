import { db } from "@/lib/db";
import { getActiveWorkspaceId } from "./workspace";

export type AssetRow = {
  id: string;
  sku: string;
  name: string;
  category: string;
  ownedQty: number;
  out: number;
  available: number;
  utilization: number; // 0..1
  dailyRate: number;
  onRentValue: number; // dailyRate × out
  replacement: number | null;
};

export type AssetCategory = { name: string; rows: AssetRow[] };

/** The equipment yard: each asset's owned/out/available + utilization, grouped by category. */
export async function getAssetYard(): Promise<{
  categories: AssetCategory[];
  summary: { skuCount: number; unitsOwned: number; unitsOut: number; utilization: number; onRentValue: number };
}> {
  const workspaceId = await getActiveWorkspaceId();
  const assets = await db.asset.findMany({
    where: { workspaceId },
    orderBy: [{ category: "asc" }, { name: "asc" }],
    include: { dispatches: { select: { qty: true, status: true } } },
  });

  const rows: AssetRow[] = assets.map((a) => {
    const out = a.dispatches.filter((d) => d.status !== "RETURNED").reduce((s, d) => s + d.qty, 0);
    const ownedQty = a.ownedQty;
    const dailyRate = Number(a.dailyRate);
    return {
      id: a.id,
      sku: a.sku,
      name: a.name,
      category: a.category,
      ownedQty,
      out,
      available: Math.max(0, ownedQty - out),
      utilization: ownedQty > 0 ? Math.min(1, out / ownedQty) : 0,
      dailyRate,
      onRentValue: dailyRate * out,
      replacement: a.replacement != null ? Number(a.replacement) : null,
    };
  });

  const byCat = new Map<string, AssetRow[]>();
  for (const r of rows) {
    const list = byCat.get(r.category) ?? [];
    list.push(r);
    byCat.set(r.category, list);
  }
  const categories: AssetCategory[] = [...byCat.entries()].map(([name, rows]) => ({ name, rows }));

  const unitsOwned = rows.reduce((s, r) => s + r.ownedQty, 0);
  const unitsOut = rows.reduce((s, r) => s + r.out, 0);
  return {
    categories,
    summary: {
      skuCount: rows.length,
      unitsOwned,
      unitsOut,
      utilization: unitsOwned > 0 ? unitsOut / unitsOwned : 0,
      onRentValue: rows.reduce((s, r) => s + r.onRentValue, 0),
    },
  };
}

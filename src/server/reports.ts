import { listProjects } from "./projects";
import { getBidQueue } from "./estimator";
import { getCashSummary } from "./money";

export type JobBurnRow = {
  id: string;
  name: string;
  contractValue: number;
  spent: number;
  usedPct: number; // spent / contract, 0..1
  health: string;
  overBudget: boolean;
};

export type StageBar = { label: string; value: number };

/** Owner insights: pipeline, win rate, awarded value, budget burn by active job, cash. */
export async function getReports() {
  const [all, queue, cash] = await Promise.all([listProjects(), getBidQueue(), getCashSummary()]);

  // Burn = spend against the contract, flagged by the project's own health
  // (which already accounts for progress) rather than an invented margin number.
  const active = all.filter((p) => p.status === "IN_PROGRESS" || p.status === "DONE");
  const jobs: JobBurnRow[] = active
    .map((p) => ({
      id: p.id,
      name: p.name,
      contractValue: p.contractValue,
      spent: p.spent,
      usedPct: p.contractValue > 0 ? Math.min(1, p.spent / p.contractValue) : 0,
      health: p.health,
      overBudget: p.health === "OVER_BUDGET",
    }))
    .sort((a, b) => Number(b.overBudget) - Number(a.overBudget) || b.usedPct - a.usedPct);

  const overBudgetCount = jobs.filter((j) => j.overBudget).length;

  const wonStage = queue.stages.find((s) => s.key === "won");
  const awarded = wonStage?.total ?? 0;

  const pipelineByStage: StageBar[] = queue.stages
    .filter((s) => s.key !== "lost")
    .map((s) => ({ label: s.label, value: s.total }));

  return {
    pipelineValue: queue.inFlightValue,
    winRate: queue.winRate,
    awarded,
    netCash30: cash.cashIn30 - cash.cashOut30,
    cash,
    activeCount: active.length,
    overBudgetCount,
    jobs,
    pipelineByStage,
  };
}

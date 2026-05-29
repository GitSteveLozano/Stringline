import { test } from "node:test";
import assert from "node:assert/strict";
import {
  nextStatus,
  parseMoney,
  normalizeLostReason,
  nextChangeOrderNumber,
  contractTotal,
  takeoffTotal,
  winRate,
} from "./workflow";

test("nextStatus walks the lifecycle and stops at PAID", () => {
  assert.equal(nextStatus("DRAFTING"), "SENT");
  assert.equal(nextStatus("SENT"), "ACCEPTED");
  assert.equal(nextStatus("ACCEPTED"), "IN_PROGRESS");
  assert.equal(nextStatus("IN_PROGRESS"), "DONE");
  assert.equal(nextStatus("DONE"), "PAID");
  assert.equal(nextStatus("PAID"), null);
});

test("parseMoney strips formatting and respects the negative flag", () => {
  assert.equal(parseMoney("$156,400"), 156400);
  assert.equal(parseMoney("210500"), 210500);
  assert.equal(parseMoney(""), null);
  assert.equal(parseMoney("   "), null);
  assert.equal(parseMoney("abc"), null);
  // minus is dropped unless allowed
  assert.equal(parseMoney("-800"), 800);
  assert.equal(parseMoney("-800", true), -800);
  assert.equal(parseMoney("$4,250", true), 4250);
});

test("normalizeLostReason keeps valid reasons and falls back to OTHER", () => {
  assert.equal(normalizeLostReason("competitor"), "COMPETITOR");
  assert.equal(normalizeLostReason("PRICE"), "PRICE");
  assert.equal(normalizeLostReason("nonsense"), "OTHER");
  assert.equal(normalizeLostReason(""), "OTHER");
});

test("nextChangeOrderNumber increments from the last (or starts at 1)", () => {
  assert.equal(nextChangeOrderNumber(null), 1);
  assert.equal(nextChangeOrderNumber(undefined), 1);
  assert.equal(nextChangeOrderNumber(0), 1);
  assert.equal(nextChangeOrderNumber(3), 4);
});

test("contractTotal folds in accepted change-order deltas only", () => {
  assert.equal(contractTotal(184250, [4250]), 188500);
  assert.equal(contractTotal(184250, [4250, 4250]), 192750);
  assert.equal(contractTotal(184250, []), 184250);
  assert.equal(contractTotal(100000, [4250, -800]), 103450);
});

test("takeoffTotal prices quantity x sell rate, rounded", () => {
  const rates = { EPS: 5.6, BASE: 3.9, STONE: 16.5, CAULK: 2.8 };
  // 418*5.6 + 335*3.9 + 72*16.5 = 4835.3 -> 4835
  assert.equal(
    takeoffTotal([{ code: "EPS", qty: 418 }, { code: "BASE", qty: 335 }, { code: "STONE", qty: 72 }], rates),
    4835
  );
  // AI areas: 800*5.6 + 400*3.9 + 120*16.5 = 8020
  assert.equal(
    takeoffTotal([{ code: "EPS", qty: 800 }, { code: "BASE", qty: 400 }, { code: "STONE", qty: 120 }], rates),
    8020
  );
  // unknown codes contribute 0; Map form also works
  assert.equal(takeoffTotal([{ code: "MYSTERY", qty: 999 }], rates), 0);
  assert.equal(takeoffTotal([{ code: "EPS", qty: 10 }], new Map([["EPS", 5.6]])), 56);
  assert.equal(takeoffTotal([], rates), 0);
});

test("winRate is won / decided, null before any decision", () => {
  assert.equal(winRate(3, 0), 1);
  assert.equal(winRate(3, 2), 0.6);
  assert.equal(winRate(0, 0), null);
  assert.equal(winRate(0, 4), 0);
});

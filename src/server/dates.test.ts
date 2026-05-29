import { test } from "node:test";
import assert from "node:assert/strict";
import { weekStart, dayOfSchedule, DAY_MS } from "./dates";

test("weekStart anchors to Monday 00:00 of the current week", () => {
  // 2026-05-25 is a Monday; 27th Wed, 31st Sun (local time).
  const monday = new Date(2026, 4, 25);
  for (const day of [25, 27, 31]) {
    const ws = weekStart(new Date(2026, 4, day, 15, 30, 45));
    assert.equal(ws.getDay(), 1, `day ${day} -> Monday`);
    assert.equal(ws.getFullYear(), 2026);
    assert.equal(ws.getMonth(), 4);
    assert.equal(ws.getDate(), 25);
    assert.equal(ws.getHours(), 0);
    assert.equal(ws.getMinutes(), 0);
    assert.equal(ws.getSeconds(), 0);
  }
  // A Monday maps to itself (midnight).
  assert.equal(weekStart(monday).getTime(), monday.getTime());
});

test("weekStart does not mutate its argument", () => {
  const input = new Date(2026, 4, 27, 15, 30);
  const snapshot = input.getTime();
  weekStart(input);
  assert.equal(input.getTime(), snapshot);
});

test("dayOfSchedule needs both a start and a duration", () => {
  assert.equal(dayOfSchedule(null, 35), undefined);
  assert.equal(dayOfSchedule(new Date(), null), undefined);
  assert.equal(dayOfSchedule(null, null), undefined);
});

test("dayOfSchedule counts from day 1 and clamps to the duration", () => {
  const ago = (days: number) => new Date(Date.now() - days * DAY_MS);
  assert.equal(dayOfSchedule(ago(0), 35), 1); // first day
  assert.equal(dayOfSchedule(ago(5), 35), 6); // mid-schedule
  assert.equal(dayOfSchedule(ago(100), 35), 35); // clamped to duration
  // A start slightly in the future never goes below 1.
  assert.equal(dayOfSchedule(new Date(Date.now() + DAY_MS / 2), 35), 1);
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { initials, baseRoleLabel } from "./format";

test("initials takes the first two name parts, uppercased", () => {
  assert.equal(initials("Ana Castillo"), "AC");
  assert.equal(initials("sarah davis"), "SD");
  assert.equal(initials("Cher"), "C");
  assert.equal(initials("Jean Luc Picard"), "JL"); // capped at two
  assert.equal(initials("  Marcus   Lee  "), "ML"); // extra whitespace
});

test("baseRoleLabel maps roles, with WORKER reading as Crew", () => {
  assert.equal(baseRoleLabel("OWNER"), "Owner");
  assert.equal(baseRoleLabel("ESTIMATOR"), "Estimator");
  assert.equal(baseRoleLabel("FOREMAN"), "Foreman");
  assert.equal(baseRoleLabel("WORKER"), "Crew");
  assert.equal(baseRoleLabel("ANYTHING_ELSE"), "Crew"); // default
});

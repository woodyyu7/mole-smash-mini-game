"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");

const { spawnIntervalMs, START_INTERVAL_MS, END_INTERVAL_MS, clamp } = require("../src/game/difficulty");
const { pickRandomHole, isVisible, MOLE_VISIBLE_MS } = require("../src/game/spawn");
const { addSmash, nextBestScore } = require("../src/game/score");
const { remainingMs, remainingSeconds, isFinished } = require("../src/game/timer");
const { HOLE_COUNT, createInitialState, tick, smash } = require("../src/game/engine");
const { loadBestScore, saveBestScore, __resetMemoryStore } = require("../src/storage/bestScore");

test("difficulty: clamp keeps values in range", () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-5, 0, 10), 0);
  assert.equal(clamp(50, 0, 10), 10);
});

test("difficulty: interval starts at 1.5s and ends at 0.5s (AC-04.1)", () => {
  assert.equal(spawnIntervalMs(0), START_INTERVAL_MS);
  assert.equal(spawnIntervalMs(30000), END_INTERVAL_MS);
  const mid = spawnIntervalMs(15000);
  assert.ok(mid > END_INTERVAL_MS && mid < START_INTERVAL_MS);
});

test("difficulty: interval decreases monotonically over time", () => {
  const a = spawnIntervalMs(0);
  const b = spawnIntervalMs(15000);
  const c = spawnIntervalMs(30000);
  assert.ok(a > b && b > c);
});

test("spawn: never returns the same hole twice in a row", () => {
  for (let i = 0; i < 100; i++) {
    const hole = pickRandomHole(9, i % 9);
    assert.notEqual(hole, i % 9);
  }
});

test("spawn: single-hole grid always returns hole 0", () => {
  assert.equal(pickRandomHole(1, 0), 0);
  assert.equal(pickRandomHole(1, null), 0);
});

test("spawn: mole visible only within its 2s window (AC-01.3)", () => {
  assert.equal(isVisible(0, 0), true);
  assert.equal(isVisible(0, MOLE_VISIBLE_MS - 1), true);
  assert.equal(isVisible(0, MOLE_VISIBLE_MS), false);
});

test("score: smash adds exactly one point (AC-01.2)", () => {
  assert.equal(addSmash(0), 1);
  assert.equal(addSmash(10), 11);
});

test("score: best score only increases when beaten (AC-04.1)", () => {
  assert.equal(nextBestScore(5, 3), 5);
  assert.equal(nextBestScore(5, 7), 7);
  assert.equal(nextBestScore(5, 5), 5);
});

test("timer: remaining time counts down to zero (AC-02.1/02.2)", () => {
  assert.equal(remainingMs(0, 0), 30000);
  assert.equal(remainingSeconds(0, 0), 30);
  assert.equal(remainingSeconds(0, 15000), 15);
  assert.equal(isFinished(0, 29999), false);
  assert.equal(isFinished(0, 30000), true);
  assert.equal(remainingMs(0, 40000), 0);
});

test("engine: round starts with score 0 and a scheduled spawn", () => {
  const s = createInitialState(1000);
  assert.equal(s.score, 0);
  assert.equal(s.finished, false);
  assert.ok(s.nextSpawnAt >= 1000);
});

test("engine: a mole spawns after the initial interval", () => {
  const s = createInitialState(0);
  const after = tick(s, 1500);
  assert.ok(after.mole.hole !== null);
  assert.ok(after.mole.hole >= 0 && after.mole.hole < HOLE_COUNT);
});

test("engine: smashing the visible mole increments score (AC-01.2)", () => {
  let s = createInitialState(0);
  s = tick(s, 1500); // mole now visible
  const hole = s.mole.hole;
  const after = smash(s, hole, 1500);
  assert.equal(after.score, 1);
  assert.equal(after.mole.hole, null);
});

test("engine: smashing an empty hole does not score", () => {
  let s = createInitialState(0);
  s = tick(s, 1500);
  const emptyHole = (s.mole.hole + 1) % HOLE_COUNT;
  const after = smash(s, emptyHole, 1500);
  assert.equal(after.score, 0);
});

test("engine: round ends at 30s and updates best score", () => {
  let s = createInitialState(0);
  s = { ...s, score: 4, bestScore: 0 };
  const ended = tick(s, 30000);
  assert.equal(ended.finished, true);
  assert.equal(ended.bestScore, 4);
  assert.equal(ended.mole.hole, null);
});

test("persistence: best score survives a save/load cycle (AC-04.2)", async () => {
  __resetMemoryStore();
  assert.equal(await loadBestScore(), 0);
  await saveBestScore(12);
  assert.equal(await loadBestScore(), 12);
  await saveBestScore(7);
  assert.equal(await loadBestScore(), 12); // lower score does not overwrite
  __resetMemoryStore();
});

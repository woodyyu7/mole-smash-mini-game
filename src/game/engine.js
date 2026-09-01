/**
 * Game engine (pure, UI-free).
 *
 * Combines difficulty, spawn, scoring, and timer into a single reducer-style
 * state machine. The React layer renders `state`; all mutations flow through
 * the exported functions so the whole game is unit-testable.
 */

const { spawnIntervalMs } = require("./difficulty");
const { pickRandomHole, isVisible } = require("./spawn");
const { addSmash, nextBestScore } = require("./score");
const { isFinished } = require("./timer");

const HOLE_COUNT = 9;

/** Create a fresh game state for a new round. @param {number} nowMs */
function createInitialState(nowMs) {
  return {
    startedAt: nowMs,
    score: 0,
    bestScore: 0,
    mole: { hole: null, spawnedAt: 0 },
    lastHole: null,
    nextSpawnAt: nowMs + spawnIntervalMs(0),
    finished: false,
  };
}

/**
 * Advance the game clock to `nowMs`: spawn a mole if due, hide it if expired,
 * and end the round when time is up.
 * @param {object} state @param {number} nowMs
 */
function tick(state, nowMs) {
  if (state.finished) return state;

  const next = { ...state, mole: { ...state.mole } };

  // Hide an expired mole.
  if (next.mole.hole !== null && !isVisible(next.mole.spawnedAt, nowMs)) {
    next.mole = { hole: null, spawnedAt: 0 };
  }

  // Spawn a new mole when due (and none visible).
  if (next.mole.hole === null && nowMs >= next.nextSpawnAt) {
    const hole = pickRandomHole(HOLE_COUNT, next.lastHole);
    next.mole = { hole, spawnedAt: nowMs };
    next.lastHole = hole;
    next.nextSpawnAt = nowMs + spawnIntervalMs(nowMs - next.startedAt);
  }

  // End of round.
  if (isFinished(next.startedAt, nowMs)) {
    next.finished = true;
    next.mole = { hole: null, spawnedAt: 0 };
    next.bestScore = nextBestScore(next.bestScore, next.score);
  }

  return next;
}

/**
 * Handle a tap on `holeIndex` at `nowMs`: +1 if a mole is visible there,
 * otherwise a no-op. A successful smash schedules the next spawn per the
 * difficulty ramp.
 * @param {object} state @param {number} holeIndex @param {number} nowMs
 */
function smash(state, holeIndex, nowMs) {
  if (state.finished) return state;
  if (state.mole.hole !== holeIndex) return state;
  return {
    ...state,
    score: addSmash(state.score),
    mole: { hole: null, spawnedAt: 0 },
    nextSpawnAt: nowMs + spawnIntervalMs(nowMs - state.startedAt),
  };
}

module.exports = {
  HOLE_COUNT,
  createInitialState,
  tick,
  smash,
};

/**
 * Spawn scheduler (pure).
 *
 * Picks a random hole, avoiding the same hole twice in a row, and manages the
 * "mole visible for 2s then hides" lifecycle (BRD AC-01.3).
 */

const MOLE_VISIBLE_MS = 2000;

/** @param {number} holeCount @param {number|null} previousHole */
function pickRandomHole(holeCount, previousHole) {
  if (holeCount <= 0) return null;
  if (holeCount === 1) return 0;
  let index = Math.floor(Math.random() * holeCount);
  if (index === previousHole) {
    index = (index + 1) % holeCount;
  }
  return index;
}

/**
 * Whether a mole at `spawnedAtMs` is still visible at `nowMs`.
 * @param {number} spawnedAtMs @param {number} nowMs
 */
function isVisible(spawnedAtMs, nowMs) {
  return nowMs - spawnedAtMs < MOLE_VISIBLE_MS;
}

module.exports = { MOLE_VISIBLE_MS, pickRandomHole, isVisible };

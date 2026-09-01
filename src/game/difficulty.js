/**
 * Difficulty ramp (pure).
 *
 * Spawn interval starts at 1.5s and decreases linearly to 0.5s over a 30s
 * round (BRD AC-04.1). No React/UI imports — unit-testable directly.
 */

const START_INTERVAL_MS = 1500;
const END_INTERVAL_MS = 500;
const ROUND_DURATION_MS = 30000;

/** Clamp a number to [min, max]. */
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * The spawn interval (ms) at a given elapsed time into a round.
 * @param {number} elapsedMs
 * @returns {number}
 */
function spawnIntervalMs(elapsedMs) {
  const t = clamp(elapsedMs / ROUND_DURATION_MS, 0, 1);
  return START_INTERVAL_MS + (END_INTERVAL_MS - START_INTERVAL_MS) * t;
}

module.exports = {
  START_INTERVAL_MS,
  END_INTERVAL_MS,
  ROUND_DURATION_MS,
  clamp,
  spawnIntervalMs,
};

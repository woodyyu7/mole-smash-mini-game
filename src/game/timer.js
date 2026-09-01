/**
 * Round timer (pure). Counts down from a fixed duration using wall-clock
 * deltas (Date.now), avoiding setInterval drift (BRD AC-02.1/02.2).
 */

const ROUND_DURATION_MS = 30000;

/**
 * Remaining time at `nowMs` given a `startedAtMs`.
 * @param {number} startedAtMs @param {number} nowMs
 */
function remainingMs(startedAtMs, nowMs) {
  return Math.max(0, ROUND_DURATION_MS - (nowMs - startedAtMs));
}

/** Whether the round has finished. */
function isFinished(startedAtMs, nowMs) {
  return remainingMs(startedAtMs, nowMs) <= 0;
}

/** Integer seconds remaining, for display. */
function remainingSeconds(startedAtMs, nowMs) {
  return Math.ceil(remainingMs(startedAtMs, nowMs) / 1000);
}

module.exports = { ROUND_DURATION_MS, remainingMs, remainingSeconds, isFinished };

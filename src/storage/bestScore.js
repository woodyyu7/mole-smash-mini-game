/**
 * Best-score persistence with a storage abstraction (BRD AC-04.1/04.2).
 *
 * Uses @react-native-async-storage/async-storage on device; falls back to an
 * in-memory map so the logic is testable without native modules.
 */

const KEY = "moleSmash_bestScore";

let memoryStore = {};

function getStore() {
  try {
    // eslint-disable-next-line global-require
    return require("@react-native-async-storage/async-storage").default;
  } catch {
    return null;
  }
}

/** @returns {Promise<number>} */
async function loadBestScore() {
  const store = getStore();
  if (store) {
    try {
      const raw = await store.getItem(KEY);
      if (raw !== null && raw !== undefined) {
        const n = Number(raw);
        if (Number.isFinite(n)) return n;
      }
    } catch {
      // store unavailable (e.g. plain Node test run) — fall through to memory
    }
  }
  return memoryStore[KEY] ?? 0;
}

/** @param {number} score @returns {Promise<void>} */
async function saveBestScore(score) {
  const current = await loadBestScore();
  if (score <= current) return;
  const store = getStore();
  if (store) {
    try {
      await store.setItem(KEY, String(score));
    } catch {
      // best-effort: keep the in-memory copy as a fallback
    }
  }
  memoryStore[KEY] = score;
}

/** Reset the in-memory fallback (test helper). */
function __resetMemoryStore() {
  memoryStore = {};
}

module.exports = { loadBestScore, saveBestScore, __resetMemoryStore, KEY };

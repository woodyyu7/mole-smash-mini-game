/**
 * Scoring (pure). One point per smash (BRD AC-01.2).
 */

/** Add a smash to the current score. @param {number} score */
function addSmash(score) {
  return score + 1;
}

/**
 * Best-score update: return the new best if `score` beats it.
 * @param {number} currentBest @param {number} score
 */
function nextBestScore(currentBest, score) {
  return score > currentBest ? score : currentBest;
}

module.exports = { addSmash, nextBestScore };

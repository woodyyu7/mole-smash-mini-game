# Mole Smash

A cross-platform whack-a-mole reflex mini game built with React Native (Expo),
driven by the multi-agent SDLC workflow.

## Structure

```
App.tsx                      # root navigation (Home -> Game -> Game Over)
src/game/                    # pure, UI-free game logic (testable)
  difficulty.js              #   spawn interval ramp 1.5s -> 0.5s
  spawn.js                   #   random hole + 2s visibility window
  score.js                   #   scoring + best-score comparison
  timer.js                   #   wall-clock countdown (no drift)
  engine.js                  #   reducer-style state machine
  useGameEngine.ts           #   React hook bridging engine -> UI
src/storage/bestScore.js     # AsyncStorage wrapper w/ in-memory fallback
src/screens/                 # Home, Game, GameOver screens
src/components/              # HoleButton, TimerBar, ScoreDisplay, PrimaryButton
src/theme/tokens.ts          # colour / spacing / typography design tokens
test/engine.test.js          # node:test unit suite (zero deps)
```

## Run tests

```bash
node --test
# or
npm test
```

The pure game logic is plain JS (with JSDoc types) so it runs under Node's
built-in test runner with **no install step**. Port to TypeScript by renaming
`.js` → `.ts` and adding type annotations.

## Run the app

```bash
npm install
npx expo start
```

## Coding standards

See the workflow framework's project knowledge:
`../agentic-ai/.context/mole-smash-mini-game/CODING_STANDARDS.md`

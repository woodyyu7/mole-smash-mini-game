# Mole Smash

A cross-platform whack-a-mole reflex mini game built with React Native (Expo SDK 50),
driven by the multi-agent SDLC workflow.

## Structure

```
App.tsx                      # root navigation (Home -> Game -> Game Over)
index.js                     # Expo entry point (registerRootComponent)
app.json                     # Expo app config (iOS / Android / web)
babel.config.js              # babel-preset-expo
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

## Prerequisites

| Tool | Version | Needed for |
|------|---------|------------|
| Node.js | >= 18 | everything |
| npm | >= 9 | installing deps |
| Xcode + Command Line Tools | 15+ (macOS only) | iOS Simulator |
| Android Studio | latest | Android Emulator |
| Expo Go (App Store / Play Store) | latest | testing on a physical device (optional) |

Check Xcode is ready: `xcodebuild -version && xcode-select -p` (should point at
`/Applications/Xcode.app/...`).

## Run tests

```bash
npm install
npm test
# or
node --test
```

The pure game logic is plain JS (with JSDoc types) so it runs under Node's
built-in test runner with **no native modules required**. Port to TypeScript by
renaming `.js` → `.ts` and adding type annotations.

## Run the app

```bash
npm install
npm start
```

Metro starts on **http://localhost:8081**. Press `r` to reload, `j` to open the
debugger, `?` for all shortcuts. Then run the app on any target below — you can
keep Metro running and open multiple targets at once.

### Browser (localhost, fastest loop)

```bash
npm run web
# then open http://localhost:8081
```

### iOS Simulator (macOS)

1. Install Xcode from the App Store, then open it once and accept the license.
2. Open **Xcode ▸ Settings ▸ Platforms** and download at least one iOS runtime
   (e.g. iOS 17.5) — this creates a default Simulator.
3. Verify a device exists:
   ```bash
   xcrun simctl list devices available
   ```
4. From the project root:
   ```bash
   npm run ios        # starts Metro and boots the Simulator automatically
   ```
   Or, with `npm start` already running, press **`i`** in the terminal.

The first build downloads pods/CocoaPods-less Expo assets and can take a few
minutes; subsequent launches are fast.

### Android Emulator

1. Install **Android Studio**, open it once, and follow the setup wizard
   (installs the Android SDK, platform tools, and emulator).
2. Create a virtual device: **Android Studio ▸ More Actions ▸ Virtual Device
   Manager ▸ Create Device** (e.g. Pixel 7 + latest API) and click **Play ▶**,
   or start it headless from a terminal:
   ```bash
   emulator -list-avds
   emulator -avd Pixel_7_API_34 &
   ```
3. Make sure `adb` sees the device (`adb devices` should list `emulator-5554`).
   If `adb`/`emulator` are not found, add to your `~/.zshrc`:
   ```bash
   export ANDROID_HOME="$HOME/Library/Android/sdk"
   export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator"
   ```
4. From the project root:
   ```bash
   npm run android     # starts Metro and installs Expo Go on the emulator
   ```
   Or, with `npm start` already running, press **`a`** in the terminal.

### Physical device (optional)

Install **Expo Go** from the App Store / Play Store, run `npm start`, and scan
the QR code. Phone and computer must be on the same Wi-Fi network (or use
`tunnel`: `npx expo start --tunnel`).

## Troubleshooting

- **Stale bundle / cache issues**: `npx expo start --clear`
- **Port 8081 already in use**: `npx expo start --port 8082` (update the URL
  you open accordingly)
- **"Install correct versions of the packages" warnings**: `npx expo install --fix`
- **Emulator can't reach Metro** (Android): with the emulator running, run
  `adb reverse tcp:8081 tcp:8081` once.
- **iOS Simulator opens but shows nothing**: ensure Metro is running and press
  `Cmd+R` inside the Simulator, or `Device ▸ Erase All Content and Settings`.
- **"Unable to boot device because we cannot determine the runtime bundle"**
  (simulator won't start): CoreSimulator's daemon is caching a stale runtime
  mapping (common after Xcode/runtime updates). Restart it — takes seconds:
  ```bash
  xcrun simctl shutdown all 2>/dev/null
  killall -9 com.apple.CoreSimulator.CoreSimulatorService
  ```
  Then run `npm run ios` again. If a device still refuses to boot, remove
  stale entries (`xcrun simctl delete unavailable`) and, as a last resort,
  re-download the runtime (`xcodebuild -downloadPlatform iOS`, ~8 GB).
- **`npm run ios` / `npm run android` use Expo Go** and never require a native
  build. Only `npx expo run:ios` / `npx expo run:android` compile a native
  project — those need CocoaPods >= 1.10 (`brew install cocoapods`); an
  outdated CocoaPods fails with `Invalid Podfile ... undefined method
  'post_integrate'`.

## Dependency count note

`npm ls --all` reports **~1,100 packages**. This is expected and correct: the
project has only **8 direct dependencies** (see `package.json`), and the rest
is the transitive tree of the Expo SDK (Metro bundler, Babel, autolinking, the
Expo module system). There is nothing to trim — running `npm audit fix --force`
would *upgrade the SDK and break it*, so don't. Known `npm audit` findings
come from Expo SDK 50 transitive dev tooling and are addressed by future SDK
upgrades, not by manual pinning.

## Coding standards

See the workflow framework's project knowledge:
`../agentic-ai/.context/mole-smash-mini-game/CODING_STANDARDS.md`

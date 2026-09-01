import { useCallback, useEffect, useReducer } from "react";
import { createInitialState, tick, smash as engineSmash } from "../game/engine";
import { loadBestScore, saveBestScore } from "../storage/bestScore";

/** Game loop driver: bridges the pure engine to React state. */
export function useGameEngine() {
  const [state, dispatch] = useReducer(
    (s: ReturnType<typeof createInitialState>, action: { type: string; payload?: any }) => {
      switch (action.type) {
        case "tick":
          return tick(s, action.payload.now);
        case "smash":
          return engineSmash(s, action.payload.hole, action.payload.now);
        case "reset":
          return createInitialState(action.payload.now);
        case "setBest":
          return { ...s, bestScore: action.payload };
        default:
          return s;
      }
    },
    Date.now(),
    createInitialState,
  );

  useEffect(() => {
    loadBestScore().then((best) => {
      dispatch({ type: "setBest", payload: best });
    });
  }, []);

  useEffect(() => {
    if (state.finished) return;
    const id = setInterval(() => dispatch({ type: "tick", payload: { now: Date.now() } }), 50);
    return () => clearInterval(id);
  }, [state.finished]);

  useEffect(() => {
    if (state.finished) {
      saveBestScore(state.score);
    }
  }, [state.finished, state.score]);

  const smashHole = useCallback(
    (hole: number) => dispatch({ type: "smash", payload: { hole, now: Date.now() } }),
    [],
  );

  const restart = useCallback(() => dispatch({ type: "reset", payload: { now: Date.now() } }), []);

  return { state, smashHole, restart };
}

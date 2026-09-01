import React, { useState } from "react";
import { useGameEngine } from "./src/game/useGameEngine";
import HomeScreen from "./src/screens/HomeScreen";
import GameScreen from "./src/screens/GameScreen";
import GameOverScreen from "./src/screens/GameOverScreen";

type Route = "home" | "game" | "gameover";

export default function App() {
  const { state, smashHole, restart } = useGameEngine();
  const [route, setRoute] = useState<Route>("home");

  if (route === "home") {
    return <HomeScreen bestScore={state.bestScore} onPlay={() => setRoute("game")} />;
  }
  if (route === "game") {
    return (
      <GameScreen
        state={state}
        onSmash={smashHole}
        onFinish={() => setRoute("gameover")}
      />
    );
  }
  return (
    <GameOverScreen
      score={state.score}
      bestScore={state.bestScore}
      onPlayAgain={() => {
        restart();
        setRoute("game");
      }}
      onHome={() => setRoute("home")}
    />
  );
}

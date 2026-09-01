import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { colors, spacing } from "../theme/tokens";
import { HOLE_COUNT } from "../game/engine";
import { remainingSeconds } from "../game/timer";
import HoleButton from "../components/HoleButton";
import TimerBar from "../components/TimerBar";
import ScoreDisplay from "../components/ScoreDisplay";

type Props = {
  state: any;
  onSmash: (hole: number) => void;
  onFinish: () => void;
};

export default function GameScreen({ state, onSmash, onFinish }: Props) {
  useEffect(() => {
    if (state.finished) onFinish();
  }, [state.finished, onFinish]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TimerBar secondsRemaining={remainingSeconds(state.startedAt, Date.now())} />
        <ScoreDisplay current={state.score} best={state.bestScore} />
      </View>
      <View style={styles.grid}>
        {Array.from({ length: HOLE_COUNT }, (_, i) => (
          <View key={i} style={styles.cell}>
            <HoleButton
              isPopped={state.mole.hole === i}
              onPress={() => onSmash(i)}
              accessibilityLabel={`Mole at hole ${i + 1}`}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: spacing.md },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.lg },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: spacing.sm },
  cell: { width: "30%", aspectRatio: 1 },
});

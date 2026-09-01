import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme/tokens";
import PrimaryButton from "../components/PrimaryButton";
import ScoreDisplay from "../components/ScoreDisplay";

type Props = {
  score: number;
  bestScore: number;
  onPlayAgain: () => void;
  onHome: () => void;
};

export default function GameOverScreen({ score, bestScore, onPlayAgain, onHome }: Props) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Game Over</Text>
      <ScoreDisplay current={score} best={bestScore} />
      <PrimaryButton title="Play Again" onPress={onPlayAgain} />
      <PrimaryButton title="Home" onPress={onHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
  },
  title: {
    fontSize: typography.title,
    fontWeight: "700",
    color: colors.textPrimary,
  },
});

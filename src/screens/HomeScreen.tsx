import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme/tokens";
import PrimaryButton from "../components/PrimaryButton";
import ScoreDisplay from "../components/ScoreDisplay";

type Props = {
  bestScore: number;
  onPlay: () => void;
};

export default function HomeScreen({ bestScore, onPlay }: Props) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Mole Smash</Text>
      <ScoreDisplay current={0} best={bestScore} />
      <PrimaryButton title="Play" onPress={onPlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xl,
  },
  title: {
    fontSize: typography.title,
    fontWeight: "700",
    color: colors.textPrimary,
  },
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, typography } from "../theme/tokens";

type Props = {
  current: number;
  best: number;
};

/** Shows "Current: X  |  Best: Y". */
export default function ScoreDisplay({ current, best }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.current} accessibilityLiveRegion="polite">
        Current: {current}
      </Text>
      <Text style={styles.best}>Best: {best}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  current: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  best: {
    fontSize: typography.body,
    color: colors.textSecondary,
  },
});

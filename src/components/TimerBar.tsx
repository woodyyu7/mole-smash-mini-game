import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, typography } from "../theme/tokens";

type Props = {
  secondsRemaining: number;
};

/** Countdown display; colour shifts as time winds down. */
export default function TimerBar({ secondsRemaining }: Props) {
  const colour =
    secondsRemaining > 15
      ? colors.success
      : secondsRemaining > 5
        ? colors.primary
        : colors.error;

  return (
    <View style={styles.wrap}>
      <Text
        style={[styles.timer, { color: colour }]}
        accessibilityLiveRegion="polite"
        accessibilityLabel={`${secondsRemaining} seconds remaining`}
      >
        {secondsRemaining}s
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingVertical: 8,
  },
  timer: {
    fontSize: typography.heading,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
});

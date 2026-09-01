import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { colors, spacing, MIN_TOUCH_TARGET } from "../theme/tokens";

type Props = {
  isPopped: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
};

/**
 * A single mole hole. Memoized so a single mole pop does not re-render the
 * whole 3x3 grid (coding standards: performance).
 */
function HoleButton({ isPopped, onPress, accessibilityLabel }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.hole,
        isPopped && styles.popped,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? "Mole hole"}
      accessibilityHint="Tap to smash the mole"
    >
      <View style={styles.inner} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hole: {
    width: "100%",
    aspectRatio: 1,
    minWidth: MIN_TOUCH_TARGET,
    minHeight: MIN_TOUCH_TARGET,
    borderRadius: 999,
    backgroundColor: colors.holeIdle,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  popped: {
    backgroundColor: colors.holePopped,
    borderColor: colors.holePopped,
  },
  pressed: {
    opacity: 0.7,
  },
  inner: {
    width: "55%",
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: colors.holeIdle,
  },
});

export default memo(HoleButton);

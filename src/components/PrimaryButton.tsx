import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { colors, spacing, typography, MIN_TOUCH_TARGET } from "../theme/tokens";

type Props = {
  title: string;
  onPress: () => void;
};

/** Large, high-contrast primary action button. */
export default function PrimaryButton({ title, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 12,
    minHeight: MIN_TOUCH_TARGET,
    minWidth: MIN_TOUCH_TARGET * 4,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.85 },
  label: {
    color: "#FFFFFF",
    fontSize: typography.body,
    fontWeight: "700",
  },
});

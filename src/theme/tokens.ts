/**
 * Design tokens (from the UX spec §5).
 * Central place for colours, spacing, and typography so screens stay
 * consistent and WCAG-compliant.
 */
export const colors = {
  background: "#F5F5F5",
  backgroundDark: "#111820",
  primary: "#FF3E00",
  success: "#34C751",
  error: "#FF3E00",
  textPrimary: "#111820",
  textSecondary: "#6B7280",
  holeIdle: "#E5E7EB",
  holePopped: "#FF3E00",
  overlay: "rgba(0,0,0,0.4)",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  caption: 12,
  body: 16,
  heading: 24,
  title: 34,
};

/** Minimum interactive touch target (WCAG 2.2 AA). */
export const MIN_TOUCH_TARGET = 44;

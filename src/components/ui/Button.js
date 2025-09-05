import { StyleSheet, Pressable } from "react-native";
import { colors } from "../../lib/colors";
import { Typography } from "./Typography";

/**
 * Button component with variant, size, loading and disabled
 */
export function Button({
  children,
  onPress,
  variant = "solid",
  size = "md",
  disabled = false,
}) {
  const isDisabled = disabled;
  const sizeStyles = sizes[size];
  const variantStyles = variants[variant];

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        sizeStyles.container,
        variantStyles.container,
        isDisabled && styles.disabled,
        pressed && styles.pressed,
      ]}
      disabled={isDisabled}
    >
      <Typography
        weight={sizeStyles.weight}
        style={[styles.label, sizeStyles.label, variantStyles.label]}
      >
        {children}
      </Typography>
    </Pressable>
  );
}

const variants = {
  solid: {
    container: { backgroundColor: colors.primary },
    label: { color: colors.primaryForeground },
  },
  outline: {
    container: {
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: "transparent",
    },
    label: { color: colors.primary },
  },
  ghost: {
    container: { backgroundColor: colors.muted },
    label: { color: colors.primary },
  },
  danger: {
    container: { backgroundColor: colors.error },
    label: { color: colors.errorForeground },
  },
  link: {
    container: { backgroundColor: "transparent", paddingHorizontal: 0 },
    label: {
      color: colors.accent,
      textDecorationLine: "underline",
    },
  },
};

const sizes = {
  sm: {
    container: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 14 },
    label: { fontSize: 15 },
    weight: "medium",
  },
  md: {
    container: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 16 },
    label: { fontSize: 15 },
    weight: "medium",
  },
  lg: {
    container: { paddingVertical: 14, paddingHorizontal: 18, borderRadius: 16 },
    label: { fontSize: 17 },
    weight: "bold",
  },
};

const styles = StyleSheet.create({
  base: {
    minWidth: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    textAlign: "center",
  },
  disabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.8,
  },
});

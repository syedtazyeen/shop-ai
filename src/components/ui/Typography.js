import { Text, StyleSheet } from "react-native";

/**
 * Typography component with size and weight
 */
export function Typography({
  children,
  size = "body",
  weight = "normal",
  style,
}) {
  const sizeStyle = sizes[size] || {};
  const weightStyle = weights[weight] || {};

  return (
    <Text style={[styles.base, sizeStyle, weightStyle, style]}>{children}</Text>
  );
}

export const sizes = {
  title: { fontSize: 32 },
  subtitle: { fontSize: 26 },
  heading: { fontSize: 24 },
  subheading: { fontSize: 20 },
  body: { fontSize: 17 },
  caption: { fontSize: 15 },
  label: { fontSize: 12 },
};

export const weights = {
  light: { fontFamily: "Outfit_400Regular" },
  normal: { fontFamily: "Outfit_400Regular" },
  medium: { fontFamily: "Outfit_500Medium" },
  bold: { fontFamily: "Outfit_700Bold" },
};

const styles = StyleSheet.create({
  base: {
    color: "#111827",
  },
});

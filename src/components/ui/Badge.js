import { View, StyleSheet } from "react-native";
import React from "react";
import { Typography } from "./Typography";
import { colors } from "../../lib/colors";

export function Badge({
  text = "Badge",
  variant = "primary",
  size = "medium",
  weight = "normal",
}) {
  return (
    <View style={[styles.badge, sizeStyle[size], variantStyles[variant]]}>
      <Typography
        size={textsize[size]}
        weight={textweight[weight]}
        style={textcolor[variant]}
      >
        {text}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 24,
    alignSelf: "flex-start",
  },
});

const variantStyles = {
  primary: {
    backgroundColor: colors.muted,
  },
};

const sizeStyle = {
  small: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  medium: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
};

const textsize = {
  small: "caption",
  medium: "body",
  large: "medium",
};

const textweight = {
  small: "normal",
  medium: "medium",
  large: "bold",
};

const textcolor = {
  primary: colors.mutedForeground,
};

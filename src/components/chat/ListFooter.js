import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { colors } from "../../lib/colors";
import { useChatSelector } from "../../store/chat";
import { Typography } from "../ui";

const messages = [
  "Thinking...",
  "Searching the catalog...",
  "Finding the best match...",
  "Almost there...",
];

export function ListFooter() {
  const isLoading = useChatSelector((state) => state.isLoading);
  const [index, setIndex] = useState(0);

  const rotation = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (!isLoading) {
      setIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === messages.length - 1) return prev;
        return (prev + 1) % messages.length;
      });
    }, 3000);

    rotation.value = withRepeat(
      withSequence(
        withTiming(360, { duration: 1200 }),
        withTiming(0, { duration: 0 }) // reset instantly
      ),
      -1,
      false
    );

    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 600 }),
        withTiming(0.4, { duration: 600 })
      ),
      -1,
      true
    );

    return () => clearInterval(interval);
  }, [isLoading]);

  const squareStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
  }));

  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.square, squareStyle]} />
      <Animated.View style={textStyle}>
        <Typography size="body">{messages[index]}</Typography>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  square: {
    width: 16,
    height: 16,
    marginLeft: 2,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
});

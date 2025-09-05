import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./lib/colors";
import { Typography } from "./components/ui";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    setTimeout(() => {
      onFinish();
    }, 2000);
  }, [onFinish]);

  return (
    <Animated.View exiting={FadeOut.duration(300)} style={styles.container}>
      <Animated.View entering={FadeInDown.duration(300)}>
        <Ionicons name="bag-handle-sharp" size={48} color={colors.primary} />
      </Animated.View>
      <Animated.View entering={FadeIn.duration(300).delay(100)}>
        <Typography size="title" weight="medium">
          ShopAI
        </Typography>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});

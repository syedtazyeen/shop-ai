import { useEffect } from "react";
import { StyleSheet, Keyboard } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ChatInput, ChatHeader, ChatContent } from "./components/chat";
import { colors } from "./lib/colors";
import { useChatSelector } from "./store/chat";
import { ProductModal } from "./components/product";

/*
 * AdvisorScreen component to display the chat interface
 */
export default function AdvisorScreen() {
  const messageCount = useChatSelector((state) => state.count);
  const keyboardOffset = useSharedValue(0);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      keyboardOffset.value = withTiming(e.endCoordinates.height, {
        duration: 250,
      });
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      keyboardOffset.value = withTiming(0, { duration: 250 });
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, [keyboardOffset]);

  const animatedStyle = useAnimatedStyle(() => ({
    marginBottom: keyboardOffset.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <ChatHeader showEdit={messageCount > 0} />
      <ChatContent />
      <ChatInput />
      <ProductModal />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
});

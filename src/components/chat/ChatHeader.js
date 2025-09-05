import { View, StyleSheet, Pressable } from "react-native";
import { memo } from "react";
import { Typography } from "../ui";
import { useChatDispatch } from "../../store/chat";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { colors } from "../../lib/colors";

/**
 * ChatHeader component with chat input, header and content
 */
export const ChatHeader = memo(({ showEdit = false }) => {
  const dispatch = useChatDispatch();

  function handleNewChat() {
    dispatch({ type: "CLEAR_CHAT" });
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Ionicons name="bag-handle-sharp" size={24} color={colors.primary} />
        <Typography
          size="body"
          weight="medium"
          style={{ color: colors.foreground }}
        >
          ShopAI
        </Typography>
      </View>
      <View style={styles.right}>
        {showEdit && (
          <Pressable onPress={handleNewChat}>
            <FontAwesome6
              name="pen-to-square"
              size={20}
              color={colors.foreground}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

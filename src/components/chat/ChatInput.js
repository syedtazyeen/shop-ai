import { useRef, useMemo, useState, memo } from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Button, Typography } from "../ui";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../lib/colors";
import { useChatSelector } from "../../store/chat";
import { useChatActions } from "../../hooks/useChatActions";

export const ChatInput = memo(() => {
  const inputRef = (useRef < TextInput) | (null > null);
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const isSendDisabled = useMemo(() => !inputValue.trim(), [inputValue]);

  const { sendMessage, clearChat } = useChatActions();
  const hasExceeded = useChatSelector((state) => state.hasExceeded);

  const handleContainerPress = () => {
    inputRef.current?.focus();
  };

  const handleSend = () => {
    sendMessage(inputValue.trim());
    setInputValue("");
  };

  if (hasExceeded) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Typography size="body" weight="normal" style={styles.errorText}>
          You have reached the maximum suggestions limit for this chat.
        </Typography>
        <Button onPress={clearChat}>Start a New Chat</Button>
      </View>
    );
  }

  return (
    <Pressable onPress={handleContainerPress}>
      <View style={[styles.container, isInputFocused && styles.inputFocused]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          multiline
          numberOfLines={4}
          placeholder="Ask a suggestion..."
          placeholderTextColor={colors.mutedForeground}
          value={inputValue}
          onChangeText={setInputValue}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <View style={styles.buttonWrapper}>
          <Button disabled={isSendDisabled} onPress={handleSend}>
            <AntDesign
              name="arrowup"
              size={20}
              color={colors.primaryForeground}
            />
          </Button>
        </View>
      </View>
    </Pressable>
  );
});

const baseContainer = {
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 20,
  padding: 8,
  backgroundColor: colors.background,
};

const styles = StyleSheet.create({
  container: {
    ...baseContainer,
  },
  inputFocused: {
    borderColor: colors.mutedForeground,
  },
  input: {
    fontSize: 17,
    color: colors.foreground,
    width: "100%",
    paddingVertical: 4,
    fontFamily: "Outfit_400Regular",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  errorContainer: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  errorText: {
    textAlign: "center",
    maxWidth: 320,
    color: colors.mutedForeground,
    marginBottom: 8,
  },
});

import { FlatList, StyleSheet, Keyboard } from "react-native";
import { useRef, useCallback, useEffect } from "react";
import { useChatSelector } from "../../store/chat";
import { ListFooter } from "./ListFooter";
import { ListEmpty } from "./ListEmpty";
import { ListItem } from "./ListItem";

/**
 * ChatContent component
 * The component is used to display the chat messages and list items
 */
export function ChatContent() {
  const messages = useChatSelector((state) => state.messages);
  const cursorPosition = useChatSelector((state) => state.cursorPosition);

  const listRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (
      listRef.current &&
      cursorPosition > 0 &&
      cursorPosition < messages.length
    ) {
      // small delay to ensure content is rendered
      setTimeout(() => {
        listRef.current?.scrollToIndex({
          index: cursorPosition,
          animated: true,
          viewPosition: 0,
          viewOffset: 0,
        });
      }, 100);
    }
  }, [cursorPosition]);

  const onContentSizeChange = useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      scrollToBottom
    );
    return () => {
      keyboardDidShowListener.remove();
    };
  }, [scrollToBottom]);

  return (
    <FlatList
      ref={listRef}
      data={messages}
      renderItem={({ item }) => <ListItem {...item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={ListFooter}
      ListEmptyComponent={ListEmpty}
      onContentSizeChange={onContentSizeChange}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
        autoscrollToTopThreshold: 10,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 0,
    gap: 24,
    justifyContent: "flex-start",
  },
});

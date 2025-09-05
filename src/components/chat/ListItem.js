import { View, StyleSheet } from "react-native";
import { Typography } from "../ui/Typography";
import { SENDER } from "../../store/chat";
import { ProductCard } from "../product";
import { colors } from "../../lib/colors";

/**
 * ListItem component to display a message in chat
 */
export function ListItem(message) {
  if (message.sender === SENDER.USER) {
    return (
      <View style={styles.userMessageContainer}>
        <Typography>{message.text}</Typography>
      </View>
    );
  }

  return (
    <>
      <View style={styles.assistantMessageContainer}>
        <Typography>{message.text}</Typography>
      </View>
      {message.products?.length > 0 && (
        <View style={styles.productsContainer}>
          {message.products.map((product, index) => (
            <ProductCard key={index} index={index} {...product} />
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
    gap: 8,
    justifyContent: "flex-start",
  },
  userMessageContainer: {
    alignSelf: "flex-end",
    maxWidth: "80%",
    marginBottom: "auto",
    backgroundColor: colors.muted,
    borderRadius: 20,
    borderTopRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  assistantMessageContainer: {
    alignSelf: "flex-start",
  },
  productsContainer: {
    marginTop: 16,
    flexDirection: "column",
    gap: 16,
  },
});

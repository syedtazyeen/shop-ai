import { View, StyleSheet, Pressable } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Typography , Badge} from "../ui";
import { getCategories } from "../../api/product";
import { useChatActions } from "../../hooks/useChatActions";;
import { colors } from "../../lib/colors";

/**
 * ListEmpty component to display when the chat is empty
 */
export function ListEmpty() {
  const categories = getCategories();

  // Shuffle and pick 4 random categories
  const randomCategories = categories
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const { sendMessage } = useChatActions();
  const handleCategoryPress = (category) => {
    sendMessage(`Suggest me products in the category of ${category}`);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInDown.duration(300)}
        style={styles.titleContainer}
      >
        <Typography size="subtitle" weight="medium" style={styles.title}>
          Hello!
        </Typography>
        <Typography size="subtitle" weight="medium" style={styles.title}>
          What’s on your mind?
        </Typography>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.duration(300).delay(100)}
        style={styles.categories}
      >
        {randomCategories.map((category, index) => (
          <Pressable key={index} onPress={() => handleCategoryPress(category)}>
            <Badge text={category} />
          </Pressable>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    color: colors.primary,
    lineHeight: 28,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});

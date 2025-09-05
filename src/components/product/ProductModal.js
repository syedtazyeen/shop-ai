import { View, StyleSheet, BackHandler, Pressable } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
} from "react-native-reanimated";
import { useChatSelector, useChatDispatch, ACTIONS } from "../../store/chat";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../lib/colors";
import { Button, Typography } from "../ui";

/**
 * ProductModal component to display a product details
 */
export function ProductModal() {
  const selectedProduct = useChatSelector((state) => state.selectedProduct);
  const dispatch = useChatDispatch();

  function handleClose() {
    dispatch({ type: ACTIONS.SELECT_PRODUCT, payload: null });
  }

  useEffect(() => {
    if (!selectedProduct) return;

    const onBackPress = () => {
      handleClose();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => subscription.remove();
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300).delay(100)}
      style={styles.sheet}
    >
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={handleClose}>
          <Feather name="x" size={22} color={colors.foreground} />
        </Pressable>
      </View>

      <Animated.View
        entering={FadeInDown.duration(300).delay(100)}
        exiting={FadeOutDown.duration(300).delay(100)}
        style={styles.imageWrap}
      >
        <Feather name="image" size={28} color={colors.border} />
      </Animated.View>

      <Animated.ScrollView
        entering={FadeInDown.duration(300).delay(100)}
        exiting={FadeOutDown.duration(300).delay(100)}
        contentContainerStyle={styles.contentContainer}
        style={styles.content}
      >
        <Typography size="heading" weight="medium" style={styles.price}>
          ₹{selectedProduct.price}
        </Typography>
        <Typography size="body" weight="medium" style={styles.name}>
          {selectedProduct.name}
        </Typography>
        <Typography size="caption" style={styles.brand}>
          {selectedProduct.brand}
        </Typography>

        <View style={styles.detailsWrap}>
          <Typography size="body" style={styles.details}>
            {selectedProduct.details}
          </Typography>
          <Typography size="body" style={styles.details}>
            {selectedProduct.description}
          </Typography>
        </View>
      </Animated.ScrollView>

      <Animated.View
        entering={FadeIn.duration(300).delay(100)}
        exiting={FadeOut.duration(300)}
        style={styles.buttonWrapper}
      >
        <Button size="lg" style={styles.buyButton}>
          Buy Now
        </Button>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
  },
  closeButton: {
    padding: 8,
    backgroundColor: colors.background,
    borderRadius: 24,
  },
  imageWrap: {
    width: "100%",
    height: 220,
    backgroundColor: colors.muted,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  price: {
    color: colors.foreground,
    marginBottom: 8,
  },
  name: {
    color: colors.foreground,
    marginBottom: 4,
  },
  brand: {
    color: colors.mutedForeground,
    marginBottom: 16,
  },
  detailsWrap: {
    gap: 16,
    marginBottom: 0,
  },
  details: {
    color: colors.foreground,
    lineHeight: 20,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
    zIndex: 20,
  },
  buyButton: {
    width: "100%",
  },
});

import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../lib/colors";
import { useChatDispatch, ACTIONS } from "../../store/chat";
import { useChatSelector } from "../../store/chat";
import { Typography } from "../ui/Typography";
import { Button } from "../ui";

/**
 * ProductCard component to display a product card
 * @param {Object} item - The product item
 */
export function ProductCard(item) {
  const selectedProduct = useChatSelector((state) => state.selectedProduct);
  const isSelected = selectedProduct?.id === item.id;
  const dispatch = useChatDispatch();

  const handlePress = () => {
    dispatch({
      type: ACTIONS.SELECT_PRODUCT,
      payload: isSelected ? null : item,
    });
  };

  return (
    <View style={styles.card}>
      {item.index > 0 && <View style={styles.divider} />}
      <TouchableOpacity onPress={handlePress} style={styles.pressable}>
        <View style={styles.cardContent}>
          <View style={styles.iconWrap}>
            <Feather name="image" size={22} color={colors.border} />
          </View>
          <View style={styles.textWrap}>
            <View style={styles.priceWrap}>
              <Typography size="body" weight="medium" style={styles.price}>
                ₹{item.price}
              </Typography>
              <Button
                size="sm"
                variant="ghost"
                onPress={handlePress}
                style={styles.button}
              >
                Get
              </Button>
            </View>
            <Typography size="body" style={styles.name}>
              {item.name}
            </Typography>
            <Typography size="label" style={styles.meta}>
              {item.brand}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
      <Typography size="caption" style={styles.reason}>
        {item.reason}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    
  },
  card: {
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    marginBottom: 8,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: colors.muted,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrap: {
    flex: 1,
    justifyContent: "center",
  },
  priceWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    marginLeft: 8,
    paddingHorizontal: 16,
  },
  price: {
    marginBottom: 2,
    color: colors.foreground,
  },
  name: {
    marginBottom: 1,
    color: colors.foreground,
  },
  meta: {
    lineHeight: 12,
    color: colors.mutedForeground,
  },
  reason: {
    color: colors.mutedForeground,
  },
  divider: {
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: colors.muted,
  },
  selected: {},
});

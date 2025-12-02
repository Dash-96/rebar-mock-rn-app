import { View, Pressable, Text, StyleSheet } from "react-native";
import { colors } from "@/app/styles/rootStyle";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  handleBasePick: () => void;
  isFocused: boolean;
  base: string;
  price?: number;
}

export default function BasePickerItem({ isFocused, handleBasePick, base, price }: Props) {
  return (
    <View style={styles.itemWraper}>
      <Pressable onPress={handleBasePick} style={styles.radioBtn}>
        <Ionicons name={isFocused ? "radio-button-on" : "radio-button-off"} size={24} color={isFocused ? colors.primary : "black"} />
      </Pressable>
      <Text style={styles.baseLabel}>{base}</Text>
      <Text style={styles.priceLabel}>{price ? "\u20AA" + price : ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemWraper: {
    flexDirection: "row",
    direction: "rtl",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  baseLabel: {
    letterSpacing: 1,
  },
  radioBtn: {
    alignSelf: "flex-start",
  },
  priceLabel: {
    marginRight: "auto",
  },
});

import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "@/app/styles/rootStyle";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
  handlePickSize: (size: string) => void;
  iconSize: number;
  size: string;
  sizeSymbol: string;
  isFocused: boolean;
  price: number;
}
export default function SizePickerItem({
  handlePickSize,
  size,
  sizeSymbol,
  iconSize,
  isFocused,
  price,
}: Props) {
  return (
    <View>
      <Pressable onPress={() => handlePickSize(size)} style={styles.sizeItem}>
        <MaterialCommunityIcons
          name="cup"
          size={iconSize}
          color={isFocused ? colors.primary : "gray"}
        />
        <Text>{sizeSymbol}</Text>
      </Pressable>
      <Text style={styles.priceItem}>
        {"\u20AA"}
        {price}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sizeItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    alignItems: "center",
    padding: 5,
  },
  priceItem: {
    marginTop: 10,
    fontSize: 16,
    alignSelf: "center",
  },
});

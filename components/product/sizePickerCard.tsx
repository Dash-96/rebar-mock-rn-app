import { useProductsStore } from "@/app/store";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SizePickerItem from "./sizePickerItem";

interface Props {
  price: number;
}
export default function SizePickerCard({ price }: Props) {
  const smallPrice = price;
  const mediumPrice = price + 5;
  const largePrice = price + 9;

  //use this to control which item is in focus now
  const defaultFocus = {
    small: false,
    medium: false,
    large: false,
  };
  const [focus, setFocus] = useState(defaultFocus);
  const productState = useProductsStore((state) => state.product);
  const setProdcutClientState = useProductsStore((state) => state.setProduct);
  //const product = useProductContext();

  function pickSize(size: string) {
    setFocus({ ...defaultFocus, [size]: true });
    let price = size === "small" ? smallPrice.toString() : size === "medium" ? mediumPrice.toString() : largePrice.toString();
    setProdcutClientState({
      size: size as "small" | "medium" | "large",
      price: price,
    });
  }
  return (
    <View style={styles.cardContainer}>
      <Text>איזה גודל בא לך?</Text>
      <View style={styles.sizeContainer}>
        <SizePickerItem handlePickSize={pickSize} iconSize={40} sizeSymbol="S" size="small" price={smallPrice} isFocused={focus["small"]}></SizePickerItem>
        <SizePickerItem handlePickSize={pickSize} iconSize={46} size="medium" sizeSymbol="M" price={mediumPrice} isFocused={focus["medium"]}></SizePickerItem>
        <SizePickerItem handlePickSize={pickSize} iconSize={52} size="large" sizeSymbol="L" price={largePrice} isFocused={focus["large"]}></SizePickerItem>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    height: 150,
  },
  sizeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    gap: 20,
  },
});

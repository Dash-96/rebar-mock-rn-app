import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "@/app/styles/rootStyle";
import { useProductsStore } from "@/app/store";

//
export interface UpgradeData {
  keyAlias: string;
  title: string;
  price: number;
}
export interface Props extends UpgradeData {
  onUpgradeSelect: (item: UpgradeData, modifier: number) => void;
}
export default function UpgradeItem({ keyAlias, title, price, onUpgradeSelect }: Props) {
  const [itemCounter, setItemCounter] = useState<number>(0);
  return (
    <View style={styles.itemContainer}>
      <View style={[styles.numBox, itemCounter !== 0 ? styles.numBoxActive : ""]}>
        <Text style={styles.numBoxText}>{itemCounter === 0 ? "" : itemCounter}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.plusMinusWraper}>
        <Pressable
          onPress={() => {
            setItemCounter((prev) => prev + 1);
            onUpgradeSelect({ keyAlias, title, price }, +1);
          }}
        >
          <Entypo name="plus" size={20} color="black" />
        </Pressable>
        <AntDesign name="line" size={24} color="black" style={styles.seperateLine} />
        <Pressable
          onPress={() => {
            setItemCounter((prev) => (prev === 0 ? 0 : prev - 1));
            onUpgradeSelect({ keyAlias, title, price }, -1);
          }}
        >
          <Entypo name="minus" size={20} color="black" />
        </Pressable>
      </View>
      <Text style={styles.priceText}>{"\u20AA" + price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  numBox: {
    width: 25,
    height: 25,
    borderRadius: 2,
    borderColor: colors.default_bg,
    borderWidth: 2,
    marginLeft: 10,
    alignItems: "center",
  },
  numBoxActive: {
    borderColor: colors.primary,
  },
  numBoxText: {
    color: colors.secondary,
  },
  title: {
    width: "50%",
    // letterSpacing: 1,
  },
  plusMinusWraper: {
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    backgroundColor: colors.default_bg,
    borderRadius: 20,
  },
  seperateLine: {
    transform: "rotateZ(90deg)",
    color: colors.secondary_text,
  },
  priceText: {
    color: colors.secondary_text,
    fontWeight: "bold",
    marginRight: "auto",
    fontSize: 16,
  },
});

import { View, StyleSheet, Text, Image } from "react-native";
import { colors } from "@/app/styles/rootStyle";
import { Product } from "@/models/productModel";
import { IMAGE_BASE_URL } from "@/config/constants";
import { useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

interface Props {
  item: Product;
}
export default function MenuItem({ item }: Props) {
  useEffect(() => {});
  return (
    <View style={MenuItemStyle.itemContainer}>
      <Image
        source={{ uri: IMAGE_BASE_URL + item.image }}
        style={MenuItemStyle.image}
      ></Image>
      <View style={MenuItemStyle.titleIngredientWraper}>
        <Text style={MenuItemStyle.title}>{item.name}</Text>
        <Text style={MenuItemStyle.ingredientsText}>{item.ingredients}</Text>
      </View>
      <MaterialIcons
        onPress={() =>
          router.push({
            pathname: "/(tabs)/menu/product/[id]",
            params: { id: (item.id - 1).toString() },
          })
        }
        name="keyboard-arrow-left"
        size={24}
        color="black"
      />
    </View>
  );
}

const MenuItemStyle = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    direction: "rtl",
    height: 100,
    paddingHorizontal: 10,
  },
  ingredientsText: {
    direction: "ltr",
    textAlign: "right",
    marginRight: 10,
  },
  titleIngredientWraper: {
    justifyContent: "center",
    alignContent: "center",
    width: "70%",
  },
  image: {
    width: 70,
    height: 70,
  },
  title: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  // cardContainer: {
  //   flex: 1,
  //   height: 300,
  //   width: 250,
  //   alignItems: "center",
  //   flexDirection: "column",
  //   backgroundColor: colors.card_bg,
  //   borderWidth: 2,
  //   borderRadius: 10,
  //   borderColor: "black",
  // },
});

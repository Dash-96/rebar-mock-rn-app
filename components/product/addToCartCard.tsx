import { View, Button, StyleSheet, Pressable, Text, ToastAndroid } from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { Link, router } from "expo-router";
import { colors } from "@/app/styles/rootStyle";
import { useCartStore, useProductsStore } from "@/app/store";
import { Upgrade } from "@/models/productModel";
export default function AddToCartCard() {
  const productState = useProductsStore((state) => state.product);
  const setCart = useCartStore((state) => state.addCartItem);

  function printProduct(name: string, item: any) {
    console.log(`===${name}===`);
    Object.entries(item).forEach(([key, value]) => {
      console.log(`${key} --- ${value}`);
      if (typeof value === "object") {
        printProduct(key, value);
      }
    });
  }

  function getPrice() {
    let total = parseInt(productState.price) + productState.basePrice;
    productState.upgrades.forEach((upgrade) => {
      total += upgrade.price * upgrade.quaintity;
    });
    return total;
  }

  function addItem() {
    setCart(productState);
    ToastAndroid.show("מוצר נוסף לעגלה", ToastAndroid.SHORT);
  }

  function navigateToCart() {
    router.navigate("/(tabs)/cart");
  }

  return (
    <View style={styles.cardContainer}>
      <Pressable onPress={addItem}>
        <Text style={styles.link}>הוספה לסל</Text>
      </Pressable>
      <Pressable onPress={() => printProduct("product", productState)}>
        <Text>בדיקה</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={navigateToCart}>
        <Text style={styles.text}>לתשלום {getPrice()}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    direction: "rtl",
    backgroundColor: colors.basic_bg,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
    height: 90,
    borderRadius: 10,
    position: "sticky",
    bottom: 0,
  },
  link: {
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: colors.dark_card_bg,
    height: 40,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  text: { textAlign: "center", color: "white", fontWeight: "bold" },
});

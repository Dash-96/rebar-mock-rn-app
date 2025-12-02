import { useCartStore } from "@/app/store";
import { colors } from "@/app/styles/rootStyle";
import CartItem from "@/components/cart/cartItem";
import CartListCard from "@/components/cart/cartListCard";
import CartSummaryCard from "@/components/cart/cartSummaryCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
export default function CartScreen() {
  const cartState = useCartStore((state) => state.cart);
  const queryClient = useQueryClient();

  const { data, isError, error, mutate } = useMutation({ mutationKey: ["checkout"], mutationFn: createCheckout });

  useEffect(() => {
    cartState.cartItems.forEach((item) => console.log(item));
  }, []);
  return (
    <ScrollView style={styles.pageWraper}>
      <CartListCard cartItems={cartState.cartItems} />
      <CartSummaryCard
        total={cartState.cartItems.reduce((acc, item) => {
          return acc + Number(item.price);
        }, 0)}
      />
      <Pressable onPress={} style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>
          לתשלום{"   "}
          {cartState.cartItems.reduce((acc, item) => {
            return acc + Number(item.price);
          }, 0)}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageWraper: {
    marginHorizontal: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  checkoutButton: {
    backgroundColor: "black",
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    height: 30,
  },
  checkoutText: {
    color: "white",
  },
});

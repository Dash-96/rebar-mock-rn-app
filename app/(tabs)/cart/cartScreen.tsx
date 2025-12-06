import { createOrder } from "@/api/orderAPI";
import { useCartStore } from "@/app/store";
import CartListCard from "@/components/cart/cartListCard";
import CartSummaryCard from "@/components/cart/cartSummaryCard";
import { Order, OrderItem } from "@/models/orderModel";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
export default function CartScreen() {
  const cartState = useCartStore((state) => state.cart);
  const totalPrice = cartState.cartItems.reduce((acc, item) => {
    return acc + Number(item.totalPrice);
  }, 0);

  const { data, isError, error, mutate } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: (order: Order) => createOrder(order),
  });

  function checkout() {
    console.log("checkout called");
    const items: OrderItem[] = [];
    cartState.cartItems.forEach((cartItem) => {
      items.push({ productId: cartItem.id, price: Number(cartItem.price) });
    });
    mutate({ totalPrice: totalPrice, items: items });
  }

  useEffect(() => {
    cartState.cartItems.forEach((item) => console.log(item));
  }, [cartState]);
  return (
    <ScrollView style={styles.pageWraper}>
      <CartListCard cartItems={cartState.cartItems} />
      <CartSummaryCard total={totalPrice} />
      <Pressable onPress={checkout} style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>
          לתשלום{"   "}
          {totalPrice}
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

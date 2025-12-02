import { ProductClientState } from "@/models/productModel";
import { View, Text, StyleSheet } from "react-native";
import CartItem from "./cartItem";
import { colors } from "@/app/styles/rootStyle";
interface Props {
  cartItems: ProductClientState[];
}
export default function CartListCard({ cartItems }: Props) {
  return (
    <View style={styles.cartList}>
      <View style={styles.headerWraper}>
        <Text style={styles.mainHeader}>
          ההזמנה שלי {"("}
          {cartItems.length}
          {")"}
        </Text>
        <Text style={styles.secondaryHeader}>לעריכה יש ללחוץ על שורת המוצר</Text>
      </View>
      {cartItems.map((item, index, cartItems) => {
        return (
          <View key={index}>
            <CartItem productState={item} />
            {index !== cartItems.length - 1 && <View style={styles.spreator} />}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  cartList: {
    backgroundColor: "white",
  },
  spreator: {
    height: 1,
    width: "90%",
    backgroundColor: colors.secondary_text,
    alignSelf: "center",
    marginVertical: 10,
  },
  headerWraper: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  mainHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryHeader: {
    fontSize: 14,
    color: colors.secondary_text,
  },
});

import { colors } from "@/app/styles/rootStyle";
import { IMAGE_BASE_URL } from "@/config/constants";
import { ProductClientState } from "@/models/productModel";
import { flattenUpgrades, getSizeSymbol } from "@/utils/cartUtils";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  productState: ProductClientState;
}
export default function CartItem({ productState }: Props) {
  return (
    <Pressable style={styles.itemContainer}>
      <View style={styles.rowWraper}>
        {/*image and quantity wraper */}
        <Text style={styles.dimText}>x{productState.quantity}</Text>
        <Image style={styles.image} source={{ uri: IMAGE_BASE_URL + productState.image }}></Image>
      </View>
      <View style={styles.multiRowsWraper}>
        <View style={[styles.rowWraper, styles.fullRow]}>
          {/*name size and price wraper */}
          <Text style={styles.title}>{productState.name}</Text>
          <View style={styles.sizeWraper}>
            <Text style={styles.size}>{getSizeSymbol(productState.size)}</Text>
          </View>
          <Text style={[styles.price, styles.priceMain]}>
            {"\u20AA"}
            {productState.price}
          </Text>
        </View>
        {productState.changes.length > 0 && (
          <View>
            <Text style={[styles.extras, styles.dimText]}>{productState.changes}</Text>
          </View>
        )}
        {productState.base && (
          <View style={[styles.rowWraper, styles.fullRow]}>
            <Text style={[styles.extras, styles.dimText]}>{productState.base}</Text>
            <Text style={[styles.price, styles.priceSecondary, styles.dimText]}>
              {"\u20AA"}
              {productState.basePrice}
            </Text>
          </View>
        )}
        {flattenUpgrades(productState.upgrades).map((upgrade, index) => {
          return (
            <View key={index} style={[styles.rowWraper, styles.fullRow]}>
              <Text style={[styles.extras, styles.dimText]}>{upgrade.title}</Text>
              <Text style={[styles.price, styles.priceSecondary, styles.dimText]}>
                {"\u20AA"}
                {upgrade.price}
              </Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: "auto",
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  multiRowsWraper: {
    justifyContent: "center",
    // backgroundColor: "wheat",
  },
  rowWraper: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "wheat",
  },
  fullRow: {
    width: "90%",
    // backgroundColor: "white",
  },
  image: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  extras: {
    width: "50%",
    fontSize: 12,
    marginBottom: 2,
  },
  size: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "justify",
  },
  sizeWraper: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 17,
    height: 17,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  price: {
    marginRight: "auto",
  },
  priceMain: {
    fontSize: 14,
    fontWeight: "bold",
  },
  priceSecondary: {
    fontSize: 12,
  },
  dimText: {
    color: colors.secondary_text,
    fontWeight: "bold",
  },
});

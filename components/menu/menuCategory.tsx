import { Product } from "@/models/productModel";
import { Text, View, FlatList, StyleSheet } from "react-native";
import MenuItem from "@/components/menu/menuItem";
import { useMenuContext } from "./menuContext";
import { useEffect, useState } from "react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useQueryData } from "@/utils/menuUtils";
interface Props {
  category: string;
  // products: Product[];
}
export default function CategoryScrollBar({ category }: Props) {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  //.Custom hook that uses the react query functionality and wraps it
  const products: Product[] = useQueryData<Product[]>("products");
  useEffect(() => {
    setCategoryProducts(products?.filter((item) => item.category === category));
  }, [products]);

  //FlatList item render function
  const renderProduct = ({ item }: { item: Product }) => {
    return <MenuItem item={item}></MenuItem>;
  };
  //FlatList header render function
  const listHeaderComponent = () => {
    return <Text style={styles.title}>{category}</Text>;
  };
  if (categoryProducts.length === 0) {
    return;
  }
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={categoryProducts}
        renderItem={renderProduct}
        ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={() => <View style={styles.seperator}></View>}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "flex-start",
  },
  seperator: {
    height: 1,
    backgroundColor: "#d5d5d5",
  },
  listContent: {
    paddingHorizontal: 10,
    gap: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginTop: 50,
    marginBottom: 10,
  },
});

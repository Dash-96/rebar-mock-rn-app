import SizePickerCard from "@/components/product/sizePickerCard";
import { IMAGE_BASE_URL } from "@/config/constants";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { ProductContext } from "@/components/product/prodcutContext";
import { useProduct } from "@/utils/productUtils";
import BasePickerCard from "@/components/product/basePickerCard";
import CustomChangesCard from "@/components/product/customChangesCard";
import UpgradesCard from "@/components/product/upgradesCard";
import AddToCartCard from "@/components/product/addToCartCard";
import { colors } from "@/app/styles/rootStyle";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function ProductScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });

    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: "flex" });
    };
  }, [navigation]);
  let { product, productState } = useProduct();

  if (!product) {
    return <Text>Loading Product...</Text>;
  }

  return (
    // <ProductContext.Provider value={productState}>
    <View style={productPageStyles.pageWraper}>
      <ScrollView style={productPageStyles.scrollWraper}>
        <Image source={{ uri: IMAGE_BASE_URL + product.image }} style={productPageStyles.productImage}></Image>
        <SizePickerCard price={parseInt(product.price)}></SizePickerCard>
        <BasePickerCard ingredients={product.ingredients}></BasePickerCard>
        <CustomChangesCard />
        <UpgradesCard />
      </ScrollView>
      <AddToCartCard />
    </View>
    // </ProductContext.Provider>
  );
}

const productPageStyles = StyleSheet.create({
  pageWraper: {
    flex: 1,
  },
  scrollWraper: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.card_bg,
    position: "relative",
  },

  productImage: {
    alignSelf: "center",
    width: 200,
    height: 200,
  },
});

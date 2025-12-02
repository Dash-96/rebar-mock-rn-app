import { View, Text, StyleSheet } from "react-native";
import UpgradeItem from "@/components/product/upgradeItem";
import { upgrades, useUpgrades } from "@/utils/productUtils";
import { colors } from "@/app/styles/rootStyle";
import { useProductsStore } from "@/app/store";
import { useEffect } from "react";

export default function UpgradesCard() {
  const setProductState = useProductsStore((state) => state.setProduct);
  const { upgradesList, handleUpgradesChange } = useUpgrades();
  useEffect(() => {
    // console.log(upgradesList);
    let upgrades = Array.from(upgradesList.values());
    setProductState({ upgrades });
  }, [upgradesList]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>שדרוגים והתאמות</Text>
      {upgrades.map((item, index) => (
        <UpgradeItem key={index} title={item.title} price={item.price} keyAlias={`item-${index + 1}`} onUpgradeSelect={handleUpgradesChange} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "white",
    direction: "rtl",
    gap: 20,
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
});

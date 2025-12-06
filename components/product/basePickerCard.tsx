import { useProductsStore } from "@/app/store";
import { getBaseType } from "@/utils/productUtils";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BasePickerItem from "./basePickerItem";

interface Props {
  ingredients: string;
}
export default function BasePickerCard({ ingredients }: Props) {
  //based on the type different options wii be displayed
  const baseType = useRef<"milk" | "juice">("milk");

  //use this to control which item is in focus now
  const defaultFocus = {
    yogurt: false,
    ricota: false,
    "no-sugar": false,
    soy: false,
    "no-yogurt": false,
    apple: false,
    orange: false,
  };
  const [focus, setFocus] = useState(defaultFocus);
  const productState = useProductsStore((state) => state.product);
  const setProductClientState = useProductsStore((state) => state.setProduct);
  useEffect(() => {
    setFocus({ ...defaultFocus, yogurt: true, apple: true });
    baseType.current = getBaseType(ingredients);
  }, []);
  function pickBase(base: string, baseTitle: string, basePrice: number = 0) {
    setFocus({ ...defaultFocus, [base]: true });

    setProductClientState({ base: baseTitle, basePrice: basePrice });
  }
  if (baseType.current === "milk") {
  }
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>לשנות בסיס?</Text>
      {baseType.current === "milk" && (
        <View style={styles.itemsContainer}>
          <BasePickerItem handleBasePick={() => pickBase("yogurt", "יוגורט regurt")} base="יוגורט regurt" isFocused={focus["yogurt"]} />
          <BasePickerItem
            handleBasePick={() => pickBase("ricota", "חיזוק חלבון - ריקוטה מעושרת", 3)}
            isFocused={focus["ricota"]}
            base="חיזוק חלבון - ריקוטה מעושרת"
            price={3}
          />
          <BasePickerItem handleBasePick={() => pickBase("no-sugar", "יוגורט טבעי ללא סוכר")} isFocused={focus["no-sugar"]} base="יוגורט טבעי ללא סוכר" />
          <BasePickerItem handleBasePick={() => pickBase("soy", "פרוזן טבעוני", 3)} isFocused={focus["soy"]} base="פרוזן טבעוני" price={3} />
          <BasePickerItem handleBasePick={() => pickBase("no-yogurt", "  ללא יוגורט")} isFocused={focus["no-yogurt"]} base="  ללא יוגורט" />
        </View>
      )}

      {baseType.current === "juice" && (
        <View style={styles.itemsContainer}>
          <BasePickerItem handleBasePick={() => pickBase("apple-juice", "מיץ תפוחים")} base="מיץ תפוחים" isFocused={focus["apple"]} />
          <BasePickerItem handleBasePick={() => pickBase("orange-juice", "מיץ תפוזים ")} isFocused={focus["orange"]} base="מיץ תפוזים " />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 20,
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemsContainer: {
    alignSelf: "flex-end",
    gap: 20,
  },
});

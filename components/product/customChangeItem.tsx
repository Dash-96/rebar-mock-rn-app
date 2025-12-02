import { colors } from "@/app/styles/rootStyle";
import { useState } from "react";
import { Pressable, Text, View, StyleSheet, ToastAndroid } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocus, useSelectVisible } from "@/utils/productUtils";

interface Props {
  itemName: string;
  onChangeSelect: (action: string, item: string, modifier: string) => void;
  // changesList: string[];
  changesMap: Map<string, string>;
  type: "change" | "add-on";
}

export default function CustomChangeItem({ itemName, onChangeSelect, changesMap, type }: Props) {
  const { focus, focusItem, unFocusAll } = useFocus(type);
  const { quantitySelectVisible, showQuantitySelect } = useSelectVisible();
  function shouldFocus() {
    if (changesMap.size === 3 && !changesMap.get(itemName)) {
      return false;
    } else {
      return true;
    }
  }
  function shouldExpandQuantitySelect() {
    if (changesMap.size === 3) {
      ToastAndroid.show("ניתן לבחור עד 3 רכיבים", ToastAndroid.SHORT);
      return false;
    } else {
      return true;
    }
  }
  return (
    /* This block handles the openeing and closing of the quantity change bar
        when a bar is opened it counts as if the user made a change
        when a bar is closed it counts as if the user disregarded the change
        only three bars are allowed to be open at a time to inidcate to the user of maximum three changes
        but no actual change should be made since the user did not select quantity yet
    */
    <Pressable
      onPress={() => {
        if (shouldExpandQuantitySelect()) showQuantitySelect(true);
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          onPress={() => {
            unFocusAll();
            showQuantitySelect(false);
            onChangeSelect("remove", itemName, "");
          }}
        >
          {quantitySelectVisible && <Ionicons name="close" size={24} color="black" />}
        </Pressable>
        <Text style={styles.text}>{itemName}</Text>
      </View>
      <View style={[styles.quantitySelectContainer, quantitySelectVisible ? styles.show : styles.hide]}>
        {/*
         Individual quantity modifiers in every bar 
        */}
        {/* {(Object.entries(modifierMap) as [focusKey, string][]).map(([key, value]) => {
          return (
            <Pressable
              key={key}
              onPress={() => {
                if (shouldFocus()) focusItem(key);
                onChangeSelect(focus[key] ? "remove" : "add", itemName);
              }}
              style={[styles.selectItem, focus[key] ? styles.highlight : ""]}
            >
              <Text style={styles.text}>{value}</Text>
            </Pressable>
          );
        })} */}
        <Pressable
          onPress={() => {
            if (shouldFocus()) focusItem(type === "change" ? "none" : "bit");
            onChangeSelect(focus[type === "change" ? "none" : "bit"] ? "remove" : "add", itemName, type === "change" ? "בלי" : "מעט");
          }}
          style={[styles.selectItem, focus[type === "change" ? "none" : "bit"] ? styles.highlight : ""]}
        >
          <Text style={styles.text}>{type === "change" ? "בלי" : "מעט"}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (shouldFocus()) focusItem(type === "change" ? "bit" : "regular");
            onChangeSelect(focus[type === "change" ? "bit" : "regular"] ? "remove" : "add", itemName, type === "change" ? "מעט" : "רגיל");
          }}
          style={[styles.selectItem, focus[type === "change" ? "bit" : "regular"] ? styles.highlight : ""]}
        >
          <Text style={styles.text}>{type === "change" ? "מעט" : "רגיל"}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (shouldFocus()) focusItem("alot");
            onChangeSelect(focus["alot"] ? "remove" : "add", itemName, "הרבה");
          }}
          style={[styles.selectItem, focus["alot"] ? styles.highlight : ""]}
        >
          <Text style={styles.text}>הרבה</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  quantitySelectContainer: {
    flexDirection: "row",
    backgroundColor: colors.card_bg,
    width: "100%",
    height: 40,
    alignItems: "center",
    borderRadius: 20,
  },
  hide: {
    display: "none",
  },
  show: {
    display: "flex",
  },

  text: {
    fontSize: 16,
  },

  selectItem: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  highlight: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 20,
  },
});

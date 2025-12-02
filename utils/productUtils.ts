import { useProductsStore } from "@/app/store";
import UpgradeItem, { UpgradeData } from "@/components/product/upgradeItem";
// import { ingredient, Upgrade } from "@/models/ingredientModel";
import { Product, ProductClientState, Ingredient, Upgrade } from "@/models/productModel";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";

//later may need to transfer to db
export const upgrades = [
  { title: "20 גרם חלבון - וניל", price: 6 },
  { title: "20 גרם חלבון - טבעי", price: 6 },
  { title: "ספירולינה ירוקה", price: 6 },
  { title: "20 גרם חלבון - סויה וניל", price: 6 },
  { title: "ספירולינה כחולה", price: 6 },
  { title: "מאצ'ה", price: 6 },
  { title: "עשב חיטה", price: 6 },
  { title: "חלבון - שוקולד", price: 6 },
];

/*Custom hooks */
export function useProduct() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product>();
  const [productState, setProductState] = useState<ProductClientState>();
  const setProductClientState = useProductsStore((state) => state.setProduct);
  const queryClient = useQueryClient();
  const products: Product[] | undefined = queryClient.getQueryData(["products"]);
  //Creating the initial ProductState with default values
  //And also setting the current selected Product to display the product page
  useEffect(() => {
    let currentProduct = products?.[parseInt(id.toString())];
    setProduct(currentProduct);
    if (!currentProduct) return;
    let currentProductState: ProductClientState = {
      ...currentProduct,
      price: "0",
      quantity: 1,
      size: "small",
      changes: [],
      upgrades: [],
      base: "",
      basePrice: 0,
    };
    setProductClientState(currentProductState);
  }, []);
  return { product, productState };
}

//Custom hook to control the focus of the custom change item quaintity
export const useFocus = (type: string) => {
  //default focus state of each quantity selector
  const defaultFocus = {
    none: false,
    bit: false,
    regular: false,
    alot: false,
  };
  type focusKey = keyof typeof defaultFocus;
  const [focus, setFocus] = useState(defaultFocus);
  const [modifierArray, setModifierArray] = useState<focusKey[]>(["none", "bit", "alot"]);
  useEffect(() => {
    let array: focusKey[] = type === "add-on" ? ["bit", "regular", "alot"] : ["none", "bit", "alot"];
    setModifierArray(array);
  }, []);
  function focusItem(quantity: focusKey) {
    //toggles the selected item on and off
    setFocus((prev) => ({ ...defaultFocus, [quantity]: !prev[quantity] }));
  }
  function unFocusAll() {
    setFocus(defaultFocus);
  }
  return { focus, focusItem, unFocusAll, modifierArray };
};

//Cusom hook to control the visibilty of the custom change quantity select bar
export const useSelectVisible = () => {
  //sets the visibilty of quantity select row
  const [quantitySelectVisible, setQuantitySelectVisisble] = useState(false);
  function showQuantitySelect(isVisible: boolean) {
    setQuantitySelectVisisble(isVisible);
  }
  return { quantitySelectVisible, showQuantitySelect };
};

//this hook handles the changes in ingredieants made by the user
export function useCustomChanges() {
  // const [changesList, setChangesList] = useState<string[]>([]);
  const [changesMap, setChangesMap] = useState<Map<string, string>>(new Map());
  function handleCustomChanges(action: string, changeItem: string, modifier?: string) {
    //This condition checks if a user trying to make a fourth change
    if (action === "add" && changesMap.size === 3 && !changesMap.get(changeItem)) {
      ToastAndroid.show("ניתן לבחור עד 3 רכיבים", ToastAndroid.SHORT);
      return;
    }
    setChangesMap((prev) => {
      //Case for adding an item
      const newMap = new Map(prev);
      if (action === "add" && modifier) {
        newMap.set(changeItem, modifier);
      }
      //Case for removing an item
      else if (action === "remove") {
        newMap.delete(changeItem);
      }
      return newMap;
    });
  }
  return { changesMap, handleCustomChanges };
}

//Custom hook to filter ingridents and expose the filtered list and filtering function
export function useFilterIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  function filterIngridents(list: Ingredient[], filter: string = "") {
    let filteredList = list.filter((item) => item.name.startsWith(filter));
    setIngredients(filteredList);
  }
  return { ingredients, filterIngridents };
}

//Custom hook to handle the adding of additional ingredients to product
export function useAddIngridient() {
  const [addOns, setAddOns] = useState<string[]>([]);
  function handleAddIngridient(item: string) {
    console.log(`added ${item}`);
    setAddOns((prev) => [...prev, item]);
  }
  return { addOns, handleAddIngridient };
}

//Custom hook to track the upgrades selected by client
export function useUpgrades() {
  const [upgradesList, setUpgradesList] = useState<Map<string, Upgrade>>(new Map());
  function handleUpgradesChange(upgradeItem: UpgradeData, quantityModifier: number) {
    let tempList = new Map(upgradesList);
    let upgrade = tempList.get(upgradeItem.keyAlias);
    //case where the upgrade item already exists in the list
    if (upgrade !== undefined) {
      upgrade.quaintity += quantityModifier;
      if (upgrade.quaintity === 0) {
        tempList.delete(upgradeItem.keyAlias);
      }
    }
    //case where upgrade item does not exist and we add it
    else {
      //the item does not exist, meaning user did not add it and also user tries to remove it, so do nothing
      if (quantityModifier === -1) {
        return;
      } else {
        tempList.set(upgradeItem.keyAlias, {
          title: upgradeItem.title,
          price: upgradeItem.price,
          quaintity: 1,
        });
      }
    }
    setUpgradesList(tempList);
  }
  return { upgradesList, handleUpgradesChange };
}

/*Static functions*/
export function getBaseType(ingredients: string): "milk" | "juice" {
  return ingredients.includes("יוגורט") ? "milk" : "juice";
}

export function flatenChanges(changes: Map<string, string>) {
  let flatList: string[] = [];
  for (const [key, value] of changes) {
    flatList.push(`${value} ${key} `);
  }
  return flatList;
}

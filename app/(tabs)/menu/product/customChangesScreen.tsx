import { colors } from "@/app/styles/rootStyle";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useProductsStore, useTokenStore } from "@/app/store";
import { useEffect, useState } from "react";
import CustomChangeItem from "@/components/product/customChangeItem";
import { flatenChanges, useAddIngridient, useCustomChanges, useFilterIngredients } from "@/utils/productUtils";
import SearchListDropdown from "@/components/general/searchListDropDown";
import { useQuery } from "@tanstack/react-query";
import { fetchIngredients } from "@/api/menuAPI";
import CustomError from "@/components/general/errorComponent";

export default function CustomChangesScreen() {
  const token = useTokenStore((state) => state.token);
  const {
    data: totalIngridents,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["ingredients"],
    queryFn: () => fetchIngredients(token),
  });
  //sets visibilty of all ingredients dropdown
  const [isListVisible, setListVisible] = useState(false);
  //custom hook for filtered ingredients
  const { ingredients, filterIngridents } = useFilterIngredients();
  //custom hook to track the ingredient chnages made by user
  const { changesMap, handleCustomChanges } = useCustomChanges();
  //custom hook to to track the additional ingredients selected by the user
  const { addOns, handleAddIngridient } = useAddIngridient();
  const productState = useProductsStore((state) => state.product);
  const setProductState = useProductsStore((state) => state.setProduct);
  const productIngredientsArray = productState.ingredients.split(",");
  //modifies the productState's changes list every time the user makes a change
  // // !!! change this functionality later to apply chnages only on user confirm !!!
  function confirmChanges() {
    let changes = flatenChanges(changesMap);
    console.log(changes);
    setProductState({ changes: changes });
  }
  //sets the ingredients total list on fetch result
  useEffect(() => {
    if (isSuccess) {
      filterIngridents(totalIngridents);
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (isError) {
    return <CustomError message={error.message} />;
  }

  return (
    <View style={styles.pageContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={(filterText: string) => filterIngridents(totalIngridents, filterText)}
          onPress={() => setListVisible(true)}
          style={styles.searchInput}
          placeholder="בא לי להוסיף..."
        ></TextInput>
        {/* Switches between the search icon and exit icon of input line */}
        {!isListVisible ? (
          <Ionicons style={styles.searchIcon} name="search" size={20} color="black" />
        ) : (
          <Ionicons style={styles.searchIcon} name="close" size={24} color="black" onPress={() => setListVisible(false)} />
        )}
      </View>
      {isListVisible && <SearchListDropdown listItems={ingredients} onAddIngridient={handleAddIngridient} toggleListVisibility={setListVisible} />}
      {/* Block for extra ingredients selected  by user*/}
      {addOns.length > 0 && (
        <View style={styles.changeItemsContainer}>
          <Text style={styles.primaryText}>תוספות</Text>
          {addOns.map((item, index) => (
            <CustomChangeItem key={index} itemName={item} onChangeSelect={handleCustomChanges} changesMap={changesMap} type="add-on" />
          ))}
        </View>
      )}
      <Text style={styles.primaryText}>שינוי מרכיבים ב - {productState.name}:</Text>
      <Text style={styles.secondaryText}>*ניתן לבצע עד 3 שינויים</Text>
      {/* Block containing the changable ingredients */}
      <View style={styles.changeItemsContainer}>
        {productIngredientsArray.map((item, index) =>
          //Dont create change option for yogurt
          item.includes("יוגורט") ? (
            ""
          ) : (
            <CustomChangeItem key={index} itemName={item} onChangeSelect={handleCustomChanges} changesMap={changesMap} type="change" />
          )
        )}
      </View>
      <Pressable onPress={confirmChanges} style={styles.confirmBtn}>
        <Text style={styles.confirmText}>אישור</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    direction: "rtl",
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 30,
  },
  searchContainer: {
    width: "100%",
    height: 45,
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 15,
    color: colors.secondary_text,
    fontWeight: "bold",
    direction: "rtl",
    position: "relative",
  },
  searchInput: {
    textAlignVertical: "bottom",
  },
  searchIcon: {
    position: "absolute",
    left: 20,
    top: 12,
  },
  primaryText: {
    fontSize: 17,
    color: colors.primary_text,
    fontWeight: "bold",
  },
  secondaryText: {
    fontSize: 14,
    color: colors.secondary_text,
  },
  changeItemsContainer: {
    width: "100%",
    gap: 10,
  },
  confirmBtn: {
    flexDirection: "row",
    backgroundColor: "black",
    borderRadius: 20,
    alignSelf: "center",
    marginTop: "auto",
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    color: "white",
  },
});

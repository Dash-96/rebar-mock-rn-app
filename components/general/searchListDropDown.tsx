import { ingredient } from "@/models/ingredientModel";
import {
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Pressable,
} from "react-native";

interface Props {
  listItems: ingredient[];
  onAddIngridient: (item: string) => void;
  toggleListVisibility?: (isVisible: boolean) => void;
}
export default function SearchListDropdown({
  listItems,
  onAddIngridient,
  toggleListVisibility,
}: Props) {
  return (
    <ScrollView style={styles.listContainer} stickyHeaderIndices={[0]}>
      <View style={styles.listHeaderConatienr}>
        <Text style={styles.listHeader}>האם התכוונת ל...</Text>
      </View>
      {listItems.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => {
            onAddIngridient(item.name);
            if (toggleListVisibility) toggleListVisibility(false);
          }}
        >
          <Text style={styles.listItem}>{item.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    height: 200,
    maxHeight: 200,
    paddingRight: 10,
    backgroundColor: "white",
    alignSelf: "center",
    width: "95%",
    boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
    borderRadius: 10,
    overflow: "scroll",
  },
  listItem: {
    marginBottom: 15,
  },
  listHeaderConatienr: {
    marginVertical: 10,
    backgroundColor: "white",
  },
  listHeader: {
    fontWeight: "900",
  },
});

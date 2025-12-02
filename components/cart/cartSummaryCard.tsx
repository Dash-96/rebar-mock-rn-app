import { View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
interface Props {
  total: number;
}
export default function CartSummaryCard({ total }: Props) {
  return (
    <View style={styles.cardWraper}>
      <View style={styles.rowWraper}>
        <Text style={{ fontSize: 16 }}>סה"כ הזמנה</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {"\u20AA"}
          {total}
        </Text>
      </View>
      <View style={styles.addItems}>
        <AntDesign name="plus" size={18} color="black" />
        <Text style={styles.addItemText}>הוספת מוצרים</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWraper: {
    backgroundColor: "white",
    marginTop: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  rowWraper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  addItems: {
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  addItemText: {
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});

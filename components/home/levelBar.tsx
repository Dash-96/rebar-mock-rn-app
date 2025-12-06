import { colors } from "@/app/styles/rootStyle";
import { StyleSheet, View } from "react-native";
export default function LevelBar() {
  const percent = 4 / 40;
  return (
    <View style={styles.cardContainer}>
      <View style={styles.barContainer}>
        <View style={[{ flex: percent }, styles.greenBar]}></View>
        <View style={[{ flex: 1 - percent }, styles.grayBar]}></View>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.dark_card_bg,
    height: 160,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  barContainer: {
    flexDirection: "row",
    height: 6,
    width: "90%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  greenBar: {
    backgroundColor: colors.primary,
  },
  grayBar: {
    backgroundColor: "trasnparent",
  },
});

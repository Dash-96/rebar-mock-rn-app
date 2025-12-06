import LevelBar from "@/components/home/levelBar";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.pageWraper}>
      <LevelBar />
    </View>
  );
}

const styles = StyleSheet.create({
  pageWraper: {
    flex: 1,
    backgroundColor: "white",
  },
});

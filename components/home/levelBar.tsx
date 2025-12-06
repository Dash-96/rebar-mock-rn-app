import { getUserLevel } from "@/api/userAPI";
import { colors } from "@/app/styles/rootStyle";
import { IMAGE_BASE_URL } from "@/config/constants";
import { useQuery } from "@tanstack/react-query";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomError from "../general/errorComponent";
export default function LevelBar() {
  const { data: response, isError, error, isLoading } = useQuery({ queryKey: ["userLevel"], queryFn: getUserLevel });
  if (isError) return <CustomError message={error.message} />;
  if (isLoading) return <Text>Loading...</Text>;

  const levelsArray = ["fresh", "good", "super", "pro"];
  const percent = (response["orders_count"] + 1) / 35;
  const ordersCount = response["orders_count"];
  const level = response["user_level"];

  function nextLevel() {
    let currentLevelIndex = levelsArray.indexOf(level);
    if (currentLevelIndex !== levelsArray.length - 1) return levelsArray[currentLevelIndex + 1];
  }

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.welcomeMessage}>היי {response["user_name"]},good to see you</Text>

      <View style={styles.barContainer}>
        <View style={[{ flex: percent }, styles.greenBar]}>
          <Image style={styles.image} source={{ uri: IMAGE_BASE_URL + response["level_image"] }}></Image>
        </View>
        <View style={[{ flex: 1 - percent }, styles.grayBar]}></View>
      </View>
      <View style={styles.levelsWraper}>
        {levelsArray.map((item) => {
          return (
            <Text key={item} style={[styles.levelText, level === item ? { color: colors.primary_text } : { color: colors.secondary_text }]}>
              {level === item && <Text style={{ fontSize: 14, position: "absolute" }}>I'm </Text>}
              {"\n"}
              {item}
            </Text>
          );
        })}
      </View>
      <Text style={styles.progressMessage}>
        רק עוד {10 - (ordersCount % 10)} הזמנות השנה למעבר לקבוצת ה-{nextLevel()}!
      </Text>
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
    paddingHorizontal: 20,
  },
  barContainer: {
    flexDirection: "row",
    height: 6,
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center",
    borderLeftWidth: 0,
    marginTop: 15,
  },
  greenBar: {
    backgroundColor: colors.primary,
    position: "relative",
    borderColor: colors.primary,
    borderWidth: 3,
    borderRadius: 10,
  },
  grayBar: {
    backgroundColor: "trasnparent",
  },
  welcomeMessage: {
    fontSize: 14,
    fontWeight: "bold",
    position: "absolute",
    top: 5,
    right: 20,
  },
  image: {
    width: 40,
    height: 40,
    position: "absolute",
    bottom: -10,
    right: -30,
  },
  levelsWraper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 5,
  },
  levelText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  progressMessage: {
    marginTop: 20,
    fontSize: 12,
  },
});

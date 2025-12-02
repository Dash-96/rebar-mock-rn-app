import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchIngredients } from "@/api/menuAPI";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/app/styles/rootStyle";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function CustomChangesCard() {
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    (async () => {
      let tokenValue = await SecureStore.getItemAsync("token");
      if (tokenValue) {
        setToken(tokenValue);
      }
    })();
  }, []);
  const { data: ingredients, isLoading, isError, error } = useQuery({ queryKey: ["ingredients"], queryFn: () => fetchIngredients(token) });

  return (
    <View style={styles.cardContainer}>
      <Text>שינויים במוצר</Text>
      <Text>*עד 3 שינויים</Text>
      <View style={styles.input}>
        <Link href={"/menu/product/customChangesScreen"} style={styles.link} asChild>
          <Pressable style={styles.linkTextWraper}>
            <Text style={styles.linkText}>בא לי לשנות </Text>
            <Ionicons name="search" size={20} color={"black"} />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20,
  },

  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
  },
  link: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  linkTextWraper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    direction: "rtl",
  },
  linkText: {
    textAlign: "right",
    color: colors.secondary_text,
    fontWeight: "bold",
  },
});

import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { API_BASE_URL } from "@/config/constants";
import Menu from "./menuScreen";
import { useTokenStore } from "@/app/store";
import * as SecureStore from "expo-secure-store";
export default function MenuIndex() {
  const setToken = useTokenStore((state) => state.setToken);
  async function retrieveToken() {
    let token = await SecureStore.getItemAsync("token");
    return token;
  }
  useEffect(() => {
    (async () => {
      let token = await retrieveToken();
      if (token !== null) {
        setToken(token);
      }
    })();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Menu></Menu>
    </View>
  );
}

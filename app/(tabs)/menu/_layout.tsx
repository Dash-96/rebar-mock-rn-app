import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Product } from "@/models/productModel";
import { API_BASE_URL } from "@/config/constants";
import { MenuContext } from "@/components/menu/menuContext";
import { getTestProduct, insertProduct } from "@/database/db";
import { StackScreen } from "react-native-screens";
import { Text } from "@react-navigation/elements";

export default function MenuLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top", "left", "right"]}>
        <Stack>
          <Stack.Screen name="index" options={{ headerTitle: "תפריט", headerShown: false }} />
          <Stack.Screen name="product/[id]" options={{ headerTitle: "תפריט" }} />
          <Stack.Screen
            name="product/customChangesScreen"
            options={{
              headerTitle: "להוסיף/להוריד/לשנות",
            }}
          />
        </Stack>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartLayout() {
  const cartQueryClient = new QueryClient();
  return (
    <QueryClientProvider client={cartQueryClient}>
      <SafeAreaView style={{ flex: 1, direction: "rtl" }} edges={["top", "left", "right"]}>
        <Stack>
          <Stack.Screen name="index" options={{ headerTitle: "עגלה", headerShown: false }}></Stack.Screen>
        </Stack>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

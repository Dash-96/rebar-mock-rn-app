import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
export default function RootLayout() {
  //initDB();
  //clearDB();
  const queryClinet = new QueryClient();
  return (
    <QueryClientProvider client={queryClinet}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}></Stack.Screen>
      </Stack>
    </QueryClientProvider>
  );
}

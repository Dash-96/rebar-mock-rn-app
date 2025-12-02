import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function AuthLayout() {
  const authQueryClient = new QueryClient();
  return (
    <QueryClientProvider client={authQueryClient}>
      <Stack>
        <Stack.Screen name="signup"></Stack.Screen>
      </Stack>
    </QueryClientProvider>
  );
}

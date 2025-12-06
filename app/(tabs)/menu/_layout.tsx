import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MenuLayout() {
  // const queryClient = new QueryClient();
  return (
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
  );
}

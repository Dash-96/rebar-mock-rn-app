import { Stack } from "expo-router";

import { initDB, insertProduct, clearDB } from "@/database/db";
export default function RootLayout() {
  //initDB();
  //clearDB();
  return (
    <Stack>
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}

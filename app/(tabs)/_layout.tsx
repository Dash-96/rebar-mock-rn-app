import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, useSegments } from "expo-router";
import { colors } from "../styles/rootStyle";
export default function TabsLayout() {
  const segments = useSegments();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShadowVisible: false,
        tabBarStyle: {
          direction: "rtl",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "בית",
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={24}></Ionicons>,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="cart"
        options={{
          title: "עגלה",
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "cart-sharp" : "cart-outline"} color={color} size={24}></Ionicons>,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="menu"
        options={{
          title: "תפריט",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? "menu-sharp" : "menu-outline"} color={color} size={24}></Ionicons>,
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}

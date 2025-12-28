import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { useResolveClassNames } from "uniwind";
import { Header, getHeaderTitle } from "@react-navigation/elements";

export default function TabLayout() {
  const headerStyle = useResolveClassNames("bg-background-dark");
  const headerTitleStyle = useResolveClassNames("text-primary");

  return (
    <Stack
      screenOptions={{
        title: "",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Podcasts" }}
      />
      <Stack.Screen name="search" />
      <Stack.Screen
        name="[id]"
        options={{
          headerTransparent: true,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}

import { Stack } from "expo-router";
import { useResolveClassNames } from "uniwind";

export default function TabLayout() {
  const headerStyle = useResolveClassNames("bg-background-dark");
  const headerTitleStyle = useResolveClassNames("text-primary");

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="search" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}

import { api } from "@/convex/_generated/api";
import Feather from "@expo/vector-icons/Feather";
import { useConvexAuth, useQuery } from "convex/react";
import { Image } from "expo-image";
import { Link, Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useResolveClassNames } from "uniwind";

export default function TabsLayout() {
  const tabStyle = useResolveClassNames("bg-background-dark");
  const headerStyle = useResolveClassNames("bg-background-dark");
  const headerTitleStyle = useResolveClassNames("text-primary");
  // const tabBarActiveTintColorFromHook = useCSSVariable("--color-primary-brand");
  const user = useQuery(api.auth.currentUser);
  const { isAuthenticated } = useConvexAuth();

  // Check the type to get rid of the number warning on tabBarActiveTintColor
  const tabBarActiveTintColor =
    typeof tabBarActiveTintColorFromHook === "string"
      ? tabBarActiveTintColorFromHook
      : "#000000";

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: tabStyle,
        headerStyle: headerStyle,
        headerTitleStyle: headerTitleStyle,
        tabBarActiveTintColor: tabBarActiveTintColor,
        headerShadowVisible: false,
        headerTitle: "",
        headerRight: () => (
          <Link href="/profile" asChild>
            <TouchableOpacity>
              <Image
                source={
                  isAuthenticated ? user?.image : "https://placehold.co/30"
                }
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 15,
                  marginRight: 16,
                  marginBottom: 8,
                }}
              />
            </TouchableOpacity>
          </Link>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(stack)"
        options={{
          title: "Podcasts",
          tabBarIcon: ({ color, size }) => (
            <Feather name="mic" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="music"
        options={{
          title: "Music",
          tabBarIcon: ({ color, size }) => (
            <Feather name="music" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

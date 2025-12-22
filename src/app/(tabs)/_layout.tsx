import { api } from "@/convex/_generated/api";
import { Player } from "@/src/components/player";
import HeightAwareTabBar from "@/src/components/ui/heightAware-tabBar";
import { TabBarHeightProvider } from "@/src/providers/tabBarheight-provider";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useConvexAuth, useQuery } from "convex/react";
import { Image } from "expo-image";
import { Link, Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useCSSVariable, useResolveClassNames } from "uniwind";
import HomeIcon from "../../components/ui/home-icon.jsx";
import MicIcon from "../../components/ui/mic-icon.jsx";
import MusicIcon from "../../components/ui/music-icon.jsx";

export default function TabsLayout() {
  const tabStyle = useResolveClassNames("bg-background-dark");
  const headerStyle = useResolveClassNames("bg-background-dark");
  const headerTitleStyle = useResolveClassNames("text-primary");
  const tabBarActiveTintColor = useCSSVariable("--color-primary-brand");
  const user = useQuery(api.auth.currentUser);
  const { isAuthenticated } = useConvexAuth();

  return (
    <TabBarHeightProvider>
      <Tabs
        tabBar={(props: BottomTabBarProps) => <HeightAwareTabBar {...props} />}
        screenOptions={{
          tabBarStyle: tabStyle,
          tabBarActiveTintColor: tabBarActiveTintColor as string,
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
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
                    borderCurve: "continuous",
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
            tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="(stack)"
          options={{
            title: "Podcasts",
            tabBarIcon: ({ focused }) => <MicIcon focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="music"
          options={{
            title: "Music",
            tabBarIcon: ({ focused }) => <MusicIcon focused={focused} />,
          }}
        />
      </Tabs>
      <Player />
    </TabBarHeightProvider>
  );
}

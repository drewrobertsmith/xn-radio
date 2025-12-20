import { Stack, Tabs } from "expo-router";
import { ConvexProvider, ConvexReactClient, useConvexAuth } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import "../../global.css";
import Feather from "@expo/vector-icons/Feather";
import { useCSSVariable, useResolveClassNames } from "uniwind";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { clientPersister } from "../utils/mmkv";
import * as SecureStore from "expo-secure-store";
import { Modal, Platform, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { AudioProvider } from "../providers/audio-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 10, //10 min to align with omny's cache duration
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
  });

  const secureStorage = {
    getItem: SecureStore.getItemAsync,
    setItem: SecureStore.setItemAsync,
    removeItem: SecureStore.deleteItemAsync,
  };

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: clientPersister }}
    >
      <ConvexAuthProvider
        client={convex}
        storage={
          Platform.OS === "android" || Platform.OS === "ios"
            ? secureStorage
            : undefined
        }
      >
        <AudioProvider>
          <GestureHandlerRootView>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="profile"
                options={{
                  presentation: "modal",
                }}
              />
            </Stack>
          </GestureHandlerRootView>
        </AudioProvider>
      </ConvexAuthProvider>
    </PersistQueryClientProvider>
  );
}

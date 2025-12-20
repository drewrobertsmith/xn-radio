import CurrentProgramItem from "@/src/components/current-program-item";
import FollowedProgramItem from "@/src/components/followed-program-item";
import PastProgramItem from "@/src/components/past-program-item";
import ListEmptyComponent from "@/src/components/ui/list-empty";
import { useCurrentPrograms, usePastPrograms } from "@/src/hooks/usePrograms";
import { Program } from "@/src/types/types";
import { mmkv } from "@/src/utils/mmkv";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { LegendList } from "@legendapp/list";
import { Link } from "expo-router";

export default function Podcasts() {
  const {
    data: pastData,
    isLoading: pastLoading,
    isError: pastError,
  } = usePastPrograms();

  const {
    data: currentData,
    isLoading: currentLoading,
    isError: currentError,
  } = useCurrentPrograms();

  const FOLLOWED_SHOWS_KEY = "followed_shows";
  const isLoadedRef = useRef(false);
  const [followedShows, setFollowedShows] = useState<Program[]>([]);

  useEffect(() => {
    const savedShowsJSON = mmkv.getString(FOLLOWED_SHOWS_KEY);
    if (savedShowsJSON) {
      try {
        setFollowedShows(JSON.parse(savedShowsJSON));
      } catch (e) {
        console.error(e);
      }
    }
    // Mark as loaded so the save effect can start working
    isLoadedRef.current = true;
  }, []);

  // Save Effect
  // useEffect(() => {
  //   // Only save if we have finished the initial load
  //   if (isLoadedRef.current) {
  //     const showsToSaveJSON = JSON.stringify(followedShows);
  //     mmkv.set(FOLLOWED_SHOWS_KEY, showsToSaveJSON);
  //   }
  // }, [followedShows]);

  // Wait for BOTH to finish loading
  if (pastLoading || currentLoading) {
    return <ActivityIndicator size="small" />;
  }

  // Show error if EITHER fails
  if (pastError || currentError) {
    return <Text>Error Loading Podcasts</Text>;
  }
  return (
    <ScrollView
      className="bg-background-dark flex-1"
      contentContainerClassName="gap-4 p-2"
      showsVerticalScrollIndicator={false}
    >
      <Link href={"/search"}>
        <View className="w-full p-2 bg-background-dark">
          <View className="w-full border border-border rounded-xl p-2 bg-background-light">
            <Text className="text-muted text-base">Search</Text>
          </View>
        </View>
      </Link>
      <View className="flex- 1 w-full bg-background p-2 rounded-lg h-40">
        <Text className="text-primary text-2xl font-bold">Following</Text>
        <LegendList
          data={followedShows ?? []}
          renderItem={({ item }) => (
            <FollowedProgramItem
              item={item}
              setFollowedShows={setFollowedShows}
            />
          )}
          keyExtractor={(item) => item.Id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
      <View className="flex-1 w-full bg-background p-2 rounded-lg h-64">
        <Text className="text-primary text-2xl font-bold">Current Shows</Text>
        <LegendList
          data={currentData ?? []}
          renderItem={({ item }) => (
            <CurrentProgramItem
              item={item}
              setFollowedShows={setFollowedShows}
            />
          )}
          keyExtractor={(item) => item.Id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
      <View className="flex-1 w-full bg-background p-2 rounded-lg">
        <Text className="text-primary text-2xl font-bold">Past Shows</Text>
        <LegendList
          data={pastData ?? []}
          renderItem={({ item }) => (
            <PastProgramItem item={item} setFollowedShows={setFollowedShows} />
          )}
          keyExtractor={(item) => item.Id}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </ScrollView>
  );
}

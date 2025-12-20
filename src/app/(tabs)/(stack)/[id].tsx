import ListEmptyComponent from "@/src/components/ui/list-empty";
import useClips from "@/src/hooks/useClips";
import Feather from "@expo/vector-icons/Feather";
import { Clip } from "@/src/types/types";
import {
  formatDate,
  formatDuration,
  formatEpisodeType,
  formatSeasonAndEpisode,
} from "@/src/utils/formatters";
import { LegendList } from "@legendapp/list";
import { useLocalSearchParams } from "expo-router";
import { PressableOpacity } from "pressto";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useAudio } from "@/src/providers/audio-provider";

function ClipItem({ item }: { item: Clip }) {
  const { player, status, play, pause, currentTrack } = useAudio();
  return (
    <View className="flex-1 p-2 m-2 flex-row items-center justify-between">
      <View className="w-5/6">
        <View className="flex-row">
          <Text className="text-muted">
            {formatEpisodeType(item.EpisodeType)}
            {formatSeasonAndEpisode(item.Season, item.Episode)}
          </Text>
          <Text className="text-muted">{formatDate(item.PublishedUtc)}</Text>
        </View>
        <Text
          className="text-base text-primary font-semibold"
          numberOfLines={2}
        >
          {item.Title}
        </Text>
        <Text className="text-muted">
          {formatDuration(item.DurationSeconds, "summary")}
        </Text>
      </View>
      <PressableOpacity
        onPress={() => {
          currentTrack?.id === item.Id && status.playing
            ? pause()
            : play({
                id: item.Id,
                title: item.Title,
                artist: "Xn Radio",
                artwork: item.ImageUrl,
                url: item.AudioUrl,
              });
        }}
      >
        <Feather
          name={
            currentTrack?.id === item.Id && status.playing
              ? "pause-circle"
              : "play-circle"
          }
          size={40}
          color="black"
        />
      </PressableOpacity>
    </View>
  );
}

function Separator() {
  return (
    <View
      className="border-border"
      style={{
        borderWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
}

export default function ProgramPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError } = useClips(id);

  if (isLoading) {
    return <ActivityIndicator size="small" />;
  }

  if (isError) {
    return <Text className="text-primary">Error Loading Episodes</Text>;
  }

  return (
    <View className="flex-1  bg-background-dark">
      <LegendList
        data={data ?? []}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => <ClipItem item={item} />}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
}

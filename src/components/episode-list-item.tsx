import { Text, View } from "react-native";
import { useAudio } from "../providers/audio-provider";
import { Clip, Track } from "../types/types";
import {
  formatDate,
  formatDuration,
  formatEpisodeType,
  formatSeasonAndEpisode,
} from "../utils/formatters";
import { PressableOpacity } from "pressto";
import PlayButton from "./play-button";

export default function EpisodeListItem({ item }: { item: Clip }) {
  const clipToTrack: Track = {
    id: item.Id,
    artist: "Podcast Title",
    artwork: item.ImageUrl,
    title: item.Title,
    url: item.AudioUrl,
    isLiveStream: false,
  };
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
      <PlayButton item={clipToTrack} buttonType="On-Demand" />
    </View>
  );
}

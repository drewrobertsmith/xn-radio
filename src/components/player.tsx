import { Text, View } from "react-native";
import { useTabBarHeight } from "../providers/tabBarheight-provider";
import { useAudio } from "../providers/audio-provider";
import { Image } from "expo-image";
import { PressableOpacity } from "pressto";
import PlayIcon from "../components/ui/play-icon.jsx";
import PauseIcon from "../components/ui/pause-icon.jsx";
import PlayButton from "./play-button";

export const MINI_PLAYER_HEIGHT = 64;

export const Player = () => {
  const { tabBarHeight } = useTabBarHeight();
  const { currentTrack, pause, play, status, player } = useAudio();

  return (
    <View
      className="justify-center bg-background-light border-border p-1 shadow-lg"
      style={[
        {
          position: "absolute",
          left: 8,
          right: 8,
          bottom: tabBarHeight + 8,
          height: MINI_PLAYER_HEIGHT,
          borderWidth: 1,
          borderRadius: 8,
          borderCurve: "continuous",
        },
      ]}
    >
      <View className="justify-between flex-row items-center gap-1">
        <Image
          source={currentTrack?.artwork}
          contentFit="cover"
          style={{
            height: 50,
            width: 50,
            borderRadius: 4,
            borderCurve: "continuous",
          }}
        />
        <Text className="w-[65%] text-primary font-semibold" numberOfLines={2}>
          {currentTrack?.title}
        </Text>
        <PlayButton buttonType="Player" />
      </View>
    </View>
  );
};

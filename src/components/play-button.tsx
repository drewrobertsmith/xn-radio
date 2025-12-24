import { PressableOpacity } from "pressto";
import { Track } from "../types/types";
import PlayIcon from "./ui/play-icon";
import { useAudio } from "../providers/audio-provider";
import PauseIcon from "./ui/pause-icon";
import StopIcon from "./ui/stop-icon";

interface PlayButtonProps {
  item?: Track;
  size?: number;
  buttonType: "Live" | "On-Demand" | "Player";
}

export default function PlayButton({
  item,
  size = 44,
  buttonType,
}: PlayButtonProps) {
  const { status, currentTrack, pause, player, play } = useAudio();

  const renderIcons = () => {
    if (buttonType === "Player") {
      if (currentTrack?.isLiveStream === true) {
        return status.playing ? <StopIcon /> : <PlayIcon />;
      } else {
        return status.playing ? <PauseIcon /> : <PlayIcon />;
      }
    }
    if (buttonType === "On-Demand") {
      return status.playing && currentTrack?.id === item?.id ? (
        <PauseIcon />
      ) : (
        <PlayIcon />
      );
    }
    if (buttonType === "Live") {
      return status.playing && currentTrack?.id === item?.id ? (
        <StopIcon />
      ) : (
        <PlayIcon />
      );
    }
  };

  const handleButtonPress = () => {
    if (buttonType === "Player") {
      if (!status.playing) {
        player.play(); // resume playback
      } else {
        pause();
      }
    } else if (currentTrack?.id === item?.id && status.playing) {
      pause();
    } else {
      play(item);
    }
  };

  return (
    <PressableOpacity
      style={{ width: size, height: size }}
      onPress={handleButtonPress}
    >
      {renderIcons}
    </PressableOpacity>
  );
}

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AudioPlayer,
  AudioStatus,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { Track } from "../types/types";

interface AudioProviderType {
  player: AudioPlayer;
  status: AudioStatus;
  play: (item: Track) => void;
  pause: () => void;
  currentTrack: Track | null;
}

const Audio = createContext<AudioProviderType | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  //--- Expo-Audio Controls ---//

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const player = useAudioPlayer();
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    player.updateLockScreenMetadata({
      title: currentTrack?.title,
      artist: currentTrack?.artist,
    });
  }, [player, currentTrack]);

  const play = (item: Track) => {
    player.setActiveForLockScreen(
      true,
      // { title: item.title, artist: item.artist, artworkUrl: item.artwork },
      // { showSeekBackward: true, showSeekForward: true }, //this needs ot know if the item is livestream or not, probably add to the custom track type
    );
    setCurrentTrack(item);
    player.replace({ uri: item.url });
    player.play();
  };

  const pause = () => {
    player.pause();
  };

  return (
    <Audio.Provider
      value={{
        player,
        status,
        play,
        pause,
        currentTrack,
      }}
    >
      {children}
    </Audio.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(Audio);
  if (!context) {
    throw new Error("useAudio must be used wiht an AudioProvider");
  }
  return context;
};

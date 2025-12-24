export type ProgramStatus = "Past" | "Current";

// 2. Use that type inside your interface
export interface CustomFieldData {
  status: ProgramStatus;
}

export interface Program {
  Id: string;
  Name: string;
  Description: string;
  Author: string;
  ArtworkUrl: string;
  Network: string;
  CustomFieldData?: CustomFieldData;
}

export interface Clip {
  Id: string;
  Title: string;
  Description: string;
  DescriptionHtml: string;
  ImageUrl: string;
  AudioUrl: string;
  DurationSeconds: number;
  PublishedUtc: string;
  Season: number;
  Episode: number;
  EpisodeType: string;
}

export interface Station {
  id: string;
  callLetters: string;
  appLogo: string;
  stream: string;
  fallbackstream?: string;
  name: string;
}

export interface Metadata {
  cue_title: string;
  track_album_name?: string;
  track_artist_name: string;
}

export interface Track {
  id: string;
  url: string;
  title: string;
  artist: string;
  artwork: string;
  isLiveStream: boolean;
}

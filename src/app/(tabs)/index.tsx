import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { withUniwind } from "uniwind";
import Feather from "@expo/vector-icons/Feather";
import { useAudio } from "@/src/providers/audio-provider";
import { XN } from "@/src/api/stations";

function StationContainer() {
  const StyledExpoImage = withUniwind(Image);
  const { player, status, play, pause } = useAudio();

  const xnStation = XN;
  const xnStationTotrack = {
    id: xnStation.id,
    artist: xnStation.name,
    artwork: xnStation.appLogo,
    title: xnStation.name,
    url: xnStation.stream,
  };

  return (
    <View className="flex-1 items-center justify-center gap-8">
      <StyledExpoImage
        source={require("../../../assets/images/splash-icon.png")}
        contentFit="cover"
        className="aspect-square w-2/3"
      />
      <Text>This will be XN Radio Station</Text>
      <Feather
        name={status.playing ? "stop-circle" : "play-circle"}
        size={48}
        color="black"
        onPress={() => {
          status.playing ? pause() : play(xnStationTotrack);
        }}
      />
    </View>
  );
}

export default function Index() {
  return <StationContainer />;
}

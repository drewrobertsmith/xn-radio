import { Text, View } from "react-native";
import { Image } from "expo-image";
import { withUniwind } from "uniwind";
import { XN } from "@/src/api/stations";
import PlayButton from "@/src/components/play-button";
import { Track } from "@/src/types/types";

function StationContainer() {
  const StyledExpoImage = withUniwind(Image);

  const xnStation = XN;
  const xnStationTotrack: Track = {
    id: xnStation.id,
    artist: xnStation.name,
    artwork: xnStation.appLogo,
    title: xnStation.name,
    url: xnStation.stream,
    isLiveStream: true,
  };

  return (
    <View className="flex-1 items-center justify-center gap-8 bg-background-dark">
      <StyledExpoImage
        source={require("../../../assets/images/splash-icon.png")}
        contentFit="cover"
        className="aspect-square w-2/3"
      />
      <Text className="text-primary">This will be XN Radio Station</Text>
      <PlayButton buttonType="Live" size={72} item={xnStationTotrack} />
    </View>
  );
}

export default function Index() {
  return <StationContainer />;
}

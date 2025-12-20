import { withUniwind } from "uniwind";
import { Program } from "../types/types";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { PressableScale } from "pressto";

export default function FollowedProgramItem({
  item,
  setFollowedShows,
}: {
  item: Program;
  setFollowedShows: React.Dispatch<React.SetStateAction<Program[]>>;
}) {
  const StyledExpoImage = withUniwind(Image);

  const removeFromFavorites = () => {
    setFollowedShows((prevFollowedShows) => {
      const isAlreadyFollowed = prevFollowedShows.some(
        (show) => show.Id === item.Id,
      );

      if (isAlreadyFollowed) {
        return prevFollowedShows.filter((show) => show.Id !== item.Id);
      }
    });
  };

  return (
    <Link href={`./${item.Id}`} asChild>
      <PressableScale onLongPress={removeFromFavorites}>
        <StyledExpoImage
          source={item.ArtworkUrl}
          contentFit="cover"
          className="w-24 aspect-square rounded-lg border border-border mr-1"
        />
      </PressableScale>
    </Link>
  );
}

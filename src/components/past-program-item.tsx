import React from "react";
import { Program } from "../types/types";
import { withUniwind } from "uniwind";
import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { PressableOpacity } from "pressto";
import { Link } from "expo-router";

export default function PastProgramItem({
  item,
  setFollowedShows,
}: {
  item: Program;
  setFollowedShows: React.Dispatch<React.SetStateAction<Program[]>>;
}) {
  const StyledFeatherIcon = withUniwind(Feather);

  const handleFollowShow = () => {
    setFollowedShows((prevFollowedShows) => {
      const isAlreadyFollowed = prevFollowedShows.some(
        (show) => show.Id === item.Id,
      );

      if (isAlreadyFollowed) {
        return prevFollowedShows;
      }

      return [...prevFollowedShows, item];
    });
  };

  return (
    <Link href={`./${item.Id}`} asChild>
      <PressableOpacity>
        <View className="flex-1 flex-row items-center bg-background-light p-2 m-1 rounded-lg gap-2 border border-border justify-between">
          <View className="flex-row gap-2 w-[80%]">
            <Image
              source={item.ArtworkUrl}
              contentFit="cover"
              style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                borderCurve: 'continuous',
              }}
            />
            <View className="w-[85%]">
              <Text className="text-primary font-semibold text-base">
                {item.Name}
              </Text>
              <Text className="text-muted text-sm text-wrap" numberOfLines={1}>
                {item.Author}
              </Text>
            </View>
          </View>
          <View>
            <StyledFeatherIcon
              name="plus"
              size={32}
              colorClassName="text-primary"
              onPress={handleFollowShow}
            />
          </View>
        </View>
      </PressableOpacity>
    </Link>
  );
}

import React from "react";
import { Program } from "../types/types";
import { withUniwind } from "uniwind";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Link } from "expo-router";
import { PressableOpacity } from "pressto";
import AddIcon from "./ui/add-icon";

export default function CurrentProgramItem({
  item,
  setFollowedShows,
}: {
  item: Program;
  setFollowedShows: React.Dispatch<React.SetStateAction<Program[]>>;
}) {
  const StyledExpoImage = withUniwind(Image);
  const user = useQuery(api.auth.currentUser);
  const addProgram = useMutation(api.api.users.addToFollowedPrograms);

  const handleFollowShow = () => {
    setFollowedShows((prevFollowedShows) => {
      const isAlreadyFollowed = prevFollowedShows.some(
        (show) => show.Id === item.Id,
      );

      if (isAlreadyFollowed) {
        return prevFollowedShows;
      }
      // addProgram({ userId: user?._id, programId: item.Id });
      return [...prevFollowedShows, item];
    });
  };

  return (
    <Link href={`./${item.Id}`} asChild>
      <PressableOpacity>
        <View className="flex flex-col bg-background-light rounded-lg  border border-border m-1 p-2 gap-1 w-72">
          <View className="flex-row items-center justify-between gap-1">
            <View className="flex-row items-center gap-1 flex-1">
              <StyledExpoImage
                source={item.ArtworkUrl}
                contentFit="cover"
                className="w-[72] aspect-square rounded-lg"
              />
              <View className="flex-1">
                <Text
                  className="text-primary text-base font-semibold"
                  numberOfLines={2}
                >
                  {item.Name}
                </Text>
                <Text className="text-muted text-wrap" numberOfLines={1}>
                  {item.Author}
                </Text>
              </View>
            </View>
            <PressableOpacity
              style={{ width: 32, height: 32 }}
              hitSlop={4}
              onPress={handleFollowShow}
            >
              <AddIcon />
            </PressableOpacity>
          </View>
          <View className="flex-1">
            <Text className="text-muted" numberOfLines={5}>
              {item.Description}
            </Text>
          </View>
        </View>
      </PressableOpacity>
    </Link>
  );
}

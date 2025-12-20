import { Text, View } from "react-native";
import { useTabHeight } from "../providers/tabHeight-provider";

export const MINI_PLAYER_HEIGHT = 64;

export const Player = () => {
  const { tabBarHeight } = useTabHeight();
  console.log("Tab Bar Height: ", tabBarHeight);

  return (
    <View
      style={[
        {
          // Position the player right above the tab bar using the real height
          position: "absolute",
          left: 0,
          right: 0,
          bottom: tabBarHeight,
          height: MINI_PLAYER_HEIGHT,
          borderWidth: 1,
        },
      ]}
    >
      <Text>Mini Player</Text>
    </View>
  );
};

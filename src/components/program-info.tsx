import { Text, View } from "react-native";
import useProgramById from "../hooks/useProgramById";
import { Image, ImageBackground } from "expo-image";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { getColors, ImageColorsResult } from "react-native-image-colors";
import { useEffect, useState } from "react";

export default function ProgramInfo({ programID }: { programID: string }) {
  const { data: program } = useProgramById(programID);
  const [colors, setColors] = useState();

  const fetchColors = async (imageUrl: string) => {
    const result = await getColors(imageUrl, {
      fallback: "#000000",
      pixelSpacing: 5,
      cache: true,
      key: imageUrl,
    });
    switch (result.platform) {
      case "android":
      case "web":
        setColors({
          colorOne: { value: result.lightVibrant, name: "lightVibrant" },
          colorTwo: { value: result.dominant, name: "dominant" },
          colorThree: { value: result.vibrant, name: "vibrant" },
          colorFour: { value: result.darkVibrant, name: "darkVibrant" },
          rawResult: JSON.stringify(result),
        });
        break;
      case "ios":
        setColors({
          colorOne: { value: result.background, name: "background" },
          colorTwo: { value: result.detail, name: "detail" },
          colorThree: { value: result.primary, name: "primary" },
          colorFour: { value: result.secondary, name: "secondary" },
          rawResult: JSON.stringify(result),
        });
        break;
      default:
        throw new Error("unexpected platform");
    }
  };

  useEffect(() => {
    fetchColors(program?.ArtworkUrl as string);
  }, [program]);

  return (
    <View className="flex-1 items-center">
      <ImageBackground
        source={program?.ArtworkUrl}
        contentFit="contain"
        style={{
          width: "100%",
          aspectRatio: "1/1",
          justifyContent: "flex-end",
        }}
      >
        <LinearGradient
          colors={["transparent", colors?.colorThree.value]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 350,
          }}
        />
        <BlurView
          intensity={10}
          tint="dark"
          style={{
            padding: 8,
            margin: 8,
            overflow: "hidden",
            borderRadius: 12,
            borderCurve: "continuous",
          }}
        >
          <Text className="text-white text-lg font-bold">{program?.Name}</Text>
          <Text className="text-white" numberOfLines={4}>
            {program?.Description}
          </Text>
        </BlurView>
      </ImageBackground>
    </View>
  );
}

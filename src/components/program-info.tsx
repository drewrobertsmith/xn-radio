import { Text, View } from "react-native";
import useProgramById from "../hooks/useProgramById";
import { ImageBackground } from "expo-image";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { getColors } from "react-native-image-colors";
import { useEffect, useState } from "react";

type ImageColorsState = {
  colorOne: string;
  colorTwo: string;
  colorThree: string;
  colorFour: string;
} | null;

export default function ProgramInfo({ programID }: { programID: string }) {
  const { data: program, isLoading } = useProgramById(programID);
  const [colors, setColors] = useState<ImageColorsState>(null);

  useEffect(() => {
    if (!program?.ArtworkUrl) return;

    const fetchColors = async () => {
      try {
        const result = await getColors(program.ArtworkUrl, {
          fallback: "#000000",
          pixelSpacing: 5,
          cache: true,
          key: program.ArtworkUrl,
        });

        switch (result.platform) {
          case "android":
          case "web":
            setColors({
              colorOne: result.lightVibrant,
              colorTwo: result.vibrant,
              colorThree: result.dominant,
              colorFour: result.darkVibrant,
            });
            break;
          case "ios":
            setColors({
              colorOne: result.background,
              colorTwo: result.detail,
              colorThree: result.primary,
              colorFour: result.secondary,
            });
            break;
          default:
            console.warn("Unexpected platform for image colors");
        }
      } catch (e) {
        console.error("Failed to extract colors:", e);
      }
    };

    fetchColors();
  }, [program?.ArtworkUrl]);

  if (isLoading || !program) {
    return <View className="bg-background-dark flex-1" />;
  }

  const gradientColor = colors?.colorThree ?? "transparent";

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
          colors={["transparent", gradientColor]}
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

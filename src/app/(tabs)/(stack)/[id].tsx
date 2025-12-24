import ListEmptyComponent from "@/src/components/ui/list-empty";
import useClips from "@/src/hooks/useClips";
import { LegendList } from "@legendapp/list";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import EpisodeListItem from "@/src/components/episode-list-item";

function Separator() {
  return (
    <View
      className="border-border"
      style={{
        borderWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
}

export default function ProgramPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError } = useClips(id);

  if (isLoading) {
    return <ActivityIndicator size="small" />;
  }

  if (isError) {
    return <Text className="text-primary">Error Loading Episodes</Text>;
  }

  return (
    <View className="flex-1  bg-background-dark">
      <LegendList
        data={data ?? []}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => <EpisodeListItem item={item} />}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
}

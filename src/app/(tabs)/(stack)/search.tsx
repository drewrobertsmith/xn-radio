import { api } from "@/convex/_generated/api";
import SearchBar from "@/src/components/search-bar";
import ListEmptyComponent from "@/src/components/ui/list-empty";
import { LegendList } from "@legendapp/list";
import { useQuery } from "convex/react";
import { Image } from "expo-image";
import { useState } from "react";
import { Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

function EpisodeItem({ item }) {
  return (
    <View className="border border-border p-2 rounded-lg bg-background flex-1">
      <View className="flex-row gap-2 w-[80%] items-center">
        <Image
          source={item.image}
          style={{
            height: 50,
            width: 50,
            borderRadius: 8,
          }}
          cachePolicy="disk"
        />
        <Text
          className="text-base text-primary font-semibold w-[85%]"
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <View>
          <Feather name="plus" size={32} colorClassName="text-primary" />
        </View>
      </View>
      <View className="p-2">
        <Text numberOfLines={4} className="text-balance">
          {item.description}
        </Text>
      </View>
    </View>
  );
}

export default function Search() {
  const [searchText, setSearchText] = useState<string>("");
  const [submittedText, setSubmittedText] = useState<string>("");
  const results = useQuery(api.search.searchEpisodes, {
    searchText: submittedText,
  });

  return (
    <View className="p-2 bg-background-dark flex-1">
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        setSubmittedText={setSubmittedText}
      />
      <LegendList
        data={results ?? []}
        renderItem={({ item }) => <EpisodeItem item={item} />}
        keyExtractor={(item) => item.omnyId}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{ gap: 8, paddingVertical: 8 }}
      />
    </View>
  );
}

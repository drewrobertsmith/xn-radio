import { Text, View } from "react-native";

export default function ListEmptyComponent() {
  return (
    <View className="flex-1">
      <Text className="text-muted">No items available</Text>
    </View>
  );
}

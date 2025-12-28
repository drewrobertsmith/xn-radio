import { StyleSheet, View } from "react-native";

export default function Separator() {
  return (
    <View
      className="border-border"
      style={{
        borderWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
}

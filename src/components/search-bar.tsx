import React, { useState } from "react";
import { TextInput } from "react-native";

interface SearchBarProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setSubmittedText: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  searchText,
  setSearchText,
  setSubmittedText,
}: SearchBarProps) {
  return (
    <TextInput
      value={searchText}
      placeholder="Search"
      className="border border-border rounded-xl p-2 text-base bg-background-light text-primary"
      onChangeText={(text) => setSearchText(text)}
      autoFocus={true}
      onSubmitEditing={(v) => {
        setSubmittedText(v.nativeEvent.text);
        setSearchText(v.nativeEvent.text);
      }}
    />
  );
}

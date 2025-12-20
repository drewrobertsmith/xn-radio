import {
  BottomTabBarProps,
  NativeBottomTabView,
} from "@bottom-tabs/react-navigation";
import { useTabHeight } from "../providers/tabHeight-provider";
import { useCallback } from "react";
import { LayoutChangeEvent, View } from "react-native";

export const CustomTabBar = (props: BottomTabBarProps) => {
  const { tabBarHeight, setTabBarHeight } = useTabHeight();
};

import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useCSSVariable } from "uniwind";
export default function MicIcon(props) {
  const tabBarInActiveTintColor = useCSSVariable("--color-muted");
  const tabBarActiveTintColor = useCSSVariable("--color-primary-brand");

  const handleActiveTabSwitching = props.focused
    ? tabBarActiveTintColor
    : tabBarInActiveTintColor;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        stroke={handleActiveTabSwitching}
        strokeWidth={1.5}
        d="M7 8a5 5 0 0 1 10 0v3a5 5 0 0 1-10 0V8Z"
      />
      <Path
        stroke={handleActiveTabSwitching}
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M13.5 8H17M13.5 11H17M7 8h2M7 11h2M12 19v3"
      />
      <Path
        fill={handleActiveTabSwitching}
        d="M20.75 10a.75.75 0 0 0-1.5 0h1.5Zm-16 0a.75.75 0 0 0-1.5 0h1.5Zm10.762 7.344a.75.75 0 1 0 .728 1.312l-.728-1.312ZM19.25 10v1h1.5v-1h-1.5Zm-14.5 1v-1h-1.5v1h1.5ZM12 18.25A7.25 7.25 0 0 1 4.75 11h-1.5A8.75 8.75 0 0 0 12 19.75v-1.5ZM19.25 11a7.248 7.248 0 0 1-3.738 6.344l.728 1.312A8.748 8.748 0 0 0 20.75 11h-1.5Z"
      />
    </Svg>
  );
}

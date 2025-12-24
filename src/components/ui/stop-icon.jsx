import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useCSSVariable } from "uniwind";

export default function StopIcon(props) {
  const secondary = useCSSVariable("--color-secondary-brand");

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        stroke={secondary}
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M15.708 9a1.51 1.51 0 0 0-.294-.414C14.828 8 13.886 8 12 8c-1.886 0-2.828 0-3.414.586C8 9.172 8 10.114 8 12c0 1.886 0 2.828.586 3.414C9.172 16 10.114 16 12 16c1.886 0 2.828 0 3.414-.586.472-.471.564-1.174.582-2.414"
      />
      <Path
        stroke={secondary}
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"
      />
    </Svg>
  );
}

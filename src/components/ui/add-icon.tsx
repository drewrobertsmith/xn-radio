import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useCSSVariable } from "uniwind";
export default function AddIcon(props) {
  const primary = useCSSVariable("--color-muted");

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        stroke={primary}
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M15 12h-3m0 0H9m3 0V9m0 3v3M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464.974.974 1.3 2.343 1.41 4.536"
      />
    </Svg>
  );
}

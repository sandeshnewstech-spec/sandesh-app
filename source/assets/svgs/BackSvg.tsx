import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"
import { useThemeX } from "../../hooks";
import { ColorValue } from "react-native";

interface P extends SvgProps {
  props?: any;
  color?: string | ColorValue;
}

function BackSvg({ color, ...props }: P) {

  const { col } = useThemeX();

  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#clip0_1027_3562)"
        stroke={color ? color : col.PRIMARY}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M5 12h14M5 12l6 6M5 12l6-6" />
      </G>
      <Defs>
        <ClipPath id="clip0_1027_3562">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default BackSvg

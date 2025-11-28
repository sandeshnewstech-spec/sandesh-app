import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"
import { useThemeX } from "../../hooks";
import { ColorValue } from "react-native";

interface P extends SvgProps {
  props?: any;
  color?: string | ColorValue;
}

function ListSvg({ color, ...props }: P) {

  const { col } = useThemeX();

  return (
    <Svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={color ?? "#e3e3e3"}
      {...props}
    >
      <Path d="M323-286.5q15.5 0 26.5-11t11-26.5q0-15.5-11-26.5t-26.5-11q-15.5 0-26.5 11t-11 26.5q0 15.5 11 26.5t26.5 11zm0-156q15.5 0 26.5-11t11-26.5q0-15.5-11-26.5t-26.5-11q-15.5 0-26.5 11t-11 26.5q0 15.5 11 26.5t26.5 11zm0-157q15.5 0 26.5-11t11-26.5q0-15.5-11-26.5t-26.5-11q-15.5 0-26.5 11t-11 26.5q0 15.5 11 26.5t26.5 11zM441-286h234v-75H441v75zm0-157h234v-75H441v75zm0-156h234v-75H441v75zM204-129q-30.94 0-52.97-22.03Q129-173.06 129-204v-552q0-30.94 22.03-52.97Q173.06-831 204-831h552q30.94 0 52.97 22.03Q831-786.94 831-756v552q0 30.94-22.03 52.97Q786.94-129 756-129H204zm0-75h552v-552H204v552zm0-552v552-552z" />
    </Svg>
  )
}

export default ListSvg

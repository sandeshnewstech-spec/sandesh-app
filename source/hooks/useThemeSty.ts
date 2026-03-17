import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { colorType, defStyObjType, } from "../types";
import { FONT } from "../assets";
import useString from "../language";
import { _COL, _GRADIANTS_COLORS } from "../colors";
import { CompoStyFN, HeaderStyFN } from "../styles";
import { useColors, useMMKVStore, useMemoX } from ".";
import { useWindowDimensions } from "react-native";

const useThemeXSty = () => {

    const isDark = true;
    const { setToast } = useMMKVStore();
    const str = useString();
    const { col, GRADIANTS_COLORS } = useColors();
    const sAI: EdgeInsets = useSafeAreaInsets();
    const windowDimention = useWindowDimensions();

    const font = useMemoX(() => FONT, [FONT]);

    const defStyOBJ: defStyObjType = useMemoX(() => ({
        col, font, isDarkMode: isDark, ...sAI, GRADIANTS_COLORS, windowDimention
    }), [col, font, sAI, GRADIANTS_COLORS]);

    // const compSty = compStyleFunc(defStyOBJ);
    const hdSty = HeaderStyFN(defStyOBJ);
    const cpSty = CompoStyFN(defStyOBJ);

    return {
        ...sAI, col, str, font, defStyOBJ, windowDimention,
        hdSty, cpSty, setToast, GRADIANTS_COLORS,
    };
};

export default useThemeXSty;
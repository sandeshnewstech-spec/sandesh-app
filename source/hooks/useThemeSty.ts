import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { colorType, defStyObjType, } from "../types";
import { FONT } from "../assets";
import useString from "../language";
import { useMemo } from "react";
import { _COL, _GRADIANTS_COLORS } from "../colors";
import { CompoStyFN, HeaderStyFN } from "../styles";
import { useMMKVStore } from ".";

const useThemeXSty = () => {

    const { setToast } = useMMKVStore();
    const str = useString();
    const sAI: EdgeInsets = useSafeAreaInsets();
    const GRADIANTS_COLORS = _GRADIANTS_COLORS

    const col: colorType = useMemo((): any => (_COL), [_COL]);
    const font = useMemo(() => FONT, [FONT]);

    const defStyOBJ: defStyObjType = useMemo(() => ({
        col, font, ...sAI, GRADIANTS_COLORS
    }), [col, font, sAI, GRADIANTS_COLORS]);

    // const compSty = compStyleFunc(defStyOBJ);
    const hdSty = HeaderStyFN(defStyOBJ);
    const cpSty = CompoStyFN(defStyOBJ);

    return {
        ...sAI, col, str, font, defStyOBJ,
        hdSty, cpSty, setToast, GRADIANTS_COLORS
    };
};

export default useThemeXSty;
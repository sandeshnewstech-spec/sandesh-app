import { useMemo } from 'react'
import { colorType } from 'types';
import { _COL, _GRADIANTS_COLORS } from 'colors';
import { useTheme } from '@react-navigation/native';

const useColorsHook = () => {
    // const isDark = useTheme()?.dark ? 1 : 0;
    const isDark = 1;
    const GRADIANTS_COLORS = _GRADIANTS_COLORS[isDark];
    const col: colorType = useMemo((): any => (_COL[isDark]), [_COL]);
    return ({ col, GRADIANTS_COLORS })
}

export default useColorsHook
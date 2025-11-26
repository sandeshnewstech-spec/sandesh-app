import { View, Text } from 'react-native'
import React, { useMemo } from 'react'

import en from "./en.json";

export type strType = typeof en;

const useString = () => {
    const idx = 0;
    const _str = useMemo(() => ([en])[idx], [idx, en]);
    return _str
}

export default useString
import { View, Text } from 'react-native'
import React, { useMemo } from 'react'

import en from "./en.json";
import gujrati from "./gujrati.json";

export type strType = typeof en;

const useString = () => {
    const idx = 1;
    const str = useMemo(() => ([en, gujrati])[idx], [idx, en, gujrati]);
    return str;
}

export default useString
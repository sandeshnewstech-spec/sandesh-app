import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import useZuStore from 'store/useZuStore'

const useInitHook = () => {
    const { setIsAppStartFlow } = useZuStore();
    useEffect(() => { setIsAppStartFlow(true) }, []);
    return ({})
}

export default useInitHook
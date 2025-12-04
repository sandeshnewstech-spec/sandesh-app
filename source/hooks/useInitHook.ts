import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import useZuStore from 'store/useZuStore'

const useInitHook = () => {
    const { setIsAppStartFlow, setAppServices } = useZuStore();
    useEffect(() => {
        // setIsAppStartFlow(true);
        setAppServices({
            appLogo: "https://s3-symbol-logo.tradingview.com/sandesh-ltd--600.png"
        });

    }, []);
    return ({})
}

export default useInitHook
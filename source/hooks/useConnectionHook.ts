import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import useDebounce from './useDebounce';
import { useMMKVStore } from 'hooks';
import { useNetInfoInstance } from '@react-native-community/netinfo';
import useString from 'language';

const useConnectionHook = () => {

    const str = useString();
    const { toast, setToast } = useMMKVStore();
    const { refresh, netInfo: { isConnected } } = useNetInfoInstance();
    const isFirstRender = useRef<boolean>(true);
    const isConnectedDebounced = useDebounce(isConnected, 1000);

    useEffect(() => {
        // Skip the effect on the very first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        // If debounced connection status is false (offline), show a toast message
        if (!isConnectedDebounced) {
            setToast({ show: true, msg: str.YOUR_INTERNET_CONNCTIONS_IS_NOT_CONNECTED });
        }
    }, [isConnectedDebounced, setToast]);
    return { isConnected, isConnectedDebounced, }
}

export default useConnectionHook
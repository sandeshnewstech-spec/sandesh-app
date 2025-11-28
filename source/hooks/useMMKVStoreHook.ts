import React, { useCallback, useMemo } from 'react'
import { useMMKVObject } from 'react-native-mmkv';
import { ToastType } from '../types';

const useMMKVStoreHook = () => {

    const [toastVal, setToast] = useMMKVObject<ToastType>("@toast");

    const toast: ToastType = useMemo(() => toastVal ?? {}, [toastVal]);

    return ({
        toast, setToast,
    })
}

export default useMMKVStoreHook
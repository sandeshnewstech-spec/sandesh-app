import React, { useCallback } from 'react'
import { useMMKVObject } from 'react-native-mmkv';
import { ToastType } from '../types';
import useMemoX from './useMemoXHook';

const useMMKVStoreHook = () => {

    const [toastVal, setToast] = useMMKVObject<ToastType>("@toast");

    const toast: ToastType = useMemoX(() => toastVal ?? {}, [toastVal]);

    return ({
        toast, setToast,
    })
}

export default useMMKVStoreHook
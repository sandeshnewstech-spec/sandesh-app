import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useMemoXHook
 * A custom hook that behaves like useMemo but allows manual state updates.
 * Optimized with the "Synchronous State Update" pattern to eliminate extra renders.
 */
const useMemoXHook = <T>(onBack = () => ({} as T), updater: any[]) => {

    // Current state value initialization using onBack.
    const [value, setValue] = useState<T>(onBack());
    const holder = useRef<boolean>(false);

    // const callMeBack = useCallback(() => {
    //     setTimeout(() => {
    //         holder.current = false;
    //         setValue(onBack());
    //     }, 700);
    // }, [updater]);

    const callMeBack = () => {
        setTimeout(() => {
            holder.current = false;
            setValue(onBack());
        }, 700);
    }

    useEffect(() => {
        if (holder.current) { return; }
        holder.current = true;
        callMeBack();
    }, [updater]);

    return value;
}

export default useMemoXHook;



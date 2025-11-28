import { ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { Easing, FadeOut, ReduceMotion, useDerivedValue, withTiming } from 'react-native-reanimated'
import { _isDEV } from '../../utils';
import useThemeXSty from '../../hooks/useThemeSty';

interface P {
    loading?: boolean;
    absolute?: boolean;
}

const ScrLoaderCompo = ({ absolute, loading = false }: P) => {

    const { col } = useThemeXSty();

    const opVal = useDerivedValue<number>(() => withTiming(
        loading ? 1 : 0, {
        duration: 480,
        easing: Easing.inOut(Easing.circle),
        reduceMotion: ReduceMotion.Never,
    }), [loading]);

    if (!loading) return null;

    return (
        <Animated.View
            // entering={FadeIn}
            exiting={FadeOut}
            style={[
                StyleSheet.absoluteFill,
                _isDEV ? {} : { opacity: opVal },
                {
                    alignItems: 'center', justifyContent: 'center',
                    backgroundColor: absolute ? col.BLACK05 : undefined,
                    zIndex: 9999
                }]}>
            <ActivityIndicator color={absolute ? col.WHITE : col.PRIMARY} />
        </Animated.View>
    )
}

export default React.memo(ScrLoaderCompo);
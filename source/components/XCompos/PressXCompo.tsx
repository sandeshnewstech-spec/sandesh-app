import { Pressable, Platform, PressableAndroidRippleConfig, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { PressXType, } from '../../Types'
import { useThemeX } from '../../hooks';
import Animated, { Easing, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import TextXCompo from './TextXCompo';
import { _WIDTH } from '../../functions';

const PressXCompo = ({
    cSty, mSty, children, lCol,
    type = 'p', cProps, mProps, tProps,
    disabled, hitSlop, text, tSty, lProps, loading = false, lSize,
    onPress = () => { }, onPressIn = () => { }, onPressOut = () => { }, onLongPress = () => { },
    rStyIdx = 0, pStyIdx = 1, dStyIdx = 0,
    pSty = () => ({}), rSty,
}: PressXType) => {

    const { col } = useThemeX();
    const [_onP, setOnP] = useState<boolean>(false);

    const opacity_V = useDerivedValue<number | undefined>(() => withTiming(_onP ? .2 : 1, { duration: 300, }), [_onP]);
    const scale_V = useDerivedValue<number>(() => withTiming(_onP ? .975 : 1, { duration: 100, easing: Easing.ease }), [_onP]);
    const disbaled_V = useDerivedValue<number>(() => withTiming(disabled ? .3 : 1, { duration: 200, easing: Easing.ease }), [disabled]);

    const pressedStyX = useAnimatedStyle(() => {
        if (disabled) return {};
        if (Platform.OS === 'android') return [
            {},
            { transform: [{ scale: scale_V.value }] },
            { opacity: opacity_V.value },
            { opacity: opacity_V.value, transform: [{ scale: scale_V.value }] },
        ][pStyIdx];
        if (Platform.OS === 'ios') return [
            {},
            { transform: [{ scale: scale_V.value }] },
            { opacity: opacity_V.value },
            { opacity: opacity_V.value, transform: [{ scale: scale_V.value }] },
        ][pStyIdx];
        return [
            {},
            { transform: [{ scale: scale_V.value }] },
            { opacity: opacity_V.value },
            { opacity: opacity_V.value, transform: [{ scale: scale_V.value }] },
        ][pStyIdx];
    });

    const rippleStyX = useCallback((): PressableAndroidRippleConfig => {
        if (rSty) return rSty;
        return ([
            { color: col.TRANSPARENT, },
            { color: col.WHITE01, },
            { color: col.PRIMARY, },
        ][rStyIdx])
    }, [rSty, rStyIdx]);

    const disableStyX = useAnimatedStyle(() => {
        // if (Platform.OS === 'android') return [
        //     {},
        //     { opacity: withTiming(disabled ? 1 : 0, { duration: 500, easing: Easing.ease }) },
        // ][dStyIdx];
        // if (Platform.OS === 'ios') return [
        //     {},
        //     { opacity: withTiming(disabled ? 1 : 0, { duration: 500, easing: Easing.ease }) },
        // ][dStyIdx];
        return { opacity: disbaled_V.value };
    });

    const textView = useCallback(() => <TextXCompo tSty={tSty} {...tProps} >{text}</TextXCompo>, [text, tProps, tSty])
    const loadingView = <ActivityIndicator color={lCol ?? 'white'} size={lSize ?? 'small'} {...lProps} />

    return <Animated.View
        style={[
            pressedStyX, mSty,
            pSty({ p: _onP }),
            disableStyX,
            // { overflow: undefined },
        ]}
        {...mProps} >
        <Pressable
            onPress={onPress}
            onPressIn={() => { onPressIn(); setOnP(true); }}
            onPressOut={() => { onPressOut(); setOnP(false); }}
            onLongPress={onLongPress}
            hitSlop={hitSlop ?? 5}
            disabled={disabled || loading}
            android_ripple={{ borderless: false, foreground: true, radius: _WIDTH / 2, ...rippleStyX() }}
            // {...cProps}
            style={[{ overflow: 'hidden' }, cSty]}
        >{loading ? loadingView : children ? children : text ? textView : <></>}</Pressable>
    </Animated.View >
}

export default memo(PressXCompo);
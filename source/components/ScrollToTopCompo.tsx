import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring, withRepeat,
    withSequence, Easing,
} from 'react-native-reanimated';
import { bSpace, ICON_SIZE } from 'utils';
import { useThemeX } from 'hooks';
import { defStyObjType } from 'types';
import { IC_MATERIAL } from 'assets';
import PressableScaleXCompo from './XCompos/PressableScaleXCompo';

type P = {
    scrollerRef?: any;
    isScrollToTop?: boolean;
    setIsScrollToTop?: (i: boolean) => void;
}
const ScrollToTopCompo = ({ scrollerRef = null, isScrollToTop = false, setIsScrollToTop = () => { } }: P) => {
    const { defStyOBJ, col } = useThemeX();
    const style = stylesFN(defStyOBJ);

    // Animation values
    const opacity = useSharedValue(0);
    const scale = useSharedValue(1);
    const translateY = useSharedValue(50);
    const bounce = useSharedValue(0);

    // Show/hide animation
    useEffect(() => {
        if (isScrollToTop) {
            opacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) });
            translateY.value = withSpring(0, { damping: 10, mass: 1, stiffness: 100 });
            // Start continuous bounce animation
            bounce.value = withRepeat(
                withSequence(
                    withTiming(0, { duration: 600 }),
                    withTiming(-8, { duration: 300 }),
                    withTiming(0, { duration: 300 })
                ),
                -1,
                true
            );
        } else {
            opacity.value = withTiming(0, { duration: 300 });
            translateY.value = withTiming(50, { duration: 300 });
            bounce.value = 0;
        }
    }, [isScrollToTop]);

    // Animated style for the container
    const animatedContainerStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { translateY: translateY.value + bounce.value },
            { scale: scale.value },
        ],
    }));

    // Handle press animation
    const handlePress = () => {
        scale.value = withSpring(0.8, { damping: 8, mass: 1, stiffness: 200 });
        setTimeout(() => {
            scale.value = withSpring(1, { damping: 8, mass: 1, stiffness: 200 });
        }, 100);

        scrollerRef?.current?.scrollToOffset({ animated: true, offset: 0 });
        setIsScrollToTop(!isScrollToTop);
    };

    if (!isScrollToTop) return null;

    return (
        <Animated.View style={[style.up_cover, animatedContainerStyle]} >
            <PressableScaleXCompo style={style.up_btn} onPress={handlePress} >
                <IC_MATERIAL name='keyboard-double-arrow-up' size={ICON_SIZE} color={col.SCROLL_TO_TOP_BTN_IC} />
            </PressableScaleXCompo>
        </Animated.View>
    )
}

export default ScrollToTopCompo

const stylesFN = ({ col, font, bottom }: defStyObjType) => StyleSheet.create({
    up_cover: {
        position: 'absolute',
        bottom: bottom + bSpace * .9,
        right: bSpace * .9,
        backgroundColor: col.SCROLL_TO_TOP_BTN_BG,
        borderRadius: 50,
        shadowColor: col.SHADOW,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    up_btn: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
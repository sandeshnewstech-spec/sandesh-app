import { View, StyleSheet } from 'react-native'
import React, { useCallback, memo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { headerType } from '../../types'
import StatusBarXCompo from './StatusBarXCompo'
import { headerHeight } from '../../utils'
import { useThemeX } from '../../hooks'
import TextXCompo from './TextXCompo'
import { BACK_IC } from '../../assets'
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
    FadeIn,
} from 'react-native-reanimated'
import PressableScaleXCompo from './PressableScaleXCompo'

/**
 * HeaderXCompo - A highly optimized, performant header component.
 * Features:
 * - Buttery smooth animations using Reanimated 3.
 * - Zero re-render layout strategy for title centering.
 * - Glassmorphism ready and theme integrated.
 */
const HeaderXCompo = ({
    title, bPress, backBtn = true, lSvg, rSvg, tSty, hHeight, hBgColor,
    alignText = 'center', hShow = true,
    barStyle = undefined, sbColor, sbShow, sbTransition, bIcBgCol, bIcCol, hTextCol, hTextBgCol,
}: headerType) => {

    const navigation = useNavigation()
    const { col, hdSty } = useThemeX()

    // Shared value for micro-interaction feedback
    const backBtnRotate = useSharedValue(0)

    // Memoized back button handler with refined spring physics
    const handleBackPress = useCallback(() => {
        backBtnRotate.value = withSpring(-15, { damping: 12, stiffness: 200 }, () => {
            backBtnRotate.value = withSpring(0, { damping: 12, stiffness: 200 })
        })

        if (bPress) {
            bPress()
        } else {
            navigation.goBack()
        }
    }, [bPress, navigation, backBtnRotate])

    // Animated style for back button rotation
    const backButtonAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${backBtnRotate.value}deg` }],
    }))

    // Base header container styles derived from theme and props
    const containerStyle = [
        hdSty.mainSty,
        styles.container,
        { height: hHeight ?? headerHeight },
        hdSty?.hSty,
        { backgroundColor: hBgColor || hdSty?.hSty?.backgroundColor || col.HEADER_BGCOL },
    ]

    if (!hShow) return (
        <StatusBarXCompo
            barStyle={barStyle}
            sbColor={sbColor ?? col.STATUS_BAR}
            sbTransition={sbTransition ?? 'fade'}
            sbShow={sbShow}
        />
    )

    return (
        <>
            <StatusBarXCompo
                barStyle={barStyle}
                sbColor={sbColor ?? col.STATUS_BAR}
                sbTransition={sbTransition ?? 'fade'}
                sbShow={sbShow}
            />
            <Animated.View 
                entering={FadeIn.duration(400)}
                style={containerStyle}
            >
                {/* Center Title Container - Absolutely Centered */}
                <View style={[styles.titleContainer, { alignItems: alignText }]}>
                    <TextXCompo 
                        lines={1} 
                        tSty={{
                            ...hdSty?.textSty,
                            ...tSty,
                            backgroundColor: hTextBgCol,
                            color: hTextCol ?? hdSty?.textSty?.color ?? col.HEADER_TEXT_COL,
                            borderRadius: 10,
                            paddingVertical: 3,
                            paddingHorizontal: 8,
                        }}
                    >
                        {title ?? ""}
                    </TextXCompo>
                </View>

                {/* Left controls */}
                <View style={styles.sideContainer}>
                    {backBtn && (
                        <Animated.View style={backButtonAnimatedStyle}>
                            <PressableScaleXCompo
                                onPress={handleBackPress}
                                rippleColor={col.TRANSPARENT}
                                style={{ 
                                    ...hdSty.hBtnCSty, 
                                    backgroundColor: bIcBgCol ?? col.HEADER_SVG_BGCOL 
                                }}
                            >
                                <BACK_IC color={bIcCol || col.HEADER_SVG_COL} />
                            </PressableScaleXCompo>
                        </Animated.View>
                    )}
                    {lSvg}
                </View>

                {/* Right controls */}
                <View style={[styles.sideContainer, styles.rightContainer]}>
                    {rSvg}
                </View>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        zIndex: 10,
    },
    titleContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        paddingHorizontal: 60, // Ensure title doesn't overlap common button areas
        zIndex: -1,
    },
    sideContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    rightContainer: {
        justifyContent: 'flex-end',
    }
})

export default memo(HeaderXCompo);
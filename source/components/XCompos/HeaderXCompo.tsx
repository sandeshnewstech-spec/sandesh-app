import { View } from 'react-native'
import React, { memo, useMemo, useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { headerType } from '../../types'
import StatusBarXCompo from './StatusBarXCompo'
import { headerHeight } from '../../utils'
import { useThemeX } from '../../hooks'
import TextXCompo from './TextXCompo'
import { BACK_IC } from '../../assets'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated'
import PressableScaleXCompo from './PressableScaleXCompo'

const HeaderXCompo = ({
    title, bPress, backBtn = true, lSvg, rSvg, tSty, hHeight, hBgColor,
    alignText = 'center', lHeight, rHeight, hShow = true,
    barStyle, sbColor, sbShow, sbTransition, bIcBgCol, bIcCol, hTextCol, hTextBgCol,
}: headerType) => {

    const navigation = useNavigation()
    const { col, hdSty } = useThemeX()

    const [lH, setLH] = useState<number>(lHeight ?? 0)
    const [rH, setRH] = useState<number>(rHeight ?? 0)

    // Animated shared values for professional effects
    const headerOpacity = useSharedValue(1)
    const backButtonRotate = useSharedValue(0)
    const titleOpacity = useSharedValue(1)

    // Compute margins for center alignment
    const lM = useMemo((): number => {
        if (alignText === 'center') {
            if (rH > lH) return rH - lH
        }
        return 0
    }, [lH, rH])

    const rM = useMemo((): number => {
        if (alignText === 'center') {
            if (lH > rH) return lH - rH
            return 0
        }
        return 0
    }, [lH, rH])

    // Memoized back button handler with animation
    const handleBackPress = useCallback(() => {
        // Animate back button on press
        backButtonRotate.value = withSpring(-20, { damping: 8, mass: 1, stiffness: 100 })

        setTimeout(() => {
            backButtonRotate.value = withSpring(0, { damping: 8, mass: 1, stiffness: 100 })
        }, 100)

        // Execute navigation
        if (bPress) {
            bPress()
        } else {
            navigation.goBack()
        }
    }, [bPress, navigation, backButtonRotate])

    // Animated styles for header
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: headerOpacity.value,
        }
    })

    // Animated style for back button with rotation
    const backButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${backButtonRotate.value}deg` },
            ],
        }
    })

    // Animated style for title
    const titleAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: titleOpacity.value,
        }
    })

    return (
        <>
            <StatusBarXCompo
                barStyle={barStyle ?? 'default'}
                sbColor={sbColor ?? col.SB_COL}
                sbTransition={sbTransition ?? 'fade'}
                sbShow={sbShow}
            />
            {hShow && (
                <Animated.View
                    style={[
                        hdSty.mainSty,
                        { height: hHeight ?? headerHeight },
                        hdSty?.hSty,
                        { backgroundColor: hBgColor || hdSty?.hSty?.backgroundColor },
                        headerAnimatedStyle,
                    ]}>
                    <View onLayout={(event) => { setLH(event.nativeEvent.layout.width) }} >
                        {backBtn && (
                            <Animated.View style={backButtonAnimatedStyle}>
                                <PressableScaleXCompo
                                    children={<BACK_IC color={bIcCol || col.HEADER_SVG_COL} />}
                                    onPress={handleBackPress}
                                    rippleColor={col.TRANSPARENT}
                                    style={{ ...hdSty.hBtnCSty, backgroundColor: bIcBgCol ?? col.HEADER_SVG_BGCOL }}
                                />
                            </Animated.View>
                        )}
                        {lSvg}
                    </View>
                    <Animated.View style={[
                        hdSty.textView,
                        {
                            marginLeft: lM,
                            marginRight: rM,
                            alignItems: alignText,
                        },
                        titleAnimatedStyle,
                    ]} >
                        <TextXCompo tSty={{
                            ...tSty, ...hdSty?.textSty,
                            borderRadius: 10,
                            paddingVertical: 3,
                            paddingHorizontal: 5,
                            backgroundColor: hTextBgCol,
                            color: hTextCol ?? hdSty?.textSty?.color,
                        }}
                        >{title ?? ""}</TextXCompo>
                    </Animated.View>
                    <View onLayout={(event) => { setRH(event.nativeEvent.layout.width) }} >{rSvg}</View>
                </Animated.View>
            )}
        </>
    )
}

export default memo(HeaderXCompo);
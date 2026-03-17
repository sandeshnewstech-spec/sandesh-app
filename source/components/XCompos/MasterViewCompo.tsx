import { KeyboardAvoidingView, SafeAreaView, View, } from 'react-native'
import React, { useCallback } from 'react'
import { ScrollView as ScrollViewG } from 'react-native-gesture-handler'
import HeaderXCompo from './HeaderXCompo'
import { useMemoX, useThemeX } from '../../hooks'
import { MasterViewType } from '../../types'
import ToastAlertCompo from './ToastAlertCompo'
import ScrLoaderCompo from './ScrLoaderCompo'
import { kAvoidSty } from '../../utils'
import Animated, {
    useSharedValue, useAnimatedStyle, withSpring, useAnimatedScrollHandler,
    interpolate, Extrapolate,
} from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'

const MasterViewCompo = ({
    children, fixed = false, gScroll = false, scrollViewRef, bounces, onScroll, scrollEnabled,
    style, bgCol, bgCol2, header, bottomBarColor, autoAdujKeyInsets, modals, bSvg, tSvg,
    alignText = 'center', lHeight, rHeight, hShow = true, barStyle, sbColor, sbShow = true, sbTransition,
    keyboardShouldPersistTaps, setToast, toast, topNODE, btmNODE, abScrLoader, abLoader, scrLoader,
    title, bPress, backBtn = true, lSvg, rSvg, tSty, hHeight, hBgColor, scrollViewProps,
    bIcCol, bIcBgCol
}: MasterViewType) => {

    const { col, bottom, GRADIANTS_COLORS } = useThemeX()

    // Animated shared values for scroll-driven effects
    const scrollY = useSharedValue(0)
    const contentOpacity = useSharedValue(1)
    const contentTranslateY = useSharedValue(0)
    const contentScale = useSharedValue(1)

    // Memoized header props
    const headerProps = useMemoX(() => ({
        title, bPress, backBtn, lSvg, rSvg, tSty, hHeight, hBgColor, alignText, lHeight, rHeight, hShow,
        barStyle: col.STATUS_BAR_STYLE, sbColor, sbShow, sbTransition, bIcCol, bIcBgCol
    }), [title, bPress, backBtn, lSvg, rSvg, tSty, hHeight, hBgColor, alignText, lHeight, rHeight, hShow,
        barStyle, sbColor, sbShow, sbTransition, bIcCol, bIcBgCol])


    // Scroll event handler for smooth animations
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y

            // Content fade and scale based on scroll
            contentOpacity.value = interpolate(
                scrollY.value,
                [0, 100, 200],
                [1, 0.95, 0.9],
                Extrapolate.CLAMP
            )

            contentTranslateY.value = interpolate(
                scrollY.value,
                [0, 100],
                [0, -5],
                Extrapolate.CLAMP
            )
        },
        onBeginDrag: () => {
            contentScale.value = withSpring(1, { damping: 8, mass: 1, stiffness: 100 })
        },
        onEndDrag: () => {
            contentScale.value = withSpring(1, { damping: 8, mass: 1, stiffness: 100 })
        },
    })

    // Animated styles for content
    const contentAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: contentOpacity.value,
            transform: [
                { translateY: contentTranslateY.value },
                { scale: contentScale.value },
            ],
        }
    })

    // Memoized content render
    const renderContent = useCallback(() => {
        return (fixed ? (
            <View style={[{ flex: 1 }, style]} children={children} />
        ) : gScroll ? (
            <ScrollViewG
                ref={scrollViewRef}
                bounces={bounces ?? true}
                onScroll={scrollHandler}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                scrollEnabled={scrollEnabled ?? true}
                automaticallyAdjustKeyboardInsets={autoAdujKeyInsets ?? false}
                style={[{ flex: 1, backgroundColor: bgCol }, contentAnimatedStyle]}
                keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                contentContainerStyle={[
                    { width: "100%" },
                    style
                ]}
                scrollEventThrottle={16}
            // {...scrollViewProps}
            >
                {children}
            </ScrollViewG>
        ) : (
            <Animated.ScrollView
                ref={scrollViewRef}
                bounces={bounces ?? true}
                onScroll={scrollHandler}
                scrollEnabled={scrollEnabled ?? true}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={autoAdujKeyInsets ?? false}
                style={[{ flex: 1, backgroundColor: bgCol }, contentAnimatedStyle]}
                keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                contentContainerStyle={[
                    { width: "100%", flexGrow: 1, overflow: 'hidden' },
                    style
                ]}
                scrollEventThrottle={16}
                {...scrollViewProps}
            >
                {children}
            </Animated.ScrollView>
        ))
    }, [scrLoader, tSvg, fixed, children, style, gScroll, scrollViewRef, bounces, scrollHandler, bgCol, contentAnimatedStyle, keyboardShouldPersistTaps, scrollEnabled, autoAdujKeyInsets, bSvg, abLoader])

    return (
        <LinearGradient
            colors={GRADIANTS_COLORS.background}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <View style={{ backgroundColor: bgCol ? bgCol : col.SCR_BGCOL, flex: 1 }}>
                {(header ? header : <HeaderXCompo {...headerProps} />)}
                <KeyboardAvoidingView
                    behavior={kAvoidSty}
                    style={{ flex: 1, backgroundColor: bgCol2 ? bgCol2 : bgCol, overflow: 'hidden' }}>
                    <ScrLoaderCompo loading={scrLoader} />
                    {tSvg && tSvg}
                    {!scrLoader && renderContent()}
                    {bSvg && bSvg}
                    <ScrLoaderCompo loading={abLoader} absolute />
                </KeyboardAvoidingView>
                {(bottomBarColor) && <SafeAreaView
                    style={{ backgroundColor: bottomBarColor ? bottomBarColor : 'black', height: bottom }}
                />}
                {modals && modals}
                <ScrLoaderCompo loading={abScrLoader} absolute />
                <ToastAlertCompo {...toast} setToast={setToast} />
            </View>
        </LinearGradient>

    )
}

export default MasterViewCompo;
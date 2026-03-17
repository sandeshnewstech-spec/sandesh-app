import { ActivityIndicator } from 'react-native'
import React, { memo, useCallback } from 'react'
import { PressableScale } from 'pressto'
import { useMemoX, useThemeX } from '../../hooks'
import TextXCompo from './TextXCompo'
import { _WIDTH } from '../../functions'
import { PressableScaleXCompoProps } from 'types'

const PressableScaleXCompo = memo(({
    children, text, disabled = false, loading = false, lCol, lSize = 'small', style, tSty, tProps,
    lProps, onPress, onPressIn, onPressOut, onLongPress, hitSlop = 8, activeScale = 0.94, rippleRadius = _WIDTH / 2,
    rippleColor, springConfig = { damping: 0.8, mass: 1, stiffness: 100 }, activeOpacity = 0.7,
}: PressableScaleXCompoProps) => {

    const { col } = useThemeX()
    const isDisabled = Boolean(disabled || loading)

    const textView = useCallback(() => (
        <TextXCompo tSty={tSty} {...tProps}>
            {text}
        </TextXCompo>
    ), [text, tProps, tSty])

    const loadingView = useMemoX(() => (
        <ActivityIndicator
            color={lCol ?? col.WHITE01 ?? 'white'}
            size={lSize ?? 'small'}
            {...lProps} />
    ), [lCol, lSize, lProps, col.WHITE01])

    const computedSpringConfig = useMemoX(
        () => springConfig || { damping: 0.8, mass: 1, stiffness: 100 },
        [springConfig]
    )


    const handlePress = useCallback(() => {
        if (isDisabled) return
        onPress?.()
    }, [isDisabled, onPress])

    const handlePressIn = useCallback(() => {
        if (isDisabled) return
        onPressIn?.()
    }, [isDisabled, onPressIn])

    const handlePressOut = useCallback(() => {
        if (isDisabled) return
        onPressOut?.()
    }, [isDisabled, onPressOut])

    const handleLongPress = useCallback(() => {
        if (isDisabled) return
        onLongPress?.()
    }, [isDisabled, onLongPress])

    // Type-cast to bypass Pressto library typing issues
    const PS: any = PressableScale

    return (
        <PS
            style={style}
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onLongPress={handleLongPress}
            activeScale={activeScale}
            activeOpacity={activeOpacity}
            springConfig={computedSpringConfig}
            disabled={isDisabled}
            rippleRadius={rippleRadius}
            rippleColor={rippleColor || col.TRANSPARENT}
            hitSlop={hitSlop}
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled }}>
            {loading ? loadingView : children ? children : text ? textView() : <></>}
        </PS>
    )
})

PressableScaleXCompo.displayName = 'PressableScaleXCompo'

export default PressableScaleXCompo;
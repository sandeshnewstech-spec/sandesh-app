import { ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { } from 'react'
import { PressableScale } from 'pressto'
import { useMemoX, useThemeX } from '../../hooks'
import TextXCompo from './TextXCompo'
import { _WIDTH } from '../../functions'
import { PressableScaleXCompoProps } from 'types'

const PressableScaleXCompo = ({
    children, text, disabled = false, loading = false, lCol, lSize = 'small', style, tSty, tProps,
    lProps, onPress, onPressIn, onPressOut, onLongPress, hitSlop = 8, activeScale = 0.94, rippleRadius = _WIDTH / 2,
    rippleColor, springConfig = { damping: 0.8, mass: 1, stiffness: 100 }, activeOpacity = 0.7,
}: PressableScaleXCompoProps) => {

    const { col } = useThemeX()
    const isDisabled = Boolean(disabled || loading)

    const computedSpringConfig = useMemoX(
        () => springConfig || { damping: 0.8, mass: 1, stiffness: 100 },
        [springConfig]
    )

    const handlePress = () => {
        if (isDisabled) return
        onPress?.()
    }

    const handlePressIn = () => {
        if (isDisabled) return
        onPressIn?.()
    }

    const handlePressOut = () => {
        if (isDisabled) return
        onPressOut?.()
    }

    const handleLongPress = () => {
        if (isDisabled) return
        onLongPress?.()
    }

    // Type-cast to bypass Pressto library typing issues
    // const PS: any = PressableScale

    return (
        <TouchableOpacity
            style={style}
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onLongPress={handleLongPress}
            // activeScale={activeScale}
            activeOpacity={activeOpacity}
            // springConfig={computedSpringConfig}
            disabled={isDisabled}
            // rippleRadius={rippleRadius}
            // rippleColor={rippleColor || col.TRANSPARENT}
            hitSlop={hitSlop}
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled }}>
            {loading
                ? (<ActivityIndicator color={lCol ?? col.WHITE01 ?? 'white'} size={lSize ?? 'small'} {...lProps} />)
                : children
                    ? children
                    : (text
                        ? (<TextXCompo tSty={tSty} {...tProps}>{text}</TextXCompo>)
                        : <></>)}
        </TouchableOpacity>
    )
}


export default PressableScaleXCompo;
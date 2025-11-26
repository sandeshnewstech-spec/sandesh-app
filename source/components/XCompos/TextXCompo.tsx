import { TextProps } from 'react-native'
import React, { memo } from 'react'
import Animated from 'react-native-reanimated';
import { useThemeX } from '../../hooks';
import { Size } from '../../functions';
import { TextXType } from '../../Types';

const TextXCompo = ({
    text = "", children, tSty, lChild, rChild,
    fColor, fFamily, fSize, tAlign, lines, autofit, onPress,
    entering, exiting, onLayout,
}: TextXType) => {
    const { col, font } = useThemeX();
    return (
        <Animated.Text style={[
            {
                color: fColor ?? col.BLACK,
                fontFamily: fFamily ?? font?.REGULAR,
                fontSize: fSize ? Size(fSize) : Size(14),
                textAlign: tAlign,
            },
            tSty,
            { includeFontPadding: false }
        ]}
            onLayout={onLayout}
            entering={entering}
            exiting={exiting}
            onPress={onPress}
            numberOfLines={lines}
            adjustsFontSizeToFit={autofit}>
            {lChild && lChild}{text && String(text)}{children && children}{rChild && rChild}
        </Animated.Text>
    )
}

export default memo(TextXCompo)
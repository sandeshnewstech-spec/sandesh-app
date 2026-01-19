import { StyleSheet } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated';
import { bSpace, ICON_SIZE } from 'utils';
import { useThemeX } from 'hooks';
import { defStyObjType } from 'types';
import { IC_FONT_AWESOME6 } from 'assets';
import PressableScaleXCompo from './XCompos/PressableScaleXCompo';

type P = {
    scrollerRef?: any;
    isScrollToTop?: boolean;
    setIsScrollToTop?: (i: boolean) => void;
}
const ScrollToTopCompo = ({ scrollerRef = null, isScrollToTop = false, setIsScrollToTop = () => { } }: P) => {
    const { defStyOBJ, col } = useThemeX();
    const style = stylesFN(defStyOBJ);
    return (
        <Animated.View style={style.up_cover} >
            <PressableScaleXCompo style={style.up_btn}
                onPress={() => {
                    scrollerRef?.current?.scrollToOffset({ animated: true, offset: 0 });
                    setIsScrollToTop(!isScrollToTop);
                }} >
                <IC_FONT_AWESOME6 name='arrow-up-long' size={ICON_SIZE * .7} color={col.PRIMARY} />
            </PressableScaleXCompo>
        </Animated.View>
    )
}

export default ScrollToTopCompo

const stylesFN = ({ col, font, bottom }: defStyObjType) => StyleSheet.create({
    up_cover: {
        position: 'absolute',
        bottom: bottom + bSpace * 2,
        right: bSpace,
        backgroundColor: col.WHITE,
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
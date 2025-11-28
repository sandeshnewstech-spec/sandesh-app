import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { FadeIn, FadeInDown, FadeOutDown, } from 'react-native-reanimated'
import { defStyObjType, ToastType } from '../../types';
import { bSpace, headerHeight } from '../../utils';
import { useThemeX } from '../../hooks';
import { _HEIGHT } from '../../functions';
import TextXCompo from './TextXCompo';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

/**
 * Custom Alert Box(Toast) Component
 **/
const ToastAlertCompo = ({ msg, show, showIC = true, setToast = () => { },
    timeOut, isTimeOut = true, bgCol, cSty, absolute = true, msg_tSty,
    children, entering, exiting, icCol, onPress, ctr = false }: ToastType) => {

    const { col, cpSty, defStyOBJ, bottom, top } = useThemeX();
    const sty = styFN(defStyOBJ);

    useEffect(() => {
        if (isTimeOut) {
            show && setTimeout(() => setToast({ show: false }), timeOut ?? 2000);
        }
    }, [show]);

    if (!show) return (<></>);

    return (
        <AnimatedTouchableOpacity
            onPress={onPress} activeOpacity={1}
            entering={entering ? entering : (absolute ? FadeInDown : FadeIn)}
            exiting={exiting ? exiting : (absolute ? FadeOutDown : undefined)}
            style={[
                absolute ? cpSty.alertBanner_abContainerSty : cpSty.alertBanner_containerSty,
                {
                    backgroundColor: bgCol ? bgCol : col.BLACK08,
                    bottom: ctr ? (bottom + (_HEIGHT / 2) - (headerHeight + top)) : (bottom + bSpace)
                },
                cSty ? cSty : {},
            ]}>
            {children ? children : (<View style={{ justifyContent: 'center' }} >
                <TextXCompo text={msg} tSty={{ ...cpSty.alertBanner_msg_tSty, ...msg_tSty }} />
            </View>)}
        </AnimatedTouchableOpacity>
    );

}

export default React.memo(ToastAlertCompo)

const styFN = ({ font, col, bottom }: defStyObjType) => StyleSheet.create({



})
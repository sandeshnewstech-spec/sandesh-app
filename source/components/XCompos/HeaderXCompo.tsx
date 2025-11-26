import { View } from 'react-native'
import React, { memo, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { headerType } from '../../types';
import PressXCompo from './PressXCompo';
import StatusBarXCompo from './StatusBarXCompo';
import { headerHeight } from '../../utils';
import { useThemeX } from '../../hooks';
import TextXCompo from './TextXCompo';
import { BACK_IC } from '../../assets';
import Animated from 'react-native-reanimated';

const HeaderXCompo = ({
    title, bPress, backBtn = true, lSvg, rSvg, tSty, hHeight, hBgColor,
    alignText = 'center', lHeight, rHeight, hShow = true,
    barStyle, sbColor, sbShow, sbTransition, bIcBgCol, bIcCol, hTextCol, hTextBgCol,
}: headerType) => {

    const navigation = useNavigation();

    const { col, hdSty } = useThemeX();

    const [lH, setLH] = useState<number>(lHeight ?? 0);
    const [rH, setRH] = useState<number>(rHeight ?? 0);

    const lM = useMemo((): number => {
        if (alignText === 'center') {
            if (rH > lH) return rH - lH;
        }
        return 0;
    }, [lH, rH]);
    const rM = useMemo((): number => {
        if (alignText === 'center') {
            if (lH > rH) return lH - rH;
            return 0;
        }
        return 0;
    }, [lH, rH]);

    return (
        <>
            <StatusBarXCompo
                barStyle={barStyle ?? 'default'}
                sbColor={sbColor ?? col.SB_COL}
                sbTransition={sbTransition ?? 'fade'}
                sbShow={sbShow}
            />
            {hShow && (<Animated.View
                style={[
                    hdSty.mainSty, { height: hHeight ?? headerHeight },
                    hdSty?.hSty, { backgroundColor: hBgColor || hdSty?.hSty?.backgroundColor }]}>
                <View onLayout={(event) => { setLH(event.nativeEvent.layout.width) }} >
                    {backBtn && (<PressXCompo
                        children={<BACK_IC color={bIcCol ?? col.HEADER_SVG_COL} />}
                        onPress={bPress ? bPress : () => navigation.goBack()}
                        cSty={{ ...hdSty.hBtnCSty, backgroundColor: bIcBgCol ?? col.HEADER_SVG_BGCOL }}
                        mSty={hdSty.hBtnMSty}
                    />)}
                    {lSvg}</View>
                <View style={[
                    hdSty.textView,
                    {
                        marginLeft: lM,
                        marginRight: rM,
                        alignItems: alignText,
                    }
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
                </View>
                <View onLayout={(event) => { setRH(event.nativeEvent.layout.width) }} >{rSvg}</View>
            </Animated.View>)}
        </>
    )
}

export default memo(HeaderXCompo);
import { SafeAreaView, View, } from 'react-native'
import React, { memo } from 'react'
import { ScrollView, ScrollView as ScrollViewG } from 'react-native-gesture-handler';
import HeaderXCompo from './HeaderXCompo';
import { useThemeX } from '../../hooks';
import { MasterViewType } from '../../types';
import ToastAlertCompo from './ToastAlertCompo';
import ScrLoaderCompo from './ScrLoaderCompo';

const MasterViewCompo = ({
    children, fixed = false, gScroll = false,
    style, bgCol, bgCol2, header, bottomBarColor, autoAdujKeyInsets, modals, bSvg, tSvg,
    alignText = 'center', lHeight, rHeight, hShow = true, barStyle, sbColor, sbShow = true, sbTransition,
    keyboardShouldPersistTaps, setToast, toast, topNODE, btmNODE, abScrLoader, abLoader, scrLoader,
    title, bPress, backBtn = true, lSvg, rSvg, tSty, hHeight, hBgColor,
}: MasterViewType) => {

    const { col, bottom } = useThemeX();

    const headerProps = {
        title, bPress, backBtn, lSvg, rSvg, tSty, hHeight, hBgColor, alignText, lHeight, rHeight, hShow,
        barStyle, sbColor, sbShow, sbTransition
    };

    return (
        <View style={{ backgroundColor: bgCol ? bgCol : col.SCR_BGCOL, flex: 1 }}>
            {(header ? header : <HeaderXCompo {...headerProps} />)}
            <View style={{ flex: 1, backgroundColor: bgCol2 ? bgCol2 : bgCol }}>
                {tSvg && tSvg}
                {fixed ? (
                    <View style={{ flex: 1 }} >
                        {children}
                    </View>
                ) : gScroll ? (
                    <ScrollViewG
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        automaticallyAdjustKeyboardInsets={autoAdujKeyInsets}
                        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                        style={{ flex: 1, backgroundColor: bgCol, }}
                        contentContainerStyle={[style]}
                    >{children}</ScrollViewG>
                ) : (<ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets={autoAdujKeyInsets}
                    keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                    style={{ flex: 1, backgroundColor: bgCol, }}
                    contentContainerStyle={[style]}
                >{children}</ScrollView>)
                }
                {bSvg && bSvg}
            </View>
            {(bottomBarColor) && <SafeAreaView
                style={{ backgroundColor: bottomBarColor ? bottomBarColor : 'black', height: bottom }}
            />}
            {modals && modals}
            <ScrLoaderCompo loading={abScrLoader} absolute />
            <SafeAreaView style={{ backgroundColor: col.TRANSPARENT, height: bottom }} />
            <ToastAlertCompo {...toast} setToast={setToast} />
        </View>
    );
}

export default memo(MasterViewCompo)
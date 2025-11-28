import { KeyboardAvoidingView, SafeAreaView, View, } from 'react-native'
import React, { memo } from 'react'
import { ScrollView, ScrollView as ScrollViewG } from 'react-native-gesture-handler';
import HeaderXCompo from './HeaderXCompo';
import { useThemeX } from '../../hooks';
import { MasterViewType } from '../../types';
import ToastAlertCompo from './ToastAlertCompo';
import ScrLoaderCompo from './ScrLoaderCompo';
import { kAvoidSty } from '../../utils';
import Animated from 'react-native-reanimated';

const MasterViewCompo = ({
    children, fixed = false, gScroll = false, scrollViewRef, bounces, onScroll, scrollEnabled,
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
            <KeyboardAvoidingView behavior={kAvoidSty}
                style={{ flex: 1, backgroundColor: bgCol2 ? bgCol2 : bgCol, overflow: 'hidden' }}>
                {scrLoader ? <ScrLoaderCompo loading={scrLoader} />
                    : (<>
                        {tSvg && tSvg}
                        {fixed ? (<View style={[{ flex: 1 }, style]} children={children} />)
                            : gScroll ? (
                                <ScrollViewG
                                    ref={scrollViewRef}
                                    bounces={bounces}
                                    onScroll={onScroll}
                                    nestedScrollEnabled={true}
                                    showsVerticalScrollIndicator={false}
                                    scrollEnabled={scrollEnabled}
                                    automaticallyAdjustKeyboardInsets={autoAdujKeyInsets}
                                    style={{ flex: 1, backgroundColor: bgCol, }}
                                    keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                                    contentContainerStyle={[
                                        { width: "100%" },
                                        style]}>{children}</ScrollViewG>)
                                : (<Animated.ScrollView
                                    ref={scrollViewRef}
                                    bounces={bounces}
                                    onScroll={onScroll}
                                    scrollEnabled={scrollEnabled}
                                    nestedScrollEnabled={true}
                                    showsVerticalScrollIndicator={false}
                                    automaticallyAdjustKeyboardInsets={autoAdujKeyInsets}
                                    style={{ flex: 1, backgroundColor: bgCol, }}
                                    keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                                    contentContainerStyle={[
                                        { width: "100%", flexGrow: 1, overflow: 'hidden' },
                                        style]}>{children}</Animated.ScrollView>)}
                        {bSvg && bSvg}
                        <ScrLoaderCompo loading={abLoader} absolute />
                    </>)
                }
            </KeyboardAvoidingView>
            {
                (bottomBarColor) && <SafeAreaView
                    style={{ backgroundColor: bottomBarColor ? bottomBarColor : 'black', height: bottom }}
                />
            }
            {modals && modals}
            <ScrLoaderCompo loading={abScrLoader} absolute />
            <ToastAlertCompo {...toast} setToast={setToast} />
        </View>
    );
}

export default memo(MasterViewCompo);
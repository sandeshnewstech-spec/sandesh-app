import React, { useState } from 'react'
import { MasterView, ScrLoader, TextX, WebViewX } from 'components';
import { _HEIGHT, bSpace, ICON_SIZE, WEB_STORY_DETAIL_URL } from 'utils';
import { useThemeX } from 'hooks';
import { StyleSheet, Text, View } from 'react-native';
import { defStyObjType } from 'types';
import { Size } from 'functions';
import { BACK_IC, IC_MATERIAL } from 'assets';
import PressableScaleXCompo from 'components/XCompos/PressableScaleXCompo';

const WebStoryViewController = ({ route, navigation }: any) => {
    const _item = route?.params?.item;
    const [loading, setLoading] = useState<boolean>(true);
    const { col, defStyOBJ } = useThemeX();
    const style = styleFN(defStyOBJ);
    return (<MasterView style={style.main} hShow={false} >
        <View style={{}} >
            <TextX text={`          ${_item?.title}`} tSty={style.title} />
            <PressableScaleXCompo onPress={() => navigation.goBack()} style={style.back_ic} >
                <IC_MATERIAL name='keyboard-backspace' size={ICON_SIZE} color={col.HEADER_SVG_COL} />
            </PressableScaleXCompo>
        </View>
        <View style={style.webStoryCover} >
            <WebViewX
                url={`${WEB_STORY_DETAIL_URL}${_item?.url}`}
                setLoading={setLoading}
            />
            <ScrLoader absolute loading={loading} />
        </View>
    </MasterView>);
}

export default WebStoryViewController

const backBRNHeight = ICON_SIZE + 16;
const styleFN = ({ font, col }: defStyObjType) => StyleSheet.create({
    main: {
        padding: bSpace * .6
    },
    back_ic: {
        borderRadius: 100,
        backgroundColor: col.HEADER_SVG_BGCOL,
        height: backBRNHeight,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginLeft: 0,
        borderWidth: .1,
        borderColor: col.BLACK05
    },
    title: {
        fontFamily: font.BOLD,
        fontSize: Size(24),
        lineHeight: backBRNHeight,
        color: col.TEXT_COL,
        flexWrap: "wrap",
        verticalAlign: 'middle',
    },
    webStoryCover: {
        width: "100%",
        height: _HEIGHT * .75,
        borderRadius: 20,
        marginTop: bSpace / 2,
        overflow: 'hidden',
    }
});
import { StyleSheet, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import FastSquircleView from 'react-native-fast-squircle'
import { useThemeX } from 'hooks'
import { defStyObjType } from 'types'
import { bSpace, ICON_SIZE } from 'utils'
import { TextX } from 'components'
import { copyToClipboard, Size } from 'functions'
import PressableScaleXCompo from './XCompos/PressableScaleXCompo'
import { IC_FONT_AWESOME6, IC_MATERIAL } from 'assets'
import useZuStore from 'store/useZuStore'

type P = {
    children?: React.ReactNode;
    title?: string;
    style?: ViewStyle;
    isTitleOutline?: boolean;
    linkCategoryTitle?: string;
    isReadMore?: boolean;
    readMore?: () => void;
}
const ContentListCoverWithTitleCompo = ({ readMore = () => { }, linkCategoryTitle, children, title, style, isTitleOutline = true, isReadMore = true }: P) => {
    const { defStyOBJ, col, str } = useThemeX();
    const { appServices } = useZuStore();
    const cstyle = stylesFN(defStyOBJ);
    const [isCopy, setISCopy] = useState<boolean>(false);
    useEffect(() => {
        if (isCopy) {
            setTimeout(() => setISCopy(false), 5000);
        }
    }, [isCopy]);
    return (<FastSquircleView cornerSmoothing={.1} style={[cstyle.cover, style]} >
        {(isReadMore || title) && <View style={cstyle.cover2} >
            {title && <TextX text={title} tSty={cstyle.title} />}
            {isReadMore && <PressableScaleXCompo onPress={readMore}
                text={str.READ_MORE + " >>"} tSty={cstyle.readMoreTitle} />}
        </View>}
        {isTitleOutline && <View style={{ height: .5, backgroundColor: col.OUTLINE02 }} />}
        {children && children}
        {isTitleOutline && <View style={{ height: .5, backgroundColor: col.OUTLINE02 }} />}
        <View style={cstyle.cover3} >
            <PressableScaleXCompo style={cstyle.btnCSty} onPress={() => { }} >
                <IC_FONT_AWESOME6 name='whatsapp' size={ICON_SIZE} color={col.NEWS_CONTENT_ICONS_COL} />
            </PressableScaleXCompo>
            <PressableScaleXCompo style={cstyle.btnCSty} onPress={() => { }} >
                <IC_FONT_AWESOME6 name='facebook' size={ICON_SIZE} color={col.NEWS_CONTENT_ICONS_COL} />
            </PressableScaleXCompo>
            <PressableScaleXCompo style={cstyle.btnCSty} onPress={() => { }} >
                <IC_MATERIAL name='share' size={ICON_SIZE} color={col.NEWS_CONTENT_ICONS_COL} />
            </PressableScaleXCompo>
            <PressableScaleXCompo style={cstyle.btnCSty} onPress={() => { setISCopy(copyToClipboard(`${appServices?.baseURL}/${linkCategoryTitle}`)); }} >
                <IC_MATERIAL name='link' size={ICON_SIZE} color={isCopy ? col.PRIMARY : col.NEWS_CONTENT_ICONS_COL} />
            </PressableScaleXCompo>
        </View>
    </FastSquircleView>);
}

export default ContentListCoverWithTitleCompo;

const stylesFN = ({ col, font }: defStyObjType) => StyleSheet.create({
    cover: {
        backgroundColor: col.NEWS_CONTENT_BG,
        paddingBottom: bSpace / 2,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
        marginVertical: bSpace / 2,
    },
    cover2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Size(60),
        paddingHorizontal: bSpace,
    },
    title: {
        fontFamily: font.BOLD,
        fontSize: Size(22),
        color: col.PRIMARY,
    },
    readMoreTitle: {
        fontFamily: font.BOLD,
        fontSize: Size(18),
        color: col.PRIMARY,
    },
    cover3: {
        width: "100%",
        height: Size(60),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: bSpace / 2,
    },
    btnCSty: {
        backgroundColor: col.WHITE01,
        height: Size(45),
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginHorizontal: 5,
    },
});
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { useThemeX } from 'hooks'
import { defStyObjType, VideoItemType } from 'types';
import { _WIDTH, bSpace, ICON_SIZE } from 'utils';
import { VideoFrame } from 'components';
import TextXCompo from './XCompos/TextXCompo';
import { Size } from 'functions';
import PressableScaleXCompo from './XCompos/PressableScaleXCompo';
import { IC_FONT_AWESOME6, IC_MATERIAL } from 'assets';

type P = {
    isPlaying: boolean;
    index: number;
    scr_height: number;
    tags?: string[];
} & VideoItemType;

const VideoItemCompo = ({ video_yt, isPlaying, index, title, tagline, scr_height, tags = [] }: P) => {
    const { defStyOBJ, col, str, font } = useThemeX();
    const style = styleFN(defStyOBJ);

    return (<View style={[style.mainSty, { height: scr_height }]} >
        <View>
            <TextXCompo text={title} tSty={style.titleSty} lines={3} />
            <ScrollView
                contentContainerStyle={style.tags_cSty}
                horizontal showsHorizontalScrollIndicator={false}>
                {tags?.map((item, index) => <PressableScaleXCompo key={index.toString()} style={style.tagsbtn} >
                    <TextXCompo>
                        <TextXCompo text={"#"} tSty={{ ...style.tagsTitle, fontFamily: font.BOLD }} />
                        <TextXCompo text={item} tSty={style.tagsTitle} />
                    </TextXCompo>
                </PressableScaleXCompo>)}
            </ScrollView>
        </View>
        <VideoFrame
            yt_video_id={video_yt || ""}
            style={{ backgroundColor: col.BLACK, flex: 1, width: _WIDTH }}
            yt_params={{ autoplay: isPlaying ? 1 : 0, controls: 1, rel: 1, iv_load_policy: 3, fs: 0 }} />
        <View>

            <View style={style.buttonContainer} >
                <PressableScaleXCompo style={style.icBtn}>
                    <IC_FONT_AWESOME6 name='whatsapp' color={col.BTN_TEXT_COL} size={ICON_SIZE} />
                </PressableScaleXCompo>
                <View style={{ width: bSpace / 2 }} />
                <PressableScaleXCompo
                    style={style.readNewsBtn}
                    tSty={style.readNewsBtnTitle}>
                    <TextXCompo text={str?.READ_NEWS} tSty={style.readNewsBtnTitle} />
                    <IC_FONT_AWESOME6 name='arrow-right' color={col.BTN_TEXT_COL} size={ICON_SIZE * .6} />
                </PressableScaleXCompo>
                <View style={{ width: bSpace / 2 }} />
                <PressableScaleXCompo style={style.icBtn}>
                    <IC_MATERIAL name='send' color={col.BTN_TEXT_COL} size={ICON_SIZE} />
                </PressableScaleXCompo>
            </View>
        </View>
    </View>)
}

export default memo(VideoItemCompo);

const styleFN = ({ bottom, top, font, col }: defStyObjType) => StyleSheet.create({

    mainSty: {
        flex: 1,
        width: _WIDTH,
        backgroundColor: 'black',
        borderWidth: 1,
        justifyContent: 'center'
    },
    titleSty: {
        fontFamily: font.BLACK,
        fontSize: Size(23),
        color: col.WHITE,
        paddingRight: _WIDTH * .08,
        paddingLeft: bSpace,
        marginTop: 5
    },
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: bSpace,
        alignItems: 'center',
        maxHeight: 70,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icBtn: {
        height: "100%",
        aspectRatio: 1,
        backgroundColor: col.PRIMARY,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    readNewsBtn: {
        flex: 1,
        height: "100%",
        backgroundColor: col.PRIMARY,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    readNewsBtnTitle: {
        fontFamily: font.SEMI_BOLD_ITALIC,
        color: col.BTN_TEXT_COL,
        fontSize: Size(18),
        paddingRight: 10
    },
    tags_cSty: {
        paddingLeft: bSpace / 2,
        paddingRight: bSpace / 2,
        marginTop: bSpace / 2,
        width: _WIDTH * 4,
        maxHeight: (Size(30) + (bSpace / 2)) * 3,
        flexWrap: 'wrap',
    },
    tagsTitle: {
        fontFamily: font.MEDIUM,
        color: col.BTN_TEXT_COL,
        fontSize: Size(15),
    },
    tagsbtn: {
        height: Size(30),
        paddingHorizontal: bSpace,
        backgroundColor: col.PRIMARY,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: bSpace / 2,
        marginBottom: bSpace / 2
    }
})
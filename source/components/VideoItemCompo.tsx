import { StyleSheet, View } from 'react-native'
import React, { memo, useRef, useState } from 'react'
import { useThemeX } from 'hooks'
import useZuStore from 'store/useZuStore';
import { defStyObjType, VideoItemType, YoutubeIFramePlayerRefType } from 'types';
import { _HEIGHT, _WIDTH, BOTTOM_TAB_HEIGHT, bSpace, CUSTOM_USER_AGENT } from 'utils';
import { VideoFrame, YoutubeIFramePlayer } from 'components';
import TextXCompo from './XCompos/TextXCompo';
import { Size } from 'functions';
import YoutubePlayer, { YoutubeIframeProps } from "react-native-youtube-iframe";
import WebView from 'react-native-webview';

type P = {
    isPlaying: boolean;
    index: number;
    scr_height: number;
} & VideoItemType;

const VideoItemCompo = ({ video_yt, isPlaying, index, title, tagline, scr_height }: P) => {
    const { defStyOBJ, bottom, top, col } = useThemeX();
    const style = styleFN(defStyOBJ);
    const { } = useZuStore();
    const ytRef = useRef<YoutubeIFramePlayerRefType>(null);

    return (<View style={[style.mainSty, { height: scr_height }]} >
        <View>
            <TextXCompo text={title} tSty={style.titleSty} lines={3} />
        </View>
        <VideoFrame
            yt_video_id={video_yt || ""}
            style={{ backgroundColor: col.BLACK, flex: 1, width: _WIDTH }}
            yt_params={{ autoplay: isPlaying ? 1 : 0, controls: 1, rel: 1, iv_load_policy: 3, loop: 1 }}
        />
        {/* <View style={{ height: 300, backgroundColor: 'red' }} >

        </View> */}
    </View>)
}

export default memo(VideoItemCompo)

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
        fontSize: Size(22),
        color: col.WHITE,
        paddingVertical: bSpace,
        paddingRight: 50,
        paddingLeft: bSpace
    }
})
import { View, Text, ViewStyle, StyleSheet, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { EnumValues, OnLoadData, ResizeMode, VideoNativeProps, Video, ReactVideoSource, FullscreenOrientationType } from 'react-native-video';
import { useThemeX } from '../../hooks';
import { defStyObjType } from '../../types';
import { formatDurationFN, Size } from '../../functions';
import TextXCompo from './TextXCompo';
import { getVideoDuration } from 'react-native-video-duration';

interface P {
    muted?: VideoNativeProps['muted'];
    repeat?: VideoNativeProps['repeat'];
    paused?: VideoNativeProps['paused'];
    resizeMode?: EnumValues<ResizeMode>;
    // videoStyle?: VideoNativeProps['style'];
    videoStyle?: any;
    source?: ReactVideoSource;
    playWhenInactive?: VideoNativeProps['playWhenInactive'];
    playInBackground?: VideoNativeProps['playInBackground'];
    controls?: VideoNativeProps['controls'];
    fullscreenAutorotate?: VideoNativeProps['fullscreenAutorotate'];
    fullscreenOrientation?: EnumValues<FullscreenOrientationType>;
    uri?: string;
    cSty?: ViewStyle;
    vRef?: any;
    showOnlyImageFrame?: boolean;
    showDuration?: boolean;
}

const VideoXCompo = ({ showDuration, showOnlyImageFrame, vRef, playInBackground = false,
    paused, cSty, muted, repeat, resizeMode, videoStyle, source, uri, playWhenInactive,
    controls, fullscreenAutorotate, fullscreenOrientation }: P) => {

    const { defStyOBJ } = useThemeX();
    const sty = styFn(defStyOBJ);

    const [duration, setDuration] = useState<number | null>(null);
    const [error, setError] = useState<boolean>(false);

    const handleVideoLoad = useCallback((data: OnLoadData) => {
        setDuration(data?.duration);
    }, [source, source?.uri, uri]);

    useEffect(() => {
        /** 
         * IN IOS WE ARE NOT ABLE TO USE THIS WAY
         * BECAUSE IN THIS WAY THIS IS USE ITEM URI 
         * AND IOS IS NOT SUPPORT THIS STRING THIS IS ONLY PHONE URL SHOW 
         * ITEM URL IS NOT ACTUAL PATH FOR DOCUMENT SO WE NEED TO CALL ONE FN
         * CALL ONE FUN AND FOR GET ACTUAL DOC PATH FOR IOS
         **/
        getVideoDuration(String(source?.uri || uri || "")).then(seconds => {
            if (seconds) setDuration(parseFloat(seconds.toString()));
        });
    }, [source, source?.uri, uri]);

    return (
        <View style={[sty.container, cSty]}  >
            {(error || showOnlyImageFrame)
                ? (<Image
                    source={{ uri: String(source?.uri || uri), cache: 'force-cache' }}
                    style={[{ flex: 1 }, videoStyle]} />)
                : (<Video
                    ref={vRef}
                    repeat={repeat}
                    muted={muted}
                    paused={paused}
                    source={source ? source : { uri, shouldCache: true }}
                    resizeMode={resizeMode}
                    playWhenInactive={playWhenInactive}
                    style={[{ flex: 1 }, videoStyle]}
                    playInBackground={playInBackground}
                    // ignoreSilentSwitch={"ignore"}
                    onLoad={handleVideoLoad}
                    fullscreenAutorotate={fullscreenAutorotate}
                    fullscreenOrientation={fullscreenOrientation}
                    controls={controls}
                    onError={(e: any) => {
                        console.log("VideoXCompo::onError::", e);
                        setError(true);
                    }}
                />)
            }
            {(showDuration && duration) && <View style={sty.durationCSty} >
                <TextXCompo
                    text={formatDurationFN(duration)}
                    tSty={sty.durationTextSty} />
            </View>}
        </View>
    )
}

export default React.memo(VideoXCompo);

const styFn = ({ font, col }: defStyObjType) => StyleSheet.create({
    container: {
    },
    durationTextSty: {
        fontFamily: font.BOLD,
        fontSize: Size(13),
        color: col.PRIMARY
    },
    durationCSty: {
        position: 'absolute',
        bottom: 5,
        left: 5,
    }
})
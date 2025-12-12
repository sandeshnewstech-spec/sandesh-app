import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { useThemeX } from 'hooks'
import { defStyObjType } from 'types';
import { IC_MATERIAL } from 'assets';
import { pLOG, Size } from 'functions';
import PressableScaleXCompo from 'components/XCompos/PressableScaleXCompo';
import { useNavigation } from '@react-navigation/native';
import { VideoFrame } from 'components';
import useZuStore from 'store/useZuStore';

const LiveButtonCompo = () => {
    const navigation: any = useNavigation();
    const { appServices } = useZuStore();
    const { defStyOBJ, col } = useThemeX();
    const style = styleFN(defStyOBJ);
    return (<PressableScaleXCompo onPress={() => navigation.navigate("LiveTVScreen")}>
        <View style={style.mSty}>
            <VideoFrame
                style={{ flex: 1 }}
                yt_video_id={appServices?.liveStreamYoutubeId || ""}
                yt_params={{ autoplay: 1, mute: 1, controls: 0, rel: 1, iv_load_policy: 3, }}
            />
            <View style={style.live_btn_cSty} >
                <IC_MATERIAL
                    name='connected-tv'
                    size={Size(25)} color={col.WHITE09} />
            </View>
        </View>
    </PressableScaleXCompo>)
}

export default memo(LiveButtonCompo)

const styleFN = ({ col }: defStyObjType) => StyleSheet.create({
    mSty: {
        flex: 1,
        height: "100%",
        width: 90,
        overflow: 'hidden',
        borderRadius: Size(13),
        borderWidth: 3,
        borderColor: col.PRIMARY,
        backgroundColor: col.BLACK
    },
    live_btn_cSty: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        width: "100%",
        backgroundColor: col.BLACK05
    }
});
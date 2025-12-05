import { StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import { useThemeX } from 'hooks'
import { defStyObjType } from 'types';
import WebView from 'react-native-webview';
import { IC_MATERIAL } from 'assets';
import { Size } from 'functions';
import PressableScaleXCompo from 'components/XCompos/PressableScaleXCompo';
import { useNavigation } from '@react-navigation/native';

const LiveButtonCompo = () => {
    const navigation: any = useNavigation();
    const { defStyOBJ, col } = useThemeX();
    const style = styleFN(defStyOBJ);
    const webViewRef = useRef<WebView>(null);
    return (
        <PressableScaleXCompo onPress={() => navigation.navigate("LiveTVScreen")}>
            <View style={style.mSty} >
                <WebView
                    ref={webViewRef}
                    source={{
                        uri: `https://www.youtube.com/embed/mHUhh0WFuu4?autoplay=1&mute=1&playsinline=1`,
                        headers: { Referer: "https://sandesh.com" },
                    }}
                    // style={{ borderRadius: 100, overflow: 'hidden' }}
                    scrollEnabled={false}
                    allowsInlineMediaPlayback={false}
                    mediaPlaybackRequiresUserAction={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    originWhitelist={["*"]}
                    allowsFullscreenVideo={true}
                    cacheEnabled={true}
                    setSupportMultipleWindows={false}
                    androidLayerType="hardware"
                />
                <View style={style.live_btn_cSty} >
                    <IC_MATERIAL
                        name='connected-tv'
                        size={Size(25)} color={col.WHITE09} />
                </View>
            </View>
        </PressableScaleXCompo>

    )
}

export default LiveButtonCompo

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
import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { useThemeX } from 'hooks'
import { defStyObjType } from 'types';
import { MasterView } from 'components';
import WebView from 'react-native-webview';

const LiveTVController = () => {
    const { defStyOBJ, col } = useThemeX();
    const style = styleFN(defStyOBJ);
    const webViewRef = useRef<WebView>(null);
    return (
        <MasterView fixed
            sbColor={col.BLACK} barStyle='light-content'
            bottomBarColor={col.BLACK} hBgColor={col.BLACK}
            bgCol={col.BLACK} bgCol2={col.BLACK}
            bIcCol={col.WHITE} bIcBgCol={col.WHITE02} >
            <WebView
                ref={webViewRef}
                style={{ backgroundColor: col.BLACK }}
                source={{
                    uri: `https://www.youtube.com/embed/mHUhh0WFuu4?autoplay=1&playsinline=1`,
                    headers: { Referer: "https://sandesh.com" },
                }}
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
        </MasterView>
    )
}

export default LiveTVController

const styleFN = ({ col, font }: defStyObjType) => StyleSheet.create({

})
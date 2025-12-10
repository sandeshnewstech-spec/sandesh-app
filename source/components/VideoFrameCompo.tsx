import { memo, useCallback, useState } from "react";
import { Linking, View, ViewStyle } from "react-native";
import { WebView } from "react-native-webview";
import { ShouldStartLoadRequest } from "react-native-webview/lib/WebViewTypes";
import { CUSTOM_USER_AGENT, isIOS } from "utils";
import ScrLoaderCompo from "./XCompos/ScrLoaderCompo";
import { buildYouTubeUrl, YouTubeParamsType } from "types";

type P = {
    yt_video_id: string;
    style?: ViewStyle;
    webViewStyle?: ViewStyle;
    yt_params?: YouTubeParamsType;
}

const VideoFrameCompo = ({ yt_video_id, style, webViewStyle, yt_params }: P) => {

    const [loading, setLoading] = useState(true);

    const onShouldStartLoadWithRequest = useCallback((request: ShouldStartLoadRequest) => {
        try {
            const url = request.mainDocumentURL || request.url;
            if (isIOS) {
                const iosFirstLoad = url === 'about:blank';
                if (iosFirstLoad) {
                    return true;
                }
                const isYouTubeLink = url.startsWith('https://www.youtube.com/');
                if (isYouTubeLink) {
                    Linking.openURL(url).catch(error => {
                        console.warn('Error opening URL:', error);
                    });
                    return false;
                }
            }
            return url.startsWith('https://www.youtube.com/');
        } catch (error) {
            // defaults to true in case of error
            // returning false stops the video from loading
            return true;
        }
    }, []);

    const yt_url = buildYouTubeUrl(yt_video_id, yt_params);

    return (
        <View style={[style]} >
            {/* <Text style={{ color: 'white' }} >{buildYouTubeUrl(yt_video_id, yt_params)}</Text> */}
            <WebView
                source={{
                    uri: yt_url,
                    headers: { Referer: 'https://sandesh.com', userAgent: CUSTOM_USER_AGENT }
                }}
                containerStyle={{ backgroundColor: style?.backgroundColor }}
                style={[{ flex: 1, backgroundColor: style?.backgroundColor }, webViewStyle]}
                indicatorStyle="white"
                onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                userAgent={CUSTOM_USER_AGENT}
                cacheMode='LOAD_CACHE_ONLY'
                scrollEnabled={false}
                allowsInlineMediaPlayback={false}
                allowsAirPlayForMediaPlayback={false}
                mediaPlaybackRequiresUserAction={false}
                allowsPictureInPictureMediaPlayback={false}
                javaScriptEnabled
                domStorageEnabled
                originWhitelist={[yt_url]}
                allowsFullscreenVideo
                cacheEnabled
                setSupportMultipleWindows={false}
                androidLayerType="hardware"
                onLoadEnd={() => setLoading(false)}
                onLoadSubResourceError={() => setLoading(false)}
                onError={() => setLoading(false)}
                onHttpError={() => setLoading(false)}
                onMessage={() => setLoading(false)}
                onNavigationStateChange={() => setLoading(false)}
            />
            <ScrLoaderCompo loading={loading} />
        </View>
    )
}

export default memo(VideoFrameCompo);
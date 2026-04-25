import { useCallback, useState } from "react";
import { Linking, View, ViewStyle } from "react-native";
import { WebView } from "react-native-webview";
import { ShouldStartLoadRequest } from "react-native-webview/lib/WebViewTypes";
import { CUSTOM_USER_AGENT, isIOS } from "utils";
import ScrLoaderCompo from "./XCompos/ScrLoaderCompo";
import { buildYouTubeUrl, YouTubeParamsType } from "types";
import WebViewXCompo from "./XCompos/WebViewXCompo";

type P = {
    yt_video_id: string;
    style?: ViewStyle;
    webViewStyle?: ViewStyle;
    yt_params?: YouTubeParamsType;
    loaderSize?: number;
    originWhitelist?: string[];
}

const VideoFrameCompo = ({ yt_video_id, style, webViewStyle, yt_params, loaderSize = 65, originWhitelist = [] }: P) => {

    const [loading, setLoading] = useState(true);

    const onShouldStartLoadWithRequest = useCallback((request: ShouldStartLoadRequest) => {
        try {
            const url = request.mainDocumentURL || request.url;
            // if (isIOS) {
            //     const iosFirstLoad = url === 'about:blank';
            //     if (iosFirstLoad) {
            //         return true;
            //     }
            //     const isYouTubeLink = url.startsWith('https://www.youtube.com/');
            //     if (isYouTubeLink) {
            //         Linking.openURL(url).catch(error => {
            //             console.warn('Error opening URL:', error);
            //         });
            //         return false;
            //     }
            // }
            return url.startsWith('https://www.youtube.com/');
        } catch (error) {
            // defaults to true in case of error
            // returning false stops the video from loading
            return true;
        }
    }, []);

    const yt_url = buildYouTubeUrl(yt_video_id, yt_params);

    return (
        <View style={[style]}>
            {/* <Text style={{ color: 'white' }} >{buildYouTubeUrl(yt_video_id, yt_params)}</Text> */}
            <WebViewXCompo
                url={yt_url}
                originWhitelist={[yt_url, "https://www.youtube.com/", ...originWhitelist]}
                setLoading={setLoading} onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                headers={{ Referer: 'https://sandesh.com', userAgent: CUSTOM_USER_AGENT }}
            />
            <ScrLoaderCompo loading={loading} loaderSize={loaderSize} />
        </View>
    )
}

export default (VideoFrameCompo);
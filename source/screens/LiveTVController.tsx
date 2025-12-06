import { StyleSheet, View } from 'react-native'
import React, { useRef, useState, useCallback, useMemo } from 'react'
import { useThemeX } from 'hooks'
import { defStyObjType } from 'types'
import { MasterView, PressableScaleX } from 'components'
import TextXCompo from 'components/XCompos/TextXCompo'
import WebView from 'react-native-webview'
import ScrLoaderCompo from 'components/XCompos/ScrLoaderCompo'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    FadeIn,
    FadeOut,
} from 'react-native-reanimated'
import { _WIDTH } from 'utils'
import { Size } from 'functions'

interface WebViewErrorState {
    hasError: boolean
    errorMessage: string
}

const LiveTVController = () => {
    const { defStyOBJ, col } = useThemeX()
    const style = styleFN(defStyOBJ)
    const webViewRef = useRef<WebView>(null)

    // State management
    const [loading, setLoading] = useState(true)
    const [errorState, setErrorState] = useState<WebViewErrorState>({
        hasError: false,
        errorMessage: '',
    })

    // WebView load start handler
    const handleLoadStart = useCallback(() => {
        setLoading(true)
        setErrorState({ hasError: false, errorMessage: '' })
    }, [])

    // WebView error handler
    const handleWebViewError = useCallback((event: any) => {
        const errorMsg = event.nativeEvent.description || 'Failed to load video'

        setErrorState({
            hasError: true,
            errorMessage: errorMsg,
        })
        setLoading(false)

    }, [])

    // Retry handler
    const handleRetry = useCallback(() => {
        setErrorState({ hasError: false, errorMessage: '' })
        setLoading(true)
        webViewRef.current?.reload()
    }, [])

    // Message handler for additional error logging
    const handleMessage = useCallback((event: any) => {
        try {
            const message = JSON.parse(event.nativeEvent.data)
            if (message.type === 'error') {
                setErrorState({
                    hasError: true,
                    errorMessage: message.error || 'An error occurred',
                })
            }
        } catch (e) {
            // Silent fail for message parsing
        }
    }, [])

    return (
        <MasterView
            fixed
            sbColor={col.BLACK}
            barStyle="light-content"
            bottomBarColor={col.BLACK}
            hBgColor={col.BLACK}
            bgCol={col.BLACK}
            bgCol2={col.BLACK}
            bIcCol={col.WHITE}
            bIcBgCol={col.WHITE02}
            abLoader={loading}
        >
            <View style={[style.container]}>
                <WebView
                    ref={webViewRef}
                    style={{ backgroundColor: col.BLACK, flex: 1, width: _WIDTH }}
                    source={{
                        uri: `https://www.youtube.com/embed/mHUhh0WFuu4?autoplay=1&playsinline=1`,
                        headers: { Referer: 'https://sandesh.com' },
                    }}
                    scrollEnabled={false}
                    allowsInlineMediaPlayback
                    mediaPlaybackRequiresUserAction={false}
                    javaScriptEnabled
                    domStorageEnabled
                    originWhitelist={['*']}
                    allowsFullscreenVideo
                    cacheEnabled
                    setSupportMultipleWindows={false}
                    androidLayerType="hardware"
                    onLoadStart={handleLoadStart}
                    onLoadEnd={() => setLoading(false)}
                    onError={handleWebViewError}
                    onMessage={handleMessage}
                />

                {/* Error display */}
                {errorState?.hasError && (
                    <Animated.View
                        entering={FadeIn.duration(300)}
                        exiting={FadeOut.duration(300)}
                        style={[style.errorContainer]}>
                        <TextXCompo
                            tSty={[style.errorTitle]}
                            text="⚠️ Error Loading Video" />
                        <TextXCompo
                            tSty={[style.errorMessage]}
                            text={errorState.errorMessage} />
                        <PressableScaleX style={style.errorActionsBtn} >
                            <TextXCompo
                                tSty={style.errorActionsBtnTitle}
                                text="Retry"
                                onPress={handleRetry}
                            />
                        </PressableScaleX>
                    </Animated.View>
                )}
            </View>
        </MasterView>
    )
}

export default LiveTVController

const styleFN = ({ col, font }: defStyObjType) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: col.BLACK,
            justifyContent: 'center',
            alignItems: 'center',
        },
        errorContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            zIndex: 1000,
        },
        errorTitle: {
            fontSize: Size(18),
            fontFamily: font.MEDIUM,
            marginBottom: 12,
            textAlign: 'center',
            color: col.WHITE
        },
        errorMessage: {
            fontSize: Size(12),
            fontFamily: font.REGULAR,
            textAlign: 'center',
            marginHorizontal: 10,
            lineHeight: 20,
            color: col.WHITE
        },
        errorActionsBtn: {
            alignItems: 'center',
            marginTop: 10,
            backgroundColor: col.BTN_BGCOL,
            paddingHorizontal: Size(20),
            paddingVertical: Size(10),
            borderRadius: 100,
        },
        errorActionsBtnTitle: {
            fontSize: Size(18),
            fontFamily: font.MEDIUM,
            textAlign: 'center',
            color: col.BTN_TEXT_COL
        },
    })
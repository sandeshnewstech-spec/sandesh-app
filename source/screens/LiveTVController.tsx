import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useThemeX } from 'hooks'
import { defStyObjType } from 'types'
import { MasterView, VideoFrame } from 'components'
import { _WIDTH } from 'utils'
import { Size } from 'functions'

const LiveTVController = () => {
    const { defStyOBJ, col } = useThemeX()
    const style = styleFN(defStyOBJ)

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
            bIcBgCol={col.WHITE02}>
            <View style={[style.container]}>
                <VideoFrame
                    yt_video_id='mHUhh0WFuu4'
                    style={{ backgroundColor: col.BLACK, flex: 1, width: _WIDTH }}
                    yt_params={{ autoplay: 1, rel: 1, iv_load_policy: 3, }}
                />
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
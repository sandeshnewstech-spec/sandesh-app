import { StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { HomePage, ImageX, LiveButton, MasterView, PressableScaleX } from 'components'
import useZuStore from 'store/useZuStore'
import { _HEIGHT, _WIDTH, bSpace, ICON_SIZE } from 'utils'
import { defStyObjType, HomeSecondaryDataType, HomeTopMenuItemType } from 'types'
import { useAPIs, useThemeX } from 'hooks'
import Animated from 'react-native-reanimated'
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs'
import { IC_MATERIAL, SANDESH_LOGO_IMG } from 'assets'
import type { MD3Theme } from 'react-native-paper';
import { Size } from 'functions'

const HomeTabController = ({ navigation }: any) => {

    const { getHomeSecondaryDataAPI, getHomeTopMenuAPI } = useAPIs();
    const { appServices } = useZuStore();
    const { defStyOBJ, top, col } = useThemeX();
    const style = stylesFN(defStyOBJ);

    const [homeTopMenu, setHomeTopMenu] = useState<{ [key: string]: HomeTopMenuItemType }>({});
    const [homeSecondaryData, setHomeSecondaryData] = useState<HomeSecondaryDataType>({});

    const getHomeSecondaryDataFN = () => {

        getHomeTopMenuAPI().then(({ res }) => {
            if (res?.data) {
                setHomeTopMenu(res?.data);
            }
        })
        // getHomeSecondaryDataAPI().then(({ res }) => {
        //     pLOG("getHomeSecondaryDataAPI", res, 'l');
        // }).catch((e) => {
        //     pLOG("getHomeSecondaryDataAPI", e, 'l');
        // })
    }

    useEffect(() => {
        getHomeSecondaryDataFN();
    }, []);

    return (
        <MasterView hShow={false} barStyle='dark-content' sbShow sbColor={col.HOME_TOP_TAB_BG} fixed >
            <Animated.View style={[style.header_mSty]} >
                <ImageX
                    noDefImg img={""}
                    // img={appServices?.appLogo}
                    imgSource={SANDESH_LOGO_IMG}
                    imgSty={style.appLogoImgSty}
                    resizeMode='contain' />
                <View style={{ flexDirection: 'row' }} >
                    <LiveButton />
                    <View style={{ width: 10 }} />
                    <PressableScaleX
                        style={style.notifcation_btn_cSty}  >
                        <IC_MATERIAL
                            name='notifications-active'
                            size={ICON_SIZE} color={col.NOTIFICATION_ICON} />
                    </PressableScaleX>
                </View>
            </Animated.View >
            <TabsProvider defaultIndex={0} >
                <Tabs
                    theme={{
                        colors: { primary: col.HOME_TOP_TAB_SELECTED_ITEM_INDICATORE }
                    } as MD3Theme}
                    mode='scrollable' uppercase
                    showLeadingSpace={false}
                    style={{ backgroundColor: col.TRANSPARENT }}
                    tabHeaderStyle={style.tab_header_mSty}
                    tabLabelStyle={style.tab_header_title} >
                    <TabScreen label="Home" >
                        <HomePage />
                    </TabScreen>
                    {Object.values(homeTopMenu).map((item, idx) => <TabScreen key={idx.toString()} label={item?.name || ""}  >
                        <View style={{ flex: 1 }} />
                    </TabScreen>)}
                </Tabs>
            </TabsProvider>
        </MasterView >
    )
}

export default HomeTabController

const stylesFN = ({ top, col, font }: defStyObjType) => StyleSheet.create({
    header_mSty: {
        height: Size(50),
        paddingHorizontal: bSpace,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 5,
        // paddingVertical: 8,
        backgroundColor: col.HOME_TOP_TAB_BG
    },
    appLogoImgSty: {
        height: "100%",
        width: 140,
        borderRadius: 10,
    },
    live_btn_cSty: {
        height: "100%",
        width: 90,
        overflow: 'hidden',
        borderRadius: 1000,
        borderWidth: 3,
        borderColor: col.PRIMARY
    },
    notifcation_btn_cSty: {
        backgroundColor: col.NOTIFICATION_ICON_BG,
        height: "100%",
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        overflow: 'hidden'
    },
    tab_header_mSty: {
        backgroundColor: col.HOME_TOP_TAB_BG,
        marginLeft: 0,
        marginHorizontal: 0,
        paddingHorizontal: 0,
        paddingLeft: 0
    },
    tab_header_title: {
        color: col.HOME_TOP_TAB_ITEM_TITLE,
        fontFamily: font.BOLD,
    }
})


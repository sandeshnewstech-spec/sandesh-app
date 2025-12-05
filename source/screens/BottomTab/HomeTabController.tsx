import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { HomeTopMenu, ImageX, MasterView } from 'components'
import useZuStore from 'store/useZuStore'
import { _HEIGHT, _WIDTH, bSpace } from 'utils'
import { defStyObjType, HomeSecondaryDataType, HomeTopMenuItemType } from 'types'
import { useAPIs, useDebounce, useThemeX } from 'hooks'
import { FlatList, Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useSharedValue } from 'react-native-reanimated'
import PagerView from 'react-native-pager-view'
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs'
import { SANDESH_LOGO_IMG } from 'assets'
import type { MD3Theme } from 'react-native-paper';

const HomeTabController = () => {

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
        <MasterView backBtn={false} hShow={false} sbShow={false} >
            <Animated.View style={[style.appLogoImgCSty, {}]} >
                <ImageX
                    img={""}
                    // img={appServices?.appLogo}
                    imgSource={SANDESH_LOGO_IMG}
                    imgSty={style.appLogoImgSty}
                    noDefImg
                    resizeMode='contain' />
            </Animated.View>
            <TabsProvider defaultIndex={0} >
                <Tabs mode='scrollable'
                    dark={true}
                    uppercase
                    theme={{
                        colors: { primary: col.HOME_TOP_TAB_SELECTED_ITEM_INDICATORE }
                    } as MD3Theme}
                    style={{ flex: 1, backgroundColor: col.TRANSPARENT }}
                    showLeadingSpace={false}
                    tabHeaderStyle={style.tab_header_mSty}
                    tabLabelStyle={style.tab_header_title} >
                    <TabScreen label="Home" >
                        <View style={{ flex: 1 }} />
                    </TabScreen>
                    {Object.values(homeTopMenu).map((item, idx) => <TabScreen key={idx.toString()} label={"😍 " + item?.name || ""}  >
                        <View style={{ flex: 1 }} />
                    </TabScreen>)}
                </Tabs>
            </TabsProvider>
        </MasterView>
    )
}

export default HomeTabController

const stylesFN = ({ top, col, font }: defStyObjType) => StyleSheet.create({
    appLogoImgCSty: {
        marginTop: top,
        paddingHorizontal: bSpace
    },
    appLogoImgSty: {
        height: 80,
        width: 140,
        borderRadius: 20,
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


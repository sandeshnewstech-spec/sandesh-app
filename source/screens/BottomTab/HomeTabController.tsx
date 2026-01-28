import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DynamicHomeTabPages, HomePage, ImageX, LiveButton, MasterView, PressableScaleX } from 'components'
import useZuStore from 'store/useZuStore'
import { _HEIGHT, _WIDTH, bSpace, ICON_SIZE, MaterialTopTabStack } from 'utils'
import { defStyObjType, HomeSecondaryDataType, HomeTopMenuItemType } from 'types'
import { useAPIs, useThemeX } from 'hooks'
import Animated from 'react-native-reanimated'
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs'
import { IC_MATERIAL, SANDESH_LOGO_IMG } from 'assets'
import { pLOG, Size } from 'functions'

const HomeTabController = ({ navigation }: any) => {

    const { getHomeSecondaryDataAPI, getHomeTopMenuAPI } = useAPIs();
    const { appServices, setHomeSecondaryData, homeTopMenu, setHomeTopMenu } = useZuStore();
    const { defStyOBJ, top, col, font } = useThemeX();
    const style = stylesFN(defStyOBJ);

    const getHomeSecondaryDataFN = () => {

        getHomeTopMenuAPI().then(({ res }) => {
            if (res?.data) {
                setHomeTopMenu(res?.data);
                pLOG("HomeTopMenuAPI res:", [res?.data]);
            }
        })
    }

    useEffect(() => {
        getHomeSecondaryDataFN();
    }, []);

    pLOG("homeTopMenu:", [homeTopMenu]);

    return (
        <MasterView hShow={false} barStyle='dark-content'
            sbShow sbColor={col.HOME_TOP_TAB_BG} fixed >
            {/* <Animated.View style={[style.header_mSty]} >
                <ImageX
                    noDefImg img={""}
                    // img={appServices?.appLogo}
                    imgSource={SANDESH_LOGO_IMG}
                    imgSty={style.appLogoImgSty}
                    resizeMode='contain' />
                <View style={{ flexDirection: 'row' }} >
                    <LiveButton />
                    <View style={{ width: 10 }} />
                    <PressableScaleX style={style.notifcation_btn_cSty}>
                        <IC_MATERIAL
                            name='notifications-active'
                            size={ICON_SIZE} color={col.NOTIFICATION_ICON} />
                    </PressableScaleX>
                </View>
            </Animated.View > */}
            <TabsProvider defaultIndex={0} >
                <Tabs
                    theme={{
                        colors: { primary: col.HOME_TOP_TAB_SELECTED_ITEM_INDICATORE },
                    } as MD3Theme}
                    mode='scrollable' uppercase
                    showLeadingSpace={false}
                    style={{ backgroundColor: col.TRANSPARENT }}
                    tabHeaderStyle={style.tab_header_mSty}
                    tabLabelStyle={style.tab_header_title} >
                    <TabScreen label="Home" >
                        <HomePage />
                    </TabScreen>
                    <TabScreen label="Dynamic" >
                        <DynamicHomeTabPages
                            {...Object.values(homeTopMenu)[1]} />
                    </TabScreen>

                    {/* {Object.values(homeTopMenu).map((item, idx) => <TabScreen key={idx.toString()} label={item?.name || ""}  >
                        <DynamicHomeTabPages
                            // ParamList={ParamList}
                            // RouteName={RouteName}
                            {...item} />
                    </TabScreen>)} */}
                    {/* <TabScreen label={"Business"}  >
                        <DynamicHomeTabPages category='Business' />
                    </TabScreen> */}
                </Tabs>
            </TabsProvider >



            {/* <MaterialTopTabStack.Navigator
                overScrollMode={'never'}
                style={{}}
                screenOptions={{
                    sceneStyle: { backgroundColor: col.TRANSPARENT },
                    tabBarStyle: {
                        backgroundColor: col.HOME_TOP_TAB_BG,
                        shadowColor: col.TRANSPARENT
                    },
                    tabBarItemStyle: {
                        width: "auto",
                    },
                    tabBarLabelStyle: {
                        color: col.HOME_TOP_TAB_ITEM_TITLE,
                        fontFamily: font.BOLD,
                        // width: "auto",
                    },
                    tabBarScrollEnabled: true,
                    tabBarIndicatorStyle: {
                        height: Size(2), borderRadius: 100,
                        backgroundColor: col.HOME_TOP_TAB_SELECTED_ITEM_INDICATORE,
                    },
                    // tabBarContentContainerStyle: { backgroundColor: col.HOME_TOP_TAB_BG },
                    // tabBarIndicatorContainerStyle: { backgroundColor: 'green', },
                }}>
                <MaterialTopTabStack.Screen key={String("-1")} name="Home" component={HomePage} />
                    {Object.values(homeTopMenu).length > 0 && Object.values(homeTopMenu).map((item, idx) => {
                        return <MaterialTopTabStack.Screen key={idx.toString()}
                            name={item?.name || ""}
                            component={(ParamList, RouteName) => <DynamicHomeTabPages
                                ParamList={ParamList}
                                RouteName={RouteName}
                                {...item} />}
                        />
                    })}
                </MaterialTopTabStack.Navigator> */}

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
    },
    tab_header_title: {
        color: col.HOME_TOP_TAB_ITEM_TITLE,
        fontFamily: font.BOLD,
    }
})





// <MaterialTopTabStack.Navigator
//                 overScrollMode={'never'}
//                 style={{}}
//                 screenOptions={{
//                     sceneStyle: { backgroundColor: col.TRANSPARENT },
//                     tabBarStyle: {
//                         backgroundColor: col.HOME_TOP_TAB_BG,
//                         shadowColor: col.TRANSPARENT
//                     },
//                     tabBarItemStyle: {
//                         width: "auto",
//                     },
//                     tabBarLabelStyle: {
//                         color: col.HOME_TOP_TAB_ITEM_TITLE,
//                         fontFamily: font.BOLD,
//                         // width: "auto",
//                     },
//                     tabBarScrollEnabled: true,
//                     tabBarIndicatorStyle: {
//                         height: Size(2), borderRadius: 100,
//                         backgroundColor: col.HOME_TOP_TAB_SELECTED_ITEM_INDICATORE,
//                     },
//                     // tabBarContentContainerStyle: { backgroundColor: col.HOME_TOP_TAB_BG },
//                     // tabBarIndicatorContainerStyle: { backgroundColor: 'green', },
//                 }}>
//                 <MaterialTopTabStack.Screen key={String("-1")} name="Home" component={HomePage} />
//                 <MaterialTopTabStack.Screen
//                     name={"Business"}
//                     component={(ParamList, RouteName) => <DynamicHomeTabPages
//                         ParamList={ParamList}
//                         RouteName={RouteName}
//                         category={"Business"}
//                     // {...Object.values(homeTopMenu)[0]}
//                     />}
//                 />
//                 {/* {Object.values(homeTopMenu).length > 0 && Object.values(homeTopMenu).map((item, idx) => {
//                     return <MaterialTopTabStack.Screen key={idx.toString()}
//                         name={item?.name || ""}
//                         component={(ParamList, RouteName) => <DynamicHomeTabPages
//                             key={idx.toString()}
//                             ParamList={ParamList}
//                             RouteName={RouteName}
//                             {...item} />}
//                     />
//                 })} */}
//             </MaterialTopTabStack.Navigator>
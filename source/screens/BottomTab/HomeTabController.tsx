import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native'
import React, { act, useCallback, useEffect, useRef, useState } from 'react'
import { HomeTopMenu, ImageX, MasterView } from 'components'
import useZuStore from 'store/useZuStore'
import { _WIDTH, bSpace } from 'utils'
import { defStyObjType, HomeSecondaryDataType, HomeTopMenuItemType } from 'types'
import { useAPIs, useDebounce, useThemeX } from 'hooks'
import { FlatList } from 'react-native-gesture-handler'
import { pLOG } from 'functions'

const HomeTabController = () => {

    const { getHomeSecondaryDataAPI, getHomeTopMenuAPI } = useAPIs();
    const { appServices } = useZuStore();
    const { defStyOBJ } = useThemeX();
    const style = stylesFN(defStyOBJ);

    const [homeTopMenu, setHomeTopMenu] = useState<{ [key: string]: HomeTopMenuItemType }>({});
    const [homeSecondaryData, setHomeSecondaryData] = useState<HomeSecondaryDataType>({});
    const [activePage, setActivePage] = useState<number>(0);
    const activePageDebounce = useDebounce(activePage, 80);

    const flatListRef = useRef<FlatList>(null);

    const onScrolling = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        setActivePage(roundIndex);
    }, [activePage]);

    const onTapScroll = (index: number) => {
        flatListRef.current?.scrollToIndex({ animated: true, index: index });
    }

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

    pLOG("activePage", activePage)

    return (
        <MasterView hShow={false} sbShow={false} fixed >
            <View style={style.appLogoImgCSty} >
                <ImageX
                    img={appServices?.appLogo}
                    imgSty={style.appLogoImgSty}
                    resizeMode='contain' />
            </View>
            <HomeTopMenu data={homeTopMenu} onPress={onTapScroll} activeScrPage={activePage} />
            <View style={{ flex: 1 }} >
                <FlatList
                    ref={flatListRef}
                    horizontal pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScrolling}
                    data={Object.values(homeTopMenu)}
                    renderItem={() => <View
                        style={{
                            marginHorizontal: bSpace,
                            backgroundColor: 'red',
                            flex: 1,
                            width: _WIDTH - (bSpace * 2),
                        }} >
                    </View>}
                />
            </View>
        </MasterView>)
}

export default HomeTabController

const stylesFN = ({ top }: defStyObjType) => StyleSheet.create({
    appLogoImgCSty: {
        marginTop: top,
        paddingHorizontal: bSpace
    },
    appLogoImgSty: {
        height: 80,
        width: 140,
        backgroundColor: 'red',
        borderRadius: 20,
    }
})
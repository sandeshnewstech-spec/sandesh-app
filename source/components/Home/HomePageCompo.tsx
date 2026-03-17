import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { defStyObjType, NewsItemType } from 'types'
import { useAPIs, useModifyData, useThemeX } from 'hooks'
import useZuStore from 'store/useZuStore'
import { ContentListCoverWithTitle, HomeImageCouresole, HomeWebStoriesList, NewsItem } from 'components'
import { _WIDTH, bSpace } from 'utils'
import { useNavigation } from '@react-navigation/native'

const HomePageCompo = () => {
    const { defStyOBJ } = useThemeX();
    const navigation: any = useNavigation();
    const style = styleFN(defStyOBJ);
    const { appServices, homeWebStory, homeSecondaryData, setHomeSecondaryData } = useZuStore();
    const { getHomeSecondaryDataAPI, getHomeTopMenuAPI } = useAPIs();
    const {
        GujaratmetroData, MostviewsData, MostshareData, GujaratData, VideosData, NationalData, ElectionData, GameData,
        TrendingData, WorldData, GalleryData, SpottedgalleryData, EntertainmentData, LifestyleData, TravelData,
        RelationshipData, FoodData, SportnewsData, AstrologyData, SupplementData, BusinessData, TechnologyData,
        ColumnistData, GaneshData, GaneshEnabledData, HomeTopNewsData
    } = useModifyData({});

    const getHomeSecondaryDataFN = () => {
        getHomeSecondaryDataAPI().then(({ res }) => {
            if (res?.data) {
                setHomeSecondaryData(res?.data);
            }
        }).catch((e) => {
        })
    }

    const newsRenderItem = useCallback((item: NewsItemType, index: number) => (<NewsItem {...item} />), [homeSecondaryData]);

    useEffect(() => {
        getHomeSecondaryDataFN();
    }, []);

    return (<View style={style.mainSty} >
        <ScrollView
            stickyHeaderIndices={[0]}
            renderToHardwareTextureAndroid
            contentContainerStyle={{ width: "100%" }}
            stickyHeaderHiddenOnScroll>
            <View key={"HomeWebStoriesList"}>
                <HomeWebStoriesList />
            </View>
            <HomeImageCouresole
                data={HomeTopNewsData}
                onCategoryPress={(item) => {
                    navigation?.navigate("CategoryItemsListingScreen", { categoryName: item?.category });
                }} />
            {EntertainmentData?.length > 0 && <ContentListCoverWithTitle
                title='Entertainment' style={{ marginHorizontal: bSpace / 2 }}
                readMore={() => {
                    navigation?.navigate("CategoryItemsListingScreen", { categoryName: "Entertainment" })
                }}>
                {(EntertainmentData)?.map(newsRenderItem)}
            </ContentListCoverWithTitle>}
            {TrendingData?.length > 0 && <ContentListCoverWithTitle
                title='Trending' style={{ marginHorizontal: bSpace / 2 }}
                readMore={() => {
                    navigation?.navigate("CategoryItemsListingScreen",
                        { categoryName: "Trending", categoryId: "trending" })
                }}>
                {TrendingData?.map(newsRenderItem)}
            </ContentListCoverWithTitle>}

            {NationalData?.length > 0 && <ContentListCoverWithTitle
                title='National' style={{ marginHorizontal: bSpace / 2 }}>
                {NationalData?.map(newsRenderItem)}
            </ContentListCoverWithTitle>}
            {EntertainmentData?.length > 0 && <ContentListCoverWithTitle
                title='Entertainment' style={{ marginHorizontal: bSpace / 2 }}>
                {EntertainmentData?.map(newsRenderItem)}
            </ContentListCoverWithTitle>}
            {WorldData?.length > 0 && <ContentListCoverWithTitle
                title='World' style={{ marginHorizontal: bSpace / 2 }}>
                {WorldData?.map(newsRenderItem)}
            </ContentListCoverWithTitle>}
            {BusinessData?.length > 0 && <ContentListCoverWithTitle
                title='Business' style={{ marginHorizontal: bSpace / 2 }}>
                {BusinessData?.map(newsRenderItem)}
            </ContentListCoverWithTitle>}
            {AstrologyData?.length > 0 && <ContentListCoverWithTitle
                title='Astrology' style={{ marginHorizontal: bSpace / 2 }}>
                {AstrologyData?.map(newsRenderItem)}
            </ContentListCoverWithTitle>}
            {SportnewsData?.length > 0 && <ContentListCoverWithTitle
                title='Sportnews' style={{ marginHorizontal: bSpace / 2 }}>
                {SportnewsData?.map(newsRenderItem)}
            </ContentListCoverWithTitle>}
            {TechnologyData?.length > 0 && <ContentListCoverWithTitle
                title='Technology' style={{ marginHorizontal: bSpace / 2 }}>
                {TechnologyData?.map(newsRenderItem)}
            </ContentListCoverWithTitle>}
            {LifestyleData?.length > 0 && <ContentListCoverWithTitle
                title='Lifestyle' style={{ marginHorizontal: bSpace / 2 }}>
                {LifestyleData?.map(newsRenderItem)}
            </ContentListCoverWithTitle>}
            {/* {SupplementData?.length > 0 && <ContentListCoverWithTitle
                title='Supplement' style={{ marginHorizontal: bSpace / 2 }}>
                {SupplementData?.map(newsRenderItem)}
            </ContentListCoverWithTitle>} */}
        </ScrollView>
    </View>)
}

export default HomePageCompo

const styleFN = ({ col, font }: defStyObjType) => StyleSheet.create({

    mainSty: {
        flex: 1
    }

});
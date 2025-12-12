import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defStyObjType } from 'types'
import { useAPIs, useGetPosts, useThemeX } from 'hooks'
import HomeWebStoriesItem from './HomeWebStoriesItemCompo'
import { FlashList } from '@shopify/flash-list'
import { _HEIGHT, _WIDTH, bSpace } from 'utils'
import { makeOBJFN, pLOG, updateOBJFN } from 'functions'
import useZuStore from 'store/useZuStore'

const HomePageCompo = () => {
    const { defStyOBJ } = useThemeX();
    const style = styleFN(defStyOBJ);
    const { appServices, webStory, setWebStory } = useZuStore();
    const { getHomePageWebStoryAPI } = useAPIs();

    const [webStoriesIDs, setWebStoriesIDs] = useState<Array<string>>([]);
    const { webStoryData } = useGetPosts({ _webStoryIDs: webStoriesIDs });

    pLOG("webStory", webStory);
    pLOG("appServices", appServices);
    pLOG("webStoryData", { webStoryData });
    pLOG("webStoriesIDs", { webStoriesIDs });

    const getHomePageWebStoriesFN = () => {
        getHomePageWebStoryAPI().then(({ res }) => {
            if (res?.data?.length) {
                const temp = makeOBJFN(res?.data);
                setWebStory(temp?.obj);
                setWebStoriesIDs(temp?.IDs);
                pLOG("getHomePageWebStoryAPI", temp)
            }
        })
    }

    useEffect(() => {
        getHomePageWebStoriesFN();
    }, []);

    return (<View style={style.mainSty} >
        <ScrollView
            stickyHeaderIndices={[0]}
            stickyHeaderHiddenOnScroll>
            <View style={{}}>
                <FlashList
                    horizontal
                    contentContainerStyle={{ paddingLeft: bSpace / 2, paddingVertical: bSpace / 2 }}
                    showsHorizontalScrollIndicator={false}
                    data={webStoryData}
                    renderItem={({ item }) => <HomeWebStoriesItem {...item} />}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    removeClippedSubviews
                />
            </View>
        </ScrollView>
    </View>)
}

export default HomePageCompo

const styleFN = ({ col, font }: defStyObjType) => StyleSheet.create({

    mainSty: {
        flex: 1
    }

});
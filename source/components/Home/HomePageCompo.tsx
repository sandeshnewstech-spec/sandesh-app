import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defStyObjType } from 'types'
import { useAPIs, useGetPosts, useThemeX } from 'hooks'
import { pLOG, Size } from 'functions'
import useZuStore from 'store/useZuStore'
import { HomeWebStoriesList } from 'components'

const HomePageCompo = () => {
    const { defStyOBJ } = useThemeX();
    const style = styleFN(defStyOBJ);
    const { appServices, homeWebStory, setHomeWebStory } = useZuStore();

    const [webStoriesIDs, setWebStoriesIDs] = useState<Array<string>>([]);
    const { webStoryData } = useGetPosts({ _webStoryIDs: webStoriesIDs });

    pLOG("homeWebStory", homeWebStory);
    pLOG("appServices", appServices);
    pLOG("webStoryData", { webStoryData });
    pLOG("webStoriesIDs", { webStoriesIDs });

    useEffect(() => {

    }, []);

    return (<View style={style.mainSty} >
        <ScrollView
            stickyHeaderIndices={[0]}
            renderToHardwareTextureAndroid
            stickyHeaderHiddenOnScroll
        >
            <View key={"HomeWebStoriesList"}>
                <HomeWebStoriesList />
            </View>
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((item, idx) => <View key={idx.toString()} style={{ width: "100%", height: Size(200), backgroundColor: 'red', marginVertical: 10 }} />)}
        </ScrollView>
    </View>)
}

export default HomePageCompo

const styleFN = ({ col, font }: defStyObjType) => StyleSheet.create({

    mainSty: {
        flex: 1
    }

});
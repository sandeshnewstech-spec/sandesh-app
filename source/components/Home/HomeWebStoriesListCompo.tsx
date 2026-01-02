import { FlashList } from "@shopify/flash-list"
import { useAPIs, useGetPosts, useThemeX } from "hooks";
import { useEffect, useState } from "react";
import { _HEIGHT, bSpace, ICON_SIZE } from "utils"
import HomeWebStoriesItemCompo from "./HomeWebStoriesItemCompo";
import { makeOBJFN, Size } from "functions";
import useZuStore from "store/useZuStore";
import { StyleSheet, View } from "react-native";
import Loaders from "components/XCompos/Loaders";
import TextXCompo from "components/XCompos/TextXCompo";
import { defStyObjType } from "types";
import { IC_MATERIAL_COMMUNITY } from "assets";
import { PressableScaleX } from "components";
import { useNavigation } from "@react-navigation/native";

type P = {
    showViewAll?: boolean;
}

const HomeWebStoriesListCompo = ({ showViewAll = true }: P) => {
    const navigation: any = useNavigation();
    const { getHomePageWebStoryAPI } = useAPIs();
    const { appServices, homeWebStory, setHomeWebStory } = useZuStore();
    const { col, defStyOBJ } = useThemeX();
    const style = stylesFN(defStyOBJ);
    const [webStoriesIDs, setWebStoriesIDs] = useState<Array<string>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { webStoryData } = useGetPosts({ _webStoryIDs: webStoriesIDs });

    const data = webStoryData;

    const getHomePageWebStoriesFN = () => {
        setIsLoading(true);
        getHomePageWebStoryAPI().then(({ res }) => {
            if (res?.data?.length) {
                const temp = makeOBJFN(res?.data);
                setHomeWebStory(temp?.obj);
                setWebStoriesIDs(temp?.IDs);
            }
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getHomePageWebStoriesFN();
    }, []);

    return (
        <FlashList
            horizontal
            data={data}
            contentContainerStyle={{
                paddingLeft: bSpace / 2,
                paddingVertical: bSpace / 2,
                backgroundColor: col.HOME_TOP_TAB_BG
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <HomeWebStoriesItemCompo {...item} />}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            snapToInterval={Size(50)}
            scrollEventThrottle={16}
            removeClippedSubviews
            ListHeaderComponent={isLoading ? <View style={{ height: _HEIGHT * .10, aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Loaders type="samsung" size={Size(45)} color={col.PRIMARY} secondaryColor={col.WHITE} />
            </View> : null}
            ListFooterComponent={(showViewAll && data?.length > 0) ? <PressableScaleX
                onPress={() => navigation.navigate("WebStoriesListScreen")}
                style={style.viewAll_cSty}>
                <TextXCompo text={"View All"} tSty={style.viewAll_tSty} />
                <IC_MATERIAL_COMMUNITY name="arrow-right" size={ICON_SIZE * .8} color={col.HOME_TOP_TAB_ITEM_TITLE} />
            </PressableScaleX> : null}
        />
    )
}
export default HomeWebStoriesListCompo

const stylesFN = ({ col, font }: defStyObjType) => StyleSheet.create({
    viewAll_cSty: {
        height: _HEIGHT * .10,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Size(4),
        paddingRight: bSpace / 2,
    },
    viewAll_tSty: {
        color: col.HOME_TOP_TAB_ITEM_TITLE,
        fontSize: Size(14),
        fontFamily: font.BOLD
    }
})
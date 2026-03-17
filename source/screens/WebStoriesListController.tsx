import { FlashList } from "@shopify/flash-list";
import { IC_MATERIAL_COMMUNITY } from "assets";
import { HomeWebStoriesList, ImageX, MasterView, PressableScaleX, TextX } from "components"
import Loaders from "components/XCompos/Loaders";
import { makeOBJFN, pLOG, Size } from "functions";
import { useAPIs, useModifyData, useThemeX } from "hooks"
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import useZuStore from "store/useZuStore"
import { apiFuntionType, defStyObjType, LatestWebstoriesCategoryItemType, WebStoryItemType } from "types";
import { _HEIGHT, bSpace, ICON_SIZE } from "utils";

const WebStoriesListController = ({ navigation }: any) => {
    const { col, font, str, defStyOBJ } = useThemeX();
    const { getLatestWebStoriesAPI } = useAPIs();
    const { setWebstoriesMenus, setLatestWebstories, appServices, latestWebStoryMenu } = useZuStore();
    const style = styleFN(defStyOBJ);

    const [isTopLoding, setIsTopLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isBottomLoading, setIsBottomLoading] = useState<boolean>(false);
    const [latestWebstoryIDs, setLatestWebstoryIDs] = useState<string[]>([]);
    const [selectedMenuItem, setSelectedMenuItem] = useState<LatestWebstoriesCategoryItemType>({ id: "all", name: "all" });
    const { latestWebStoryData } = useModifyData({ _webStoryIDs: latestWebstoryIDs });

    const PER_PAGE_ITEM = 50;
    const PAGE_NO = 1;
    const startNoRef = useRef<number>(1);
    const limitRef = useRef<number>(PER_PAGE_ITEM);
    const isAPICallRef = useRef<boolean>(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const isNextPageRef = useRef<boolean>(true);

    const getLatestWebStoriesFN = async ({ category_name, _isBottomLoading, _isLoading, _isTopLoading }: { category_name?: string } & apiFuntionType) => {
        if (isAPICallRef?.current || !isNextPageRef.current || isLoading || isTopLoding || isBottomLoading) { return; }
        if (_isLoading) { setIsLoading(true); }
        if (_isTopLoading) { setIsTopLoading(true); }
        if (_isBottomLoading) { setIsBottomLoading(true); }
        isAPICallRef.current = true;
        getLatestWebStoriesAPI({
            limit: limitRef?.current, start: startNoRef?.current,
            category_name: (category_name == "all" || category_name == "All") ? undefined : category_name
        }).then(({ res }) => {
            if (Array.isArray(res?.data) && res?.data?.length > 0) {
                const checkLength = latestWebStoryData.length + res?.data.length;
                if (res?.total >= checkLength) { isNextPageRef.current == false }
                const temp = makeOBJFN(res?.data);
                setLatestWebstories(temp?.obj);
                if (_isBottomLoading) {
                    setLatestWebstoryIDs(prev => ([...prev, ...temp?.IDs]));
                } else {
                    setLatestWebstoryIDs(temp?.IDs);
                }
                startNoRef.current = PAGE_NO + startNoRef.current;
            }
            if (Array.isArray(res?.category) && res?.category?.length > 0) {
                setWebstoriesMenus(res?.category);
            }
            isAPICallRef.current = false;
            setIsLoading(false); setIsTopLoading(false); setIsBottomLoading(false);
        }).catch((e) => {
            isAPICallRef.current = false;
            setIsLoading(false); setIsTopLoading(false); setIsBottomLoading(false);
        })
    }

    const renderItem = useCallback(({ item, index }: { item: WebStoryItemType; index: number }) => {
        pLOG("renderItem::", (appServices?.baseURL || "") + item?.main_image);
        return (<PressableScaleX onPress={() => navigation.navigate("WebStoryViewScreen", { item })} >
            <View style={style.main} >
                <ImageX
                    img={(appServices?.baseURL || "") + item?.main_image}
                    style={{ flex: 1 }}
                />
                <View style={style.abCover} >
                    <TextX text={item?.title} lines={3} tSty={style.title} />
                    {(item?.views && item?.views > 0) && <View style={style.right_arrow} >
                        <IC_MATERIAL_COMMUNITY name="eye" color={col.WHITE} size={ICON_SIZE * .8} />
                        <TextX text={item?.views} tSty={style.views_title} />
                    </View>}
                </View>
            </View>
        </PressableScaleX >)
    }, [latestWebStoryData]);

    const Header = useCallback(() => (<>
        <ScrollView
            ref={scrollViewRef} horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={style.menu_scroll_container} >
            {[{ id: "all", name: "ALL" }, ...latestWebStoryMenu].map((item, index) => {
                const isSelected = selectedMenuItem?.id == item?.id;
                return <PressableScaleX
                    key={index.toString()} disabled={isLoading || isSelected}
                    onPress={() => {
                        startNoRef.current = PAGE_NO;
                        isNextPageRef.current = true;
                        setSelectedMenuItem(item);
                        getLatestWebStoriesFN({ _isLoading: true, category_name: item?.id === "all" ? undefined : item?.name, });
                    }} >
                    <View style={[style.menu_item_cover, isSelected && style.selectedMenuItem]} >
                        <TextX text={item?.name} tSty={isSelected ? style.selected_menu_title : style.menu_title} />
                        {(isSelected && isLoading) && <View style={{ paddingLeft: 3 }} ><Loaders type="samsung" size={30} color={col.SELECTED_LATEST_WEBSTORY_MENU_ITEM_TITLE} /></View>}
                    </View>
                </PressableScaleX>
            })}
        </ScrollView>
    </>), [selectedMenuItem, latestWebStoryMenu, isLoading, scrollViewRef.current]);

    useEffect(() => {
        getLatestWebStoriesFN({ _isLoading: true });
    }, []);

    return (<MasterView title="Web Stories" fixed >
        <FlashList
            numColumns={2}
            data={latestWebStoryData}
            ListHeaderComponent={<><HomeWebStoriesList showViewAll={false} /><Header /></>}
            contentContainerStyle={style.container}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            ListFooterComponent={<View>
                <Loaders type="samsung" color={col.PRIMARY} loading={isBottomLoading} />
            </View>}
            onEndReachedThreshold={.8}
            onEndReached={() => {
                if (latestWebStoryData.length >= PER_PAGE_ITEM) {
                    getLatestWebStoriesFN({ _isBottomLoading: true, category_name: selectedMenuItem?.id === "all" ? undefined : selectedMenuItem?.name });
                }
            }}
        />
    </MasterView>);
}

export default WebStoriesListController

const styleFN = ({ col, font, bottom }: defStyObjType) => StyleSheet.create({

    container: {
        paddingTop: bSpace / 2,
        paddingBottom: bottom + bSpace,
    },
    main: {
        height: _HEIGHT * .27,
        flex: 1,
        borderRadius: 13,
        overflow: 'hidden',
        margin: bSpace / 2
    },
    abCover: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: col.BLACK05,
        borderRadius: 40,
        margin: 3,
        padding: bSpace,
    },
    title: {
        fontFamily: font.BOLD,
        fontSize: Size(20),
        color: col.WHITE,
        lineHeight: Size(30)
    },
    right_arrow: {
        paddingTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    views_title: {
        fontFamily: font.SEMI_BOLD,
        color: col.WHITE,
        fontSize: Size(15),
        paddingHorizontal: 6
    },
    menu_title: {
        fontFamily: font.REGULAR,
        color: col.LATEST_WEBSTORY_MENU_ITEM_TITLE,
        fontSize: Size(20),
    },
    selected_menu_title: {
        fontFamily: font.SEMI_BOLD,
        color: col.SELECTED_LATEST_WEBSTORY_MENU_ITEM_TITLE,
        fontSize: Size(20),
    },
    menu_scroll_container: {
        paddingLeft: bSpace,
        paddingVertical: bSpace / 2
    },
    menu_item_cover: {
        paddingHorizontal: 25,
        height: Size(47),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: .6,
        marginRight: bSpace,
        borderColor: col.LATEST_WEBSTORY_MENU_ITEM_OUTLINE,
        borderRadius: 100,
        backgroundColor: col.LATEST_WEBSTORY_MENU_ITEM_BG
    },
    selectedMenuItem: {
        backgroundColor: col.SELECTED_LATEST_WEBSTORY_MENU_ITEM_BG,
        borderRadius: 200,
        borderWidth: undefined
    }
})
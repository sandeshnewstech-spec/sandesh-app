import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { apiFuntionType, defStyObjType, HomeTopMenuItemType, NewsItemType } from 'types'
import { useAPIs, useModifyData, useThemeX } from 'hooks';
import { makeOBJFN, pLOG } from 'functions';
import useZuStore from 'store/useZuStore';
import { ButtonX, ContentListCoverWithTitle, HomeWebStoriesList } from 'components';
import { bSpace } from 'utils';
import { FlashList } from '@shopify/flash-list';
import NewsItemCompo from 'components/NewsItemCompo';
import Loaders from 'components/XCompos/Loaders';
import { ParamListBase, ParamListRoute, useIsFocused, useNavigationBuilder } from '@react-navigation/native';

type P = {
    ParamList?: ParamListBase;
    RouteName?: ParamListRoute<any>;
} & HomeTopMenuItemType;

const DynamicHomeTabPagesCompo = ({ category, name, title, open, submenu, url, ParamList, RouteName }: P) => {

    const isFocused = Boolean(category === RouteName?.name);

    const { getCategoryListAPI } = useAPIs();
    const { setNewsItems, newsItems } = useZuStore();
    const { defStyOBJ, col } = useThemeX();
    const style = stylesFN(defStyOBJ);

    const [isTopLoding, setIsTopLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isBottomLoading, setIsBottomLoading] = useState<boolean>(false);
    const [categoryItemsIDs, setCategoryItemsIDs] = useState<Array<string>>([]);
    const [cateListData, setCateListData] = useState<Array<NewsItemType>>([]);
    const [check, setCheck] = useState<boolean>(false);
    // const { homeTopTabCategoryNews, } = useModifyData({ _categoryNewsItmeIDs: categoryItemsIDs });

    pLOG("categoryItemsIDs:", [categoryItemsIDs]);
    pLOG("newsItems:", [newsItems]);
    pLOG("homeTopTabCategoryNews:", [cateListData]);

    const PER_PAGE_ITEM = 50;
    const PAGE_NO = 1;
    const startNoRef = useRef<number>(1);
    const limitRef = useRef<number>(PER_PAGE_ITEM);
    const isAPICallRef = useRef<boolean>(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const isNextPageRef = useRef<boolean>(true);

    const getCategoryListFNN = async ({ _isBottomLoading, _isLoading, _isTopLoading }: apiFuntionType) => {
        if (isAPICallRef?.current || !isNextPageRef.current || isLoading || isTopLoding || isBottomLoading) { return; }
        if (_isLoading) { setIsLoading(true); }
        if (_isTopLoading) { setIsTopLoading(true); }
        if (_isBottomLoading) { setIsBottomLoading(true); }
        isAPICallRef.current = true;

        getCategoryListAPI({
            limit: limitRef?.current, start: startNoRef?.current, category_name: category,
        }).then(({ res }) => {
            if (Array.isArray(res?.data?.posts) && res?.data?.posts?.length > 0) {
                const checkLength = cateListData.length + res?.data?.posts?.length;
                if (res?.total >= checkLength) { isNextPageRef.current == false }
                const temp = makeOBJFN(res?.data?.posts);
                setNewsItems(temp?.obj);
                if (!!_isBottomLoading) {
                    setCateListData(prev => [...prev, ...res?.data?.posts]);
                    setCategoryItemsIDs(prev => ([...prev, ...temp?.IDs]));
                } else {
                    console.log("CategoryItemsIDs::", categoryItemsIDs);
                    setCateListData(res?.data?.posts);
                    setCategoryItemsIDs([...temp?.IDs]);
                }
                startNoRef.current = PAGE_NO + startNoRef.current;
            }
            isAPICallRef.current = false;
            setIsLoading(false); setIsTopLoading(false); setIsBottomLoading(false);
        }).catch((e) => {
            isAPICallRef.current = false;
            setIsLoading(false); setIsTopLoading(false); setIsBottomLoading(false);
        })
    }

    const renderItem = useCallback(({ item }: { item: NewsItemType, index: number }) => (<NewsItemCompo
        {...item}
    />), []);

    useEffect(() => {
        getCategoryListFNN({ _isLoading: true })
    }, []);

    pLOG("cateListData", [cateListData]);
    return (<View>
        {/* <ContentListCoverWithTitle style={{ marginHorizontal: bSpace / 2 }} > */}
        <FlashList
            data={cateListData}
            // ListHeaderComponent={<><HomeWebStoriesList showViewAll={false} /><Header /></>}
            contentContainerStyle={style.container}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            ListFooterComponent={<View>
                <Loaders type="samsung" color={col.PRIMARY} loading={isBottomLoading} />
            </View>}
            onEndReachedThreshold={.8}
            onEndReached={() => {
                // if (homeTopTabCategoryNews.length >= PER_PAGE_ITEM) {
                //     getCategoryListFNN({ _isBottomLoading: true });
                // }
            }}
        />
        {/* </ContentListCoverWithTitle> */}
    </View>);
}

export default DynamicHomeTabPagesCompo

const stylesFN = ({ col, font, bottom }: defStyObjType) => StyleSheet.create({
    container: {
        paddingTop: bSpace / 2,
        paddingBottom: bottom + bSpace,
    },
})
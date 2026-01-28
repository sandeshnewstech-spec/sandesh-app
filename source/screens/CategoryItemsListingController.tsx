import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { apiFuntionType, defStyObjType, NewsItemType } from 'types';
import { _HEIGHT, bSpace } from 'utils';
import { useAPIs, useModifyData, useThemeX } from 'hooks';
import useZuStore from 'store/useZuStore';
import { makeOBJFN, pLOG } from 'functions';
import { MasterView, ScrollToTop } from 'components';
import Loaders from 'components/XCompos/Loaders';
import NewsItemCompo from 'components/NewsItemCompo';

const CategoryItemsListingController = ({ route, navigation }: any) => {

    const { categoryName, item } = route?.params;

    const { getCategoryListAPI } = useAPIs();
    const { setNewsItems, newsItems } = useZuStore();
    const { defStyOBJ, col, windowDimention } = useThemeX();
    const style = stylesFN(defStyOBJ);

    const [isTopLoding, setIsTopLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isBottomLoading, setIsBottomLoading] = useState<boolean>(false);
    const [categoryItemsIDs, setCategoryItemsIDs] = useState<Array<string>>([]);
    const [cateListData, setCateListData] = useState<Array<NewsItemType>>([]);
    const [isScrollToTop, setIsScrollToTop] = useState<boolean>(false);
    const { homeTopTabCategoryNews, } = useModifyData({ _categoryNewsItmeIDs: categoryItemsIDs });

    const PER_PAGE_ITEM = 50;
    const PAGE_NO = 1;
    const startNoRef = useRef<number>(1);
    const limitRef = useRef<number>(PER_PAGE_ITEM);
    const isAPICallRef = useRef<boolean>(false);
    const flatListRef = useRef<FlatList>(null);
    const isNextPageRef = useRef<boolean>(true);

    const getCategoryListFNN = async ({ _isBottomLoading, _isLoading, _isTopLoading }: apiFuntionType) => {
        if (isAPICallRef?.current || !isNextPageRef.current || isLoading || isTopLoding || isBottomLoading) { return; }
        if (_isLoading) { setIsLoading(true); }
        if (_isTopLoading) { setIsTopLoading(true); }
        if (_isBottomLoading) { setIsBottomLoading(true); }
        isAPICallRef.current = true;

        getCategoryListAPI({
            limit: limitRef?.current, start: startNoRef?.current, category_name: categoryName,
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

    const onScrollFN = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y || 0;
        pLOG("offsetY::", [offsetY, offsetY > windowDimention?.height * .4]);
        if (offsetY > (100)) {
            if (!isScrollToTop) { setIsScrollToTop(true); }
        } else {
            if (isScrollToTop) { setIsScrollToTop(false); }
        }
    }, [isScrollToTop]);

    const renderItem = useCallback(({ item }: { item: NewsItemType, index: number }) => (<NewsItemCompo
        {...item}
    />), []);

    useEffect(() => {
        getCategoryListFNN({ _isLoading: true })
    }, []);
    return (<MasterView fixed title={categoryName}
        modals={<ScrollToTop scrollerRef={flatListRef} isScrollToTop={isScrollToTop} setIsScrollToTop={setIsScrollToTop} />}>
        <FlatList
            ref={flatListRef} style={{ flex: 1 }}
            onScroll={onScrollFN} data={cateListData}
            contentContainerStyle={style.container}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            ListFooterComponent={<View>
                <Loaders type="samsung" color={col.PRIMARY} loading={isBottomLoading} />
            </View>}
            onEndReachedThreshold={.8}
            onEndReached={() => {
                if (cateListData?.length >= PER_PAGE_ITEM) {
                    getCategoryListFNN({ _isBottomLoading: true });
                }
            }}
        />
    </MasterView>);
}

export default CategoryItemsListingController


const stylesFN = ({ col, font, bottom }: defStyObjType) => StyleSheet.create({
    container: {
        paddingTop: bSpace,
        paddingBottom: bottom + bSpace,
    },
    up_cover: {
        position: 'absolute',
        bottom: bottom + bSpace * 2,
        right: bSpace,
        backgroundColor: col.WHITE,
        borderRadius: 50,
        shadowColor: col.SHADOW,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    up_btn: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
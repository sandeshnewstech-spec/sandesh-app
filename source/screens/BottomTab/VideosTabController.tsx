import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MasterView, VideoItem } from 'components'
import { useAPIs, useGetPosts, useThemeX } from 'hooks'
import useZuStore from 'store/useZuStore'
import { makeOBJFN } from 'functions'
import { VideoItemType } from 'types'
import { _HEIGHT, _WIDTH, BOTTOM_TAB_HEIGHT } from 'utils'
import { FlashList } from '@shopify/flash-list'
import { useIsFocused } from '@react-navigation/native'

const VideosTabController = () => {
    const isFocused = useIsFocused();
    const { col, bottom, top } = useThemeX();
    const { getVideosAPI } = useAPIs();
    const { setUpdatePosts } = useZuStore();
    const [postIDs, setPostsIDs] = useState<Array<string>>([]);
    const { postsData } = useGetPosts({ IDs: postIDs });
    const [curentIDx, setCurrentIDx] = useState<number>(0);

    const SCR_HEIGHT = _HEIGHT - (BOTTOM_TAB_HEIGHT + top + bottom);

    const [btmLoading, setBtmLoading] = useState(false);
    const [topLoading, setTopLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const POST_PER_PAGE = 40;
    const isNextPage = useRef<boolean>(false);
    const isAPICalling = useRef<boolean>(false);
    const pageNO = useRef<number>(1);

    const onScrolling = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideSize = event.nativeEvent.layoutMeasurement.height;
        const index = event.nativeEvent.contentOffset.y / slideSize;
        const roundIndex = Math.round(index);
        setCurrentIDx(roundIndex);
    }, [curentIDx]);

    const getVideosFN = ({ _topLoading = false, _btmLoading = false, _isLoading = false }: { _topLoading?: boolean; _btmLoading?: boolean; _isLoading?: boolean }) => {
        if (isLoading || topLoading || isAPICalling.current || btmLoading) return;
        isAPICalling.current = true;
        if (_topLoading) {
            pageNO.current = 1;
            setTopLoading(_topLoading);
        }
        setIsLoading(_isLoading);
        setBtmLoading(_btmLoading);
        getVideosAPI(pageNO.current, POST_PER_PAGE).then(({ res }) => {
            const tempOBJ = makeOBJFN(res?.data?.video);
            if (res?.data?.video && tempOBJ?.IDs.length > 0) {
                if (_topLoading || _isLoading) { setPostsIDs(tempOBJ?.IDs); }
                else { setPostsIDs(prev => ([...prev, ...tempOBJ?.IDs])); }
                setUpdatePosts(tempOBJ?.obj);
                isNextPage.current = true;
                pageNO.current = pageNO.current + 1;
            } else {
                isNextPage.current = false;
            }
            setTopLoading(false);
            setBtmLoading(false);
            setIsLoading(false);
            isAPICalling.current = false;
        }).catch(() => {
            isNextPage.current = false;
            setTopLoading(false);
            setBtmLoading(false);
            setIsLoading(false);
            isAPICalling.current = false;
        })
    }

    const renderItem = useCallback(({ item, index }: { item: VideoItemType, index: number }) => <VideoItem
        {...item} isPlaying={index === curentIDx && isFocused} index={index}
        scr_height={SCR_HEIGHT}
    />, [postIDs, postsData, curentIDx, top, bottom, SCR_HEIGHT, isFocused]);

    useEffect(() => {
        getVideosFN({ _isLoading: true });
    }, []);

    return (
        <MasterView hShow={false}
            barStyle='light-content'
            sbColor={col.BLACK} bgCol={col.BLACK}
            style={{ flex: 1 }} fixed scrLoader={isLoading} >
            <FlashList
                pagingEnabled
                data={postsData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem} onScroll={onScrolling}
                extraData={[curentIDx, top, bottom, SCR_HEIGHT, isFocused]}
                refreshControl={<RefreshControl
                    refreshing={topLoading}
                    onRefresh={() => getVideosFN({ _topLoading: true })}
                    colors={[col.PRIMARY]}
                    tintColor={col.WHITE}
                    progressBackgroundColor={col.WHITE}
                    progressViewOffset={10}
                />}
                onEndReached={() => {
                    if (isNextPage.current) {
                        getVideosFN({ _btmLoading: true });
                    }
                }}
                getItemType={() => SCR_HEIGHT * _WIDTH}
                pinchGestureEnabled
                showsVerticalScrollIndicator={false}
                initialScrollIndex={0}
                scrollEventThrottle={16}
            />
        </MasterView>
    )
}

export default VideosTabController
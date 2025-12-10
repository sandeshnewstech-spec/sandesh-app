import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { MasterView, VideoItem } from 'components'
import { useAPIs, useGetPosts, useThemeX } from 'hooks'
import useZuStore from 'store/useZuStore'
import { makeOBJFN } from 'functions'
import { VideoItemType } from 'types'
import { _HEIGHT, BOTTOM_TAB_HEIGHT } from 'utils'

const VideosTabController = () => {
    const { col, bottom, top } = useThemeX();
    const { getVideosAPI } = useAPIs();
    const { setUpdatePosts } = useZuStore();
    const [postIDs, setPostsIDs] = useState<Array<string>>([]);
    const { postsData } = useGetPosts({ IDs: postIDs });
    const [curentIDx, setCurrentIDx] = useState<number>(0);

    const SCR_HEIGHT = _HEIGHT - (BOTTOM_TAB_HEIGHT + bottom + top);

    const onScrolling = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideSize = event.nativeEvent.layoutMeasurement.height;
        const index = event.nativeEvent.contentOffset.y / SCR_HEIGHT;
        const roundIndex = Math.round(index);
        setCurrentIDx(roundIndex);
    }, [SCR_HEIGHT]);

    const getVideosFN = () => {
        getVideosAPI().then(({ res }) => {
            const tempOBJ = makeOBJFN(res?.data?.video);
            if (res?.data?.video && tempOBJ?.IDs.length > 0) {
                setPostsIDs(tempOBJ?.IDs);
                setUpdatePosts(tempOBJ?.obj);
            }
        });
    }

    const renderItem = useCallback(({ item, index }: { item: VideoItemType, index: number }) => <VideoItem
        {...item} isPlaying={index === curentIDx} index={index}
        scr_height={SCR_HEIGHT}
    />, [postIDs, postsData, curentIDx]);

    useEffect(() => {
        getVideosFN();
    }, []);

    return (
        <MasterView hShow={false}
            barStyle='light-content'
            sbColor={col.BLACK}
            style={{ flex: 1 }} fixed >
            <FlatList
                pagingEnabled
                data={postsData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                onScroll={onScrolling}
                showsVerticalScrollIndicator={false}
                // snapToInterval={SCR_HEIGHT}
                // viewabilityConfig={{ itemVisiblePercentThreshold: 80, }}
                removeClippedSubviews={true}
                maxToRenderPerBatch={6}
                windowSize={6}
                initialNumToRender={1}
            />
        </MasterView>
    )
}

export default VideosTabController

const styles = StyleSheet.create({})
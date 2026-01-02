import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAPIs, useThemeX } from 'hooks';
import useZuStore from 'store/useZuStore';
import { MasterView } from 'components';

const WebStoriesViewController = () => {
    const { col, font, str } = useThemeX();
    const { getLatestWebStoriesAPI } = useAPIs();
    const { homeWebStory, setLatestWebstories, setWebstoriesMenus } = useZuStore();
    const getLatestWebStoriesFN = async () => {
        getLatestWebStoriesAPI({ limit: 10, start: 0, category_name: "" }).then(({ res }) => {
            if (Array.isArray(res?.data) && res?.data.length > 0) {
            }
        })
    }
    useEffect(() => {
        getLatestWebStoriesFN();
    }, []);
    return (
        <MasterView style={{}} title="Web Stories" fixed >
            <View>
            </View>
        </MasterView>
    )
}

export default WebStoriesViewController
import { HomeWebStoriesList, MasterView } from "components"
import { useAPIs, useThemeX } from "hooks"
import { useEffect } from "react";
import { View } from "react-native";
import useZuStore from "store/useZuStore"

const WebStoriesListController = () => {
    const { col, font, str } = useThemeX();
    const { getLatestWebStoriesAPI } = useAPIs();
    const { webStory, setWebStory } = useZuStore();
    const getLatestWebStoriesFN = async () => {
        getLatestWebStoriesAPI().then(({ res }) => {
            if (res?.data) {

            }
        })
    }
    useEffect(() => {
        getLatestWebStoriesFN();
    }, []);
    return (
        <MasterView style={{}} title="Web Stories" fixed >
            <View>
                <HomeWebStoriesList showViewAll={false} />
            </View>
        </MasterView>
    )
}

export default WebStoriesListController
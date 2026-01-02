import { pLOG, updateOBJFN } from 'functions';
import { useMemo } from 'react';
import useZuStore from 'store/useZuStore';
import { allTypesOfPostItemType, WebStoryItemType } from 'types';

const useGetPostsHook = ({ _postsIDs = [], _webStoryIDs = [] }: { _postsIDs?: Array<string>; _webStoryIDs?: Array<string> }) => {
    const { posts, homeWebStory, latestWebStory } = useZuStore();

    const postsData = useMemo(() => {
        const tempOBJ: Array<allTypesOfPostItemType> = [];
        for (let id of _postsIDs) {
            if (posts[id]?.id) {
                tempOBJ.push(posts[id]);
            }
        };
        return tempOBJ;
    }, [posts, _postsIDs]);

    const webStoryData = useMemo((): Array<WebStoryItemType> => {
        const tempOBJ: Array<WebStoryItemType> = [];
        for (let id of _webStoryIDs) {
            if (homeWebStory[id]?.id) {
                tempOBJ.push(homeWebStory[id]);
            }
        };
        return tempOBJ;
    }, [homeWebStory, _webStoryIDs]);

    const latestWebStoryData = useMemo((): Array<WebStoryItemType> => {
        const tempOBJ: Array<WebStoryItemType> = [];
        for (let id of _webStoryIDs) {
            if (latestWebStory[id]?.id) {
                tempOBJ.push(latestWebStory[id]);
            }
        };
        return tempOBJ;
    }, [latestWebStory, _webStoryIDs]);

    return ({ postsData, webStoryData, latestWebStoryData });
}

export default useGetPostsHook;
import { updateOBJFN } from 'functions';
import { useMemo } from 'react';
import useZuStore from 'store/useZuStore';
import { allTypesOfPostItemType, WebStoryItemType } from 'types';

const useGetPostsHook = ({ _postsIDs = [], _webStoryIDs = [] }: { _postsIDs?: Array<string>; _webStoryIDs?: Array<string> }) => {
    const { posts, webStory } = useZuStore();

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
            if (webStory[id]?.id) {
                tempOBJ.push(webStory[id]);
            }
        };
        return tempOBJ;
    }, [webStory, _webStoryIDs]);

    return ({ postsData, webStoryData });
}

export default useGetPostsHook;
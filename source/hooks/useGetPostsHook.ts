import { pLOG } from 'functions';
import { useMemo } from 'react';
import useZuStore from 'store/useZuStore';
import { allTypesOfPostItemType } from 'types';

const useGetPostsHook = ({ IDs = [] }: { IDs: Array<string> }) => {
    const { posts } = useZuStore();
    const state = useZuStore();

    const postsData = useMemo(() => {
        const tempOBJ: Array<allTypesOfPostItemType> = [];
        for (let id of IDs) {
            if (posts[id]?.id) {
                tempOBJ.push(posts[id]);
            }
        };
        return tempOBJ;
    }, [posts, IDs]);
    return ({ postsData });
}

export default useGetPostsHook;
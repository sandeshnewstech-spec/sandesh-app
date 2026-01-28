import { create } from 'zustand';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';
import { zuStandStoreOBJType } from '../types';
import { zuStandStoreOBJ } from '../utils';
import zuStandStorage from './zustandStorage';
import { updateOBJFN } from 'functions';
import { NewsItem } from 'components';

/**
* Local Storage,
* Store All Required Data On device Storage
**/
const useZuStore = create<zuStandStoreOBJType>()(
    devtools(persist((set) => ({
        ...zuStandStoreOBJ,
        setNewsItems: by => set((state) => ({ newsItems: updateOBJFN(state?.newsItems, by)?.obj })),
        setIsAppStartFlow: by => set((state) => ({ isAppStartFlow: by })),
        setAppServices: by => set((state) => ({ appServices: { ...state?.appServices, ...by } })),
        setPosts: by => set((state) => ({ posts: by })),
        setHomeTopMenu: by => set((state) => ({ homeTopMenu: by })),
        setUpdatePosts: by => set((state) => ({ posts: updateOBJFN(state?.posts, by)?.obj })),
        setHomeWebStory: by => set((state) => ({ homeWebStory: updateOBJFN(state?.homeWebStory, by)?.obj })),
        setLatestWebstories: by => set((state) => ({ latestWebStory: updateOBJFN(state?.latestWebStory, by)?.obj })),
        setWebstoriesMenus: by => set((state) => ({ latestWebStoryMenu: by })),
        setHomeSecondaryData: by => set((state) => ({ homeSecondaryData: by })),
    }), {
        name: '@sandesh@',
        storage: createJSONStorage(() => zuStandStorage),
        partialize: (state) => <zuStandStoreOBJType>({ ...state }),
        onRehydrateStorage: (_/* state */) => {
            return async (state, error) => {
                if (error) { console.log('zustandError:: an error happened during hydration', error); }
                // await RNBootSplash.hide({ fade: true, duration: 500 });
                // console.log('hydration finished, BootSplash has been hidden successfully');
            };
        }
    }))
);

export default useZuStore;
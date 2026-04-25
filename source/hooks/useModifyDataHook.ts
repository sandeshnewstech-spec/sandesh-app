import { useMemoX } from '.';
import useZuStore from 'store/useZuStore';
import { allTypesOfPostItemType, NewsItemType, WebStoryItemType } from 'types';

const useModifyDataHook = ({ _postsIDs = [], _webStoryIDs = [], _categoryNewsItmeIDs = [] }: {
    _postsIDs?: Array<string>; _webStoryIDs?: Array<string>, _categoryNewsItmeIDs?: Array<string>,
}) => {

    const { posts, homeWebStory, homeSecondaryData, newsItems } = useZuStore();

    const GujaratmetroData = homeSecondaryData["Gujaratmetro"] || [];
    const MostviewsData = homeSecondaryData["Mostviews"] || [];
    const MostshareData = homeSecondaryData["Mostshare"] || [];
    const GujaratData = homeSecondaryData["Gujarat"] || [];
    const VideosData = homeSecondaryData["Videos"] || [];
    const NationalData = homeSecondaryData["National"] || [];
    const ElectionData = homeSecondaryData["Election"] || [];
    const GameData = homeSecondaryData["Game"] || [];
    const TrendingData = homeSecondaryData["Trending"] || [];
    const WorldData = homeSecondaryData["World"] || [];
    const GalleryData = homeSecondaryData["Gallery"] || [];
    const SpottedgalleryData = homeSecondaryData["Spottedgallery"] || [];
    const EntertainmentData = homeSecondaryData["Entertainment"] || [];
    const LifestyleData = homeSecondaryData["Lifestyle"] || [];
    const TravelData = homeSecondaryData["Travel"] || [];
    const RelationshipData = homeSecondaryData["Relationship"] || [];
    const FoodData = homeSecondaryData["Food"] || [];
    const SportnewsData = homeSecondaryData["Sportnews"] || [];
    const AstrologyData = homeSecondaryData["Astrology"] || [];
    const SupplementData = homeSecondaryData["Supplement"] || [];
    const BusinessData = homeSecondaryData["Business"] || [];
    const TechnologyData = homeSecondaryData["Technology"] || [];
    const ColumnistData = homeSecondaryData["Columnist"] || [];
    const GaneshData = homeSecondaryData["Ganesh"] || [];
    const GaneshEnabledData = homeSecondaryData["GaneshEnabled"] || [];

    const HomeTopNewsData = [
        TrendingData[0], EntertainmentData[0], ElectionData[0], NationalData[0],
        WorldData[0], LifestyleData[0], TravelData[0]].filter(item => item !== undefined);

    const postsData = useMemoX(() => {
        const tempOBJ: Array<allTypesOfPostItemType> = [];
        for (let id of _postsIDs) {
            if (posts[id]?.id) {
                tempOBJ.push(posts[id]);
            }
        };
        return tempOBJ;
    }, [posts, _postsIDs]);

    const webStoryData = useMemoX((): Array<WebStoryItemType> => {
        const tempOBJ: Array<WebStoryItemType> = [];
        for (let id of _webStoryIDs) {
            if (homeWebStory[id]?.id) {
                tempOBJ.push(homeWebStory[id]);
            }
        };
        return tempOBJ;
    }, [homeWebStory, _webStoryIDs]);

    const homeTopTabCategoryNews = useMemoX(() => {
        const tempOBJ: Array<NewsItemType> = [];
        // console.log("_categoryNewsItmeIDs::", _categoryNewsItmeIDs);
        for (let id of _categoryNewsItmeIDs) {
            if (newsItems[id]?.id) {
                tempOBJ.push(newsItems[id]);
            }
        };
        // console.log("tempOBJ::", tempOBJ)
        return tempOBJ;
    }, [newsItems]);


    return ({
        postsData, webStoryData,
        GujaratmetroData, MostviewsData, MostshareData, GujaratData, VideosData, NationalData, ElectionData, GameData,
        TrendingData, WorldData, GalleryData, SpottedgalleryData, EntertainmentData, LifestyleData, TravelData,
        RelationshipData, FoodData, SportnewsData, AstrologyData, SupplementData, BusinessData, TechnologyData,
        ColumnistData, GaneshData, GaneshEnabledData,
        homeTopTabCategoryNews, HomeTopNewsData
    });
}

export default useModifyDataHook;
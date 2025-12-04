export type NewsItemType = {
    id?: number;
    url?: string;
    post_type?: number;
    comment_status?: number;
    title?: string;
    tagline?: string;
    video?: string | null;
    video_yt?: string | null;
    publish_date?: string;
    media_title?: string;
    media?: string;
    time?: string;
    category?: string;
    spotted?: string | null;
    p_date?: number;
    content?: string;
    gallery?: string;
    count?: number;
}

export type CategoryDataType = {
    name?: string;
    data?: Array<NewsItemType>;
}

export type GaneshItemType = {
    media_title?: string;
    media?: string;
    id?: number;
}

export type HomeSecondaryDataType = {
    Gujaratmetro?: Array<CategoryDataType>;
    Mostviews?: NewsItemType;
    Mostshare?: NewsItemType;
    Gujarat?: Array<NewsItemType>;
    Videos?: Array<NewsItemType>;
    National?: Array<NewsItemType>;
    Election?: Array<NewsItemType>;
    Game?: any[];
    Trending?: Array<NewsItemType>;
    World?: Array<NewsItemType>;
    Gallery?: Array<NewsItemType>;
    Spottedgallery?: Array<NewsItemType>;
    Entertainment?: Array<NewsItemType>;
    Lifestyle?: Array<NewsItemType>;
    Travel?: Array<NewsItemType>;
    Relationship?: Array<NewsItemType>;
    Food?: Array<NewsItemType>;
    Sportnews?: Array<NewsItemType>;
    Astrology?: Array<NewsItemType>;
    Supplement?: Array<NewsItemType>;
    Business?: Array<NewsItemType>;
    Technology?: Array<NewsItemType>;
    Columnist?: Array<NewsItemType>;
    Ganesh?: GaneshItemType[];
    GaneshEnabled?: number;
}

export type HomeTopMenuItemType = {
    name?: string;
    category?: string | false;
    url?: string;
    open?: number;
    title?: string;
    submenu?: HomeTopMenuStructureType | any[];
};

export type HomeTopMenuStructureType = {
    [key: string]: HomeTopMenuItemType;
};
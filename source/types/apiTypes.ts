export type NewsItemType = {
    id?: string;
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
    id?: string;
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

export type allTypesOfPostOBJType = { [key: string]: postDetailTopTenNewsType & VideoItemType };
export type allTypesOfPostItemType = postDetailTopTenNewsType & VideoItemType;

export type VideoItemType = {
    id?: number;
    url?: string;
    post_type?: number;
    video?: string | null;
    video_yt?: string;
    comment_status?: number;
    title?: string;
    tagline?: string;
    publish_date?: string;
    media?: string;
    p_date?: number;
    time?: string;
};

export type postDetailRelatedItemType = {
    id?: string;
    url?: string;
    post_type?: number;
    comment_status?: number;
    title?: string;
    tagline?: string;
    video?: string | null;
    video_yt?: string | null;
    publish_date?: string;
    media?: string;
    time?: string;
    category?: string;
}

export type postDetailTopTenNewsType = {
    id?: string;
    url?: string;
    title?: string;
    post_type?: number;
    publish_date?: string;
    media?: string;
    category?: string;
}

export type postDetailType = {
    id?: string;
    post_type?: number;
    seo_title?: string;
    audio_title?: string | null;
    audio?: string | null;
    media?: string;
    title?: string;
    gallery?: string | null;
    video?: string;
    video_yt?: string | null;
    tagline?: string;
    url?: string;
    description?: string;
    short_description?: string | null;
    content?: string;
    byliner?: string;
    keywords?: string;
    comment_status?: number;
    template?: number;
    comment_count?: number;
    views?: number;
    publish_date?: string;
    tags?: string;
    byliner_status?: string;
    category_name?: string;
    category_url?: string;
    related?: Array<postDetailRelatedItemType>;
    toptennews?: Array<postDetailTopTenNewsType>;
    comments?: any[];
    timeline?: any[];
    alsoread?: string;
    alsoread1?: number;
};
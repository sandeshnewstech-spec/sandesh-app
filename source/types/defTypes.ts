import {
    ActivityIndicatorProps, ColorValue, DimensionValue, FlexAlignType, GestureResponderEvent, KeyboardTypeOptions,
    NativeSyntheticEvent, ReturnKeyTypeOptions, ScaledSize, ScrollViewProps, StatusBarStyle, StyleProp, TextInputFocusEventData,
    TextInputProps, TextInputSubmitEditingEventData, TextStyle, ViewStyle
} from "react-native";
import { PressableProps } from "react-native-gesture-handler";
import { PressableAndroidRippleConfig } from "react-native-gesture-handler/lib/typescript/components/Pressable/PressableProps";
import { AnimatedScrollViewProps, SharedValue } from "react-native-reanimated";
import { TextProps } from "react-native-svg";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { _COL, _GRADIANTS_COLORS } from "../colors";
import { EdgeInsets } from "react-native-safe-area-context";
import { FONT } from "../assets";
import { ReactNode } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AndroidPermission, IOSPermission } from "react-native-permissions";
import { allTypesOfPostOBJType, homeSecondaryNewsDataType, HomeTopMenuItemType, newsItemsObj } from "./apiTypes";
import { YoutubeIframeRef } from "react-native-youtube-iframe";

export type zuStandInitStoreType = {
    isAppStartFlow: boolean;
    appServices: appServicesType;
    posts: allTypesOfPostOBJType;
    homeWebStory: WebStoryObjType;
    homeSecondaryData: homeSecondaryNewsDataType;
    latestWebStory: WebStoryObjType;
    latestWebStoryMenu: Array<LatestWebstoriesCategoryItemType>;
    newsItems: newsItemsObj;
    homeTopMenu: Array<HomeTopMenuItemType>;
}

export type setZuStandInitStoreType = {
    setIsAppStartFlow: (by: boolean) => void;
    setAppServices: (by: appServicesType) => void;
    setPosts: (by: allTypesOfPostOBJType) => void;
    setUpdatePosts: (by: allTypesOfPostOBJType) => void;
    setHomeWebStory: (by: WebStoryObjType) => void;
    setWebstoriesMenus: (by: Array<LatestWebstoriesCategoryItemType>) => void;
    setLatestWebstories: (by: WebStoryObjType) => void;
    setHomeSecondaryData: (by: homeSecondaryNewsDataType) => void;
    setNewsItems: (by: newsItemsObj) => void;
    setHomeTopMenu: (by: Array<HomeTopMenuItemType>) => void;
}

export type YoutubeIFramePlayerRefType = YoutubeIframeRef;

export type zuStandStoreOBJType = zuStandInitStoreType & setZuStandInitStoreType;

export type kBehavior = 'height' | 'position' | 'padding' | undefined;

export type ApiCallType = {
    endPath?: string;
    body?: any | FormData;
    token?: string;
    urlencoded?: boolean;
    isFormData?: boolean;
    multipart?: boolean;
    toText?: boolean;
    method?: 'POST' | 'PUT' | 'GET';
    params?: string;
    apiURI?: string;
}

export type ApiResType = {
    code: number;
    res: any;
    url: string;
    status: boolean;
    err: boolean;
    message: string;
    setProgress?: (i: number) => void;
}

export type PressXType = {
    children?: React.ReactNode;
    type?: 'p' | 't' | 'wT';
    text?: string | number | undefined | boolean | null;
    disabled?: boolean;
    loading?: boolean;
    lCol?: ColorValue;
    //* Small has a height of 20, large has a height of 36.
    lSize?: number | 'small' | 'large' | undefined;
    tSty?: TextStyle;
    cSty?: ViewStyle;
    mSty?: ViewStyle;
    hitSlop?: number;
    mProps?: ViewProps;
    cProps?: PressableProps;
    tProps?: TextProps;
    lProps?: ActivityIndicatorProps;
    pStyIdx?: number;
    dStyIdx?: number;
    rStyIdx?: number;
    pSty?: (i: { p: boolean }) => ViewStyle;
    rSty?: PressableAndroidRippleConfig;
    onPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
    onLongPress?: () => void;
}

export type colorType = typeof _COL[0];

export type fontType = typeof FONT;

export type defStyObjType = {
    isDarkMode: boolean;
    col: colorType;
    font: fontType;
    GRADIANTS_COLORS: typeof _GRADIANTS_COLORS[0];
    windowDimention: ScaledSize;
} & EdgeInsets;

export type headerType = {
    hHeight?: number;
    hBgColor?: ColorValue;
    alignText?: FlexAlignType | undefined;
    lHeight?: number;
    rHeight?: number;
    tSty?: TextStyle;
    lSvg?: ReactNode;
    rSvg?: ReactNode;
    backBtn?: boolean;
    bPress?: () => void;
    title?: string;
    hShow?: boolean;
    bIcCol?: ColorValue | string;
    bIcBgCol?: ColorValue | string;
    hTextCol?: ColorValue | string;
    hTextBgCol?: ColorValue | string;
} & statusBarType;

export type statusBarType = {
    sbShow?: boolean;
    sbColor?: string | undefined;
    barStyle?: StatusBarStyle | string;
    sbTransition?: "none" | "fade" | "slide" | null | undefined;
}

export type MasterViewType = {
    children?: ReactNode | React.JSX.Element;
    scrollViewRef?: any;
    bounces?: boolean;
    scrollEnabled?: boolean;
    onScroll?: ScrollViewProps['onScroll'];
    pT?: number;
    pB?: number;
    pH?: number;
    pV?: number;
    style?: StyleProp<ViewStyle>;
    width?: DimensionValue | undefined;
    flex?: number | undefined;
    alignItem?: FlexAlignType;
    bgCol?: ColorValue;
    bgCol2?: ColorValue;
    fixed?: boolean;
    gScroll?: boolean;
    autoAdujKeyInsets?: boolean | undefined;
    keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps'];
    header?: ReactNode;
    hShow?: boolean;
    bottomBarColor?: ColorValue;
    modals?: ReactNode;
    bSvg?: ReactNode;
    tSvg?: ReactNode;
    toast?: ToastType;
    setToast?: (i: ToastType) => void;
    topNODE?: ReactNode;
    btmNODE?: ReactNode;
    abScrLoader?: boolean;
    abLoader?: boolean;
    scrLoader?: boolean;
    scrollViewProps?: AnimatedScrollViewProps;
} & headerType;

export type ToastType = {
    show?: boolean;
    msg?: string;
    isTimeOut?: boolean;
    timeOut?: number;
    setToast?: (i: ToastType) => void;
    showIC?: boolean;
    bgCol?: string;
    cSty?: ViewStyle;
    absolute?: boolean;
    msg_tSty?: TextStyle;
    children?: ReactNode;
    entering?: any | undefined;
    exiting?: any | undefined;
    icCol?: string;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    ctr?: boolean;
}

export type TextInputXType = {
    touchable?: boolean;
    BSInput?: boolean;
    lable?: string;
    phNm?: string;
    text?: string;
    lines?: number;
    onChangeT?: ((text: string) => void);
    reff?: any;
    onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void);
    onSubEdit?: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void);
    rKeyType?: ReturnKeyTypeOptions;
    kbType?: KeyboardTypeOptions;
    autoComplete?: TextInputProps['autoComplete'];
    autoCorrect?: TextInputProps['autoCorrect'];
    sTxtEntry?: TextInputProps['secureTextEntry'];
    multiline?: TextInputProps['multiline'];
    onFocus?: TextInputProps['onFocus'];
    onPressIn?: TextInputProps['onPressIn'];
    textContentType?: TextInputProps['textContentType'];
    pointerEvents?: TextInputProps['pointerEvents'];
    readOnly?: TextInputProps['readOnly'];
    onLayout?: TextInputProps['onLayout'];
    inputSty?: TextInputProps['style'];
    maxLength?: TextInputProps['maxLength'];
    autoCapitalize?: TextInputProps['autoCapitalize'];
    mSty?: ViewStyle;
    labelNM?: string;
    editable?: boolean;
    lBtn?: ReactNode | React.JSX.Element;
    lBtn_text?: string;
    lBtn_tSty?: TextStyle;
    lBtn_mSty?: ViewStyle;
    lBtn_cSty?: ViewStyle;
    lBtn_loader?: boolean;
    lBtnDis?: boolean;
    lBtnPress?: () => void;
    rBtn?: ReactNode | React.JSX.Element;
    rBtn_text?: string;
    rBtn_tSty?: TextStyle;
    rBtn_mSty?: ViewStyle;
    rBtn_cSty?: ViewStyle;
    rBtn_loader?: boolean;
    rBtnDis?: boolean;
    rBtnPress?: () => void;
    lBtnNode?: ReactNode;
    rBtnNode?: ReactNode;
    lbl_LChild?: ReactNode;
    lbl_RChild?: ReactNode;
    lbl_LSvg?: ReactNode;
    lbl_RSvg?: ReactNode;
    topSvg?: ReactNode;
    bottomSvg?: ReactNode;
    lbl_cSty?: ViewStyle;
    ip_LSvg?: ReactNode;
    ip_RSvg?: ReactNode;
    inputBox?: ReactNode;
    onBoxLayout?: ViewProps['onLayout'];
};

export type TextXType = {
    text?: string | number;
    lChild?: ReactNode;
    rChild?: ReactNode;
    tSty?: StyleProp<TextStyle>;
    tProps?: TextProps;
    children?: any;
    fColor?: ColorValue;
    fFamily?: string;
    fSize?: number;
    tAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
    lines?: number;
    onLayout?: TextProps['onLayout'];
    autofit?: boolean | SharedValue<boolean | undefined> | undefined;
    onPress?: TextProps['onPress'];
    entering?: any;
    exiting?: any;
}

export type AppStackParamListType = {
    BottomTab: any;
};

export type StackProps<RouteName extends keyof AppStackParamListType> = (
    StackScreenProps<AppStackParamListType, RouteName, "AppStack">
);

export type getImageMetaDataType = {
    ImageWidth: number;
    ImageHeight: number;
    Orientation: number;
    size: number;
    extension: string;
    exif: { [key: string]: string };
};

export type checkPermissionType = {
    checkDENIED?: boolean;
    checkUNAVAILABLE?: boolean;
    checkLIMITED?: boolean;
}

export type PermissionResultType = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

export type permissionsType = {
    i?: IOSPermission | undefined;
    a?: AndroidPermission | undefined;
    rationale?: rationaleType;
} & checkPermissionType;

export type rationaleType = {
    title?: string,
    message?: string,
    buttonPositive?: string,
    buttonNegative?: string,
}

export type PressableScaleXCompoProps = {
    children?: React.ReactNode
    text?: string | number | boolean | null
    disabled?: boolean;
    loading?: boolean;
    lCol?: ColorValue;
    lSize?: number | 'small' | 'large' | undefined;
    style?: ViewStyle;
    tSty?: TextStyle;
    tProps?: TextProps;
    lProps?: ActivityIndicatorProps;
    onPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
    onLongPress?: () => void;
    hitSlop?: number
    activeScale?: number
    rippleRadius?: number
    rippleColor?: ColorValue
    springConfig?: any
    activeOpacity?: number
}

export type appServicesType = {
    appLogo?: string;
    placeholderLogo?: string;
    assetURL?: string;
    liveStreamYoutubeId?: string;
    baseURL?: string;
}

export type WebStoryObjType = { [key: string]: WebStoryItemType };

export type WebStoryItemType = {
    id?: number;
    url?: string;
    category?: string;
    subcategory?: string | null;
    image?: string;
    main_image?: string;
    status?: string;
    title?: string;
    seo_title?: string;
    seo_des?: string | null;
    seo_key?: string | null;
    description?: string;
    views?: number;
    share_count?: number;
    user_id?: number;
    u_user_id?: number | null;
    created_at?: string;
    updated_at?: string;
    category_name?: string;
    subcategory_name?: string;
};

export type LatestWebstoriesCategoryItemType = {
    id?: string;
    name?: string;
}

export type apiFuntionType = {
    _isLoading?: boolean;
    _isTopLoading?: boolean;
    _isBottomLoading?: boolean;
}
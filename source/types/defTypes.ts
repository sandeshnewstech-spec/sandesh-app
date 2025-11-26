import { ActivityIndicatorProps, AlertType, ColorValue, DimensionValue, FlexAlignType, GestureResponderEvent, KeyboardTypeOptions, NativeSyntheticEvent, ReturnKeyTypeOptions, ScrollViewProps, StatusBarStyle, StyleProp, TextInputFocusEventData, TextInputProps, TextInputSubmitEditingEventData, TextStyle, ViewStyle } from "react-native";
import { PressableProps } from "react-native-gesture-handler";
import { PressableAndroidRippleConfig } from "react-native-gesture-handler/lib/typescript/components/Pressable/PressableProps";
import Animated, { AnimateProps, Animation, SharedValue } from "react-native-reanimated";
import { TextProps } from "react-native-svg";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { _COL } from "../colors";
import { EdgeInsets } from "react-native-safe-area-context";
import { FONT } from "../assets";
import { ReactNode } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AndroidPermission, IOSPermission } from "react-native-permissions";

type zuStandInitStoreType = {
}

type setZuStandInitStoreType = {
    // setProducts: (by: productsDyOBJType) => void;
}

type zuStandStoreOBJType = zuStandInitStoreType & setZuStandInitStoreType;

type kBehavior = 'height' | 'position' | 'padding' | undefined;

type ApiCallType = {
    endPath?: string;
    body?: any | FormData;
    token?: string;
    shopifyXToken?: string;
    urlencoded?: boolean;
    isFormData?: boolean;
    multipart?: boolean;
    toText?: boolean;
    method?: 'POST' | 'PUT' | 'GET';
    params?: string;
    apiURI?: string;
}

type ApiResType = {
    code: number;
    res: any;
    url: string;
    status: boolean;
    err: boolean;
    message: string;
    setProgress?: (i: number) => void;
}

type PressXType = {
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
    mProps?: AnimateProps<ViewProps>;
    // cProps?: PressableProps;
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

type colorType = typeof _COL;

type fontType = typeof FONT;
// type fontType = {
//     BLACK: string;
//     BLACK_ITALIC: string;
//     BOLD: string;
//     BOLD_ITALIC: string;
//     EXTRA_BOLD: string;
//     EXTRA_BOLD_ITALIC: string;
//     EXTRA_LIGHT: string;
//     EXTRA_LIGHT_ITALIC: string;
//     ITALIC: string;
//     LIGHT: string;
//     LIGHT_ITALIC: string;
//     MEDIUM: string;
//     MEDIUM_ITALIC: string;
//     REGULAR: string;
//     SEMI_BOLD: string;
//     SEMI_BOLD_ITALIC: string;
//     THIN: string;
//     THIN_ITALIC: string;
//     RUFINA_BOLD: string;
//     RUFINA_REGULAR: string;
// }

type defStyObjType = {
    col: colorType;
    font: fontType;
} & EdgeInsets;

type headerType = {
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

type statusBarType = {
    sbShow?: boolean;
    sbColor?: string | undefined;
    barStyle?: StatusBarStyle;
    sbTransition?: "none" | "fade" | "slide" | null | undefined;
}


type MasterViewType = {
    children?: ReactNode | React.JSX.Element;
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
} & headerType;

type ToastType = {
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

type TextInputXType = {
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

type TextXType = {
    text?: string | number;
    lChild?: ReactNode;
    rChild?: ReactNode;
    tSty?: TextStyle;
    tProps?: AnimateProps<TextProps>;
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

type AppStackParamListType = {
    BottomTab: any;
};

type StackProps<RouteName extends keyof AppStackParamListType> = (
    NativeStackScreenProps<AppStackParamListType, RouteName, "AppStack">
);

type getImageMetaDataType = {
    ImageWidth: number;
    ImageHeight: number;
    Orientation: number;
    size: number;
    extension: string;
    exif: { [key: string]: string };
};

type checkPermissionType = {
    checkDENIED?: boolean;
    checkUNAVAILABLE?: boolean;
    checkLIMITED?: boolean;
}

type PermissionResultType = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

type permissionsType = {
    i?: IOSPermission | undefined;
    a?: AndroidPermission | undefined;
    rationale?: rationaleType;
} & checkPermissionType;

type rationaleType = {
    title?: string,
    message?: string,
    buttonPositive?: string,
    buttonNegative?: string,
}


export type {
    setZuStandInitStoreType, zuStandInitStoreType, zuStandStoreOBJType,
    kBehavior, ApiCallType, ApiResType, PressXType, colorType, fontType,
    defStyObjType, headerType, statusBarType, MasterViewType, ToastType,
    TextInputXType, TextXType, StackProps, getImageMetaDataType,
    checkPermissionType, PermissionResultType, permissionsType, rationaleType
}
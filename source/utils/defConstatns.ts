import React from "react";
import { defStyObjType, kBehavior, setZuStandInitStoreType, zuStandInitStoreType, zuStandStoreOBJType } from "../types";
import { Dimensions, Platform, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Size } from "functions";

export const _isDEV = true;
export const _isPUBLISH_MODE = false;

export const BOTTOM_TAB_HEIGHT = Size(70);

export const _WIDTH = Dimensions.get('window').width;
export const _HEIGHT = Dimensions.get('window').height;

export const AppStack = createNativeStackNavigator();
export const BottomTabStack = createBottomTabNavigator();

export const isIOS = Platform.OS === 'ios' ? true : false;
export const isANDROID = Platform.OS === 'android' ? true : false;
export const androidAPIVersion = (typeof Platform?.Version === 'number') ? Platform?.Version : parseInt(Platform?.Version);

export const ICON_SIZE = Size(27);
export const bSpace = 17;
export const headerHeight = 50;
export const btnHeight = 45;
export const btnRadius = 45;
export const kAvoidSty: kBehavior = isIOS ? "padding" : undefined;
export const sbH = StatusBar.currentHeight || 0;

export const onStateChange: any = React.createRef<any>();

export const zuStandInitStore: zuStandInitStoreType = {
    isAppStartFlow: true,
    appServices: {},
    posts: {},
};

export const setZuStandInitStore: setZuStandInitStoreType = {
    setIsAppStartFlow(by) { },
    setAppServices(by) { },
    setPosts(by) { },
    setUpdatePosts(by) { },
}

export const zuStandStoreOBJ: zuStandStoreOBJType = { ...zuStandInitStore, ...setZuStandInitStore };

export const LANGUAGES = [
    { code: "EN", name: "English" },
    { code: "HI", name: "Hindi" },
    { code: "GU", name: "Gujarati" },
    { code: "MR", name: "Marathi" },
    { code: "PA", name: "Punjabi" },
    { code: "BN", name: "Bengali" },
    { code: "TA", name: "Tamil" },
    { code: "TE", name: "Telugu" },
    { code: "KN", name: "Kannada" },
    { code: "ML", name: "Malayalam" },
];

export const defTheme = ({ col, font, isDarkMode }: defStyObjType): ReactNavigation.Theme => ({
    "dark": true,
    "colors": {
        "primary": col.PRIMARY,
        "background": "rgb(255, 59, 48)",
        "card": "rgb(255, 59, 48)",
        "text": col.TEXT_COL,
        "border": col.TOAST_OUTLINE,
        "notification": "rgb(255, 59, 48)"
    },
    "fonts": {
        "regular": {
            "fontFamily": font.REGULAR,
            "fontWeight": "normal"
        },
        "medium": {
            "fontFamily": font.MEDIUM,
            "fontWeight": "normal"
        },
        "bold": {
            "fontFamily": font.BOLD,
            "fontWeight": "600"
        },
        "heavy": {
            "fontFamily": font.EXTRA_BOLD,
            "fontWeight": "700"
        }
    }
})

export const API_END_POINTS = {
    homeSecondary: "home/secondary",
    homeTopMenu: "menu/mobile-menu",
    videos: "videopage",
    setting: "setting",
    postDetails: "post-details"
}

export const CUSTOM_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';
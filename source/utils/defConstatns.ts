import React from "react";
import { kBehavior, setZuStandInitStoreType, zuStandInitStoreType, zuStandStoreOBJType } from "../types";
import { Dimensions, Platform, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const _isDEV = true;
export const _isPUBLISH_MODE = false;

export const _WIDTH = Dimensions.get('window').width;
export const _HEIGHT = Dimensions.get('window').height;

export const AppStack = createNativeStackNavigator();
export const BottomTabStack = createBottomTabNavigator();

export const isIOS = Platform.OS === 'ios' ? true : false;
export const isANDROID = Platform.OS === 'android' ? true : false;
export const androidAPIVersion = (typeof Platform?.Version === 'number') ? Platform?.Version : parseInt(Platform?.Version);

export const bSpace = 15;
export const headerHeight = 50;
export const btnHeight = 45;
export const btnRadius = 45;
export const kAvoidSty: kBehavior = isIOS ? "padding" : undefined;
export const sbH = StatusBar.currentHeight || 0;

export const onStateChange: any = React.createRef<any>();

export const zuStandInitStore: zuStandInitStoreType = {
    taskListData: {},
    videoListData: {},
};

export const setZuStandInitStore: setZuStandInitStoreType = {
    // setTaskListData(by) { },
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
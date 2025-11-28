import React from "react";
import { kBehavior, setZuStandInitStoreType, zuStandInitStoreType, zuStandStoreOBJType } from "../types";
import { Platform, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const _isDEV = true;
const _isPUBLISH_MODE = false;

const AppStack = createNativeStackNavigator();
const BottomTabStack = createBottomTabNavigator();

const isIOS = Platform.OS === 'ios' ? true : false;
const isANDROID = Platform.OS === 'android' ? true : false;
const androidAPIVersion = (typeof Platform?.Version === 'number') ? Platform?.Version : parseInt(Platform?.Version);

const bSpace = 15;
const headerHeight = 50;
const btnHeight = 45;
const btnRadius = 45;
const kAvoidSty: kBehavior = isIOS ? "padding" : undefined;
const sbH = StatusBar.currentHeight || 0;

const onStateChange: any = React.createRef<any>();

const zuStandInitStore: zuStandInitStoreType = {
    taskListData: {},
    videoListData: {},
};

const setZuStandInitStore: setZuStandInitStoreType = {
    setTaskListData(by) { },
    setResetTaskListData(by) { },
    setVideoListData(by) { },
}

const zuStandStoreOBJ: zuStandStoreOBJType = { ...zuStandInitStore, ...setZuStandInitStore };

export {
    _isDEV, _isPUBLISH_MODE, AppStack, isIOS, isANDROID, androidAPIVersion,
    bSpace, headerHeight, btnHeight, kAvoidSty, sbH, btnRadius,
    zuStandInitStore, setZuStandInitStore, zuStandStoreOBJ, BottomTabStack
}
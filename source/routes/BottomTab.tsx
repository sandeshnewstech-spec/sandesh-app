import React from 'react';
import CustomizeBottomTabBar from './CustomizeBottomTabBar';
import { BottomTabStack } from 'utils';
import { StackProps } from 'types';
import { HomeTabScreen, ProfileTabScreen, SearchTabScreen, VideosTabScreen } from 'screens';

const BottomTab = ({ }: StackProps<'BottomTab'>) => {
    return (<BottomTabStack.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={props => <CustomizeBottomTabBar {...props} />}>
        <BottomTabStack.Screen name='HomeTabScreen' component={HomeTabScreen} />
        <BottomTabStack.Screen name='VideosTabScreen' component={VideosTabScreen} />
        <BottomTabStack.Screen name='SearchTabScreen' component={SearchTabScreen} />
        <BottomTabStack.Screen name='ProfileTabScreen' component={ProfileTabScreen} />
    </BottomTabStack.Navigator>);
};

export default BottomTab;

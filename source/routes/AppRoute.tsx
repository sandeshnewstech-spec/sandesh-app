import React, { Fragment } from 'react';
import { AppStack, } from 'utils';
import { ToastAlert } from 'components';
import { useInit, useMMKVStore } from '../hooks';
import { CategoryItemsListingScreen, HomeScreen, HomeTabScreen, InterestScreen, LanguageSelectionScreen, LiveTVScreen, LocationScreen, WebStoriesListScreen, WebStoryViewScreen } from 'screens';
import useZuStore from 'store/useZuStore';
import BottomTab from './BottomTab';
import { StatusBar } from 'react-native';

const AppRoute = () => {

    const { isAppStartFlow } = useZuStore();
    const { toast, setToast } = useMMKVStore();

    // StatusBar.setHidden(true);

    useInit();
    return (
        <Fragment>
            {isAppStartFlow ? (<AppStack.Navigator screenOptions={{ animation: 'slide_from_right', headerShown: false, }} >
                <AppStack.Screen name={"LanguageSelectionScreen"} component={LanguageSelectionScreen} options={{ animation: 'fade' }} />
                <AppStack.Screen name={"InterestScreen"} component={InterestScreen} options={{ animation: 'slide_from_right' }} />
                <AppStack.Screen name={"LocationScreen"} component={LocationScreen} options={{ animation: 'slide_from_right' }} />
            </AppStack.Navigator>)
                : (<AppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeTabScreen' >
                    {/* <AppStack.Screen name="BottomTab" component={BottomTab} options={{ animation: 'fade' }} /> */}
                    <AppStack.Screen name="HomeTabScreen" component={HomeTabScreen} options={{ animation: 'fade_from_bottom' }} />
                    <AppStack.Screen name="LiveTVScreen" component={LiveTVScreen} options={{ animation: 'fade_from_bottom' }} />
                    <AppStack.Screen name="WebStoriesListScreen" component={WebStoriesListScreen} options={{ animation: 'slide_from_right' }} />
                    <AppStack.Screen name="WebStoryViewScreen" component={WebStoryViewScreen} options={{ animation: 'slide_from_bottom' }} />
                    <AppStack.Screen name="CategoryItemsListingScreen" component={CategoryItemsListingScreen} options={{ animation: 'slide_from_right' }} />
                </AppStack.Navigator>)}
            <ToastAlert {...toast} setToast={setToast} />
        </Fragment>
    );
};

export default AppRoute;

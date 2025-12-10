import React, { Fragment } from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { AppStack, } from 'utils';
import { ToastAlert } from 'components';
import { useConnection, useInit, useMMKVStore, useThemeX } from '../hooks';
import { InterestScreen, LanguageSelectionScreen, LiveTVScreen, LocationScreen } from 'screens';
import useZuStore from 'store/useZuStore';
import BottomTab from './BottomTab';

const AppRoute = () => {

    const { str } = useThemeX();
    const { isAppStartFlow } = useZuStore();
    const { toast, setToast } = useMMKVStore();

    useInit();
    return (
        <Fragment>
            {isAppStartFlow ? (<AppStack.Navigator screenOptions={{ animation: 'slide_from_right' }} >
                <AppStack.Screen name={"LanguageSelectionScreen"} component={LanguageSelectionScreen} options={{ headerShown: false, }} />
                <AppStack.Screen name={"InterestScreen"} component={InterestScreen} options={{ headerShown: false }} />
                <AppStack.Screen name={"LocationScreen"} component={LocationScreen} options={{ headerShown: false }} />
            </AppStack.Navigator>)
                : (<AppStack.Navigator screenOptions={{ headerShown: false }} >
                    <AppStack.Screen name="BottomTab" component={BottomTab} options={{ animation: 'fade' }} />
                    <AppStack.Screen name="LiveTVScreen" component={LiveTVScreen} options={{ animation: 'fade_from_bottom' }} />
                </AppStack.Navigator>)}
            <ToastAlert {...toast} setToast={setToast} />
        </Fragment>
    );
};

export default AppRoute;

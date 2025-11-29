import React, { Fragment, useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from 'utils';
import { ToastAlert } from 'components';
import { useDebounce, useMMKVStore } from '../hooks';
import { useNetInfoInstance } from "@react-native-community/netinfo";
import { HomeScreen, InterestScreen, LanguageSelectionScreen } from 'screens';
import useString from 'language';

const AppRoute = () => {

    const str = useString();
    const { toast, setToast } = useMMKVStore();
    const { refresh, netInfo: { isConnected } } = useNetInfoInstance();
    const isFirstRender = useRef(true);

    const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

    const isConnectedDebounced = useDebounce(isConnected, 1000);

    useEffect(() => {
        // Skip the effect on the very first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        // If debounced connection status is false (offline), show a toast message
        if (!isConnectedDebounced) {
            setToast({ show: true, msg: str.YOUR_INTERNET_CONNCTIONS_IS_NOT_CONNECTED });
        }
    }, [isConnectedDebounced, setToast]);

    return (
        <Fragment>
            <NavigationContainer
                onStateChange={() => {
                    if (!isConnected) {
                        setToast({ show: true, msg: str.YOUR_INTERNET_CONNCTIONS_IS_NOT_CONNECTED });
                    }
                }}>
                <AppStack.Navigator>
                    <AppStack.Screen name={"LanguageSelectionScreen"} component={LanguageSelectionScreen} options={{ headerShown: false }} />
                    <AppStack.Screen name={"InterestScreen"} component={InterestScreen} options={{ headerShown: false }} />
                </AppStack.Navigator>
                {/* <AppStack.Navigator>
                    <AppStack.Screen name={"HomeScreen"} component={HomeScreen} options={{ headerShown: false }} />
                </AppStack.Navigator> */}
            </NavigationContainer>
            <ToastAlert {...toast} setToast={setToast} />
        </Fragment>
    );
};

export default AppRoute;

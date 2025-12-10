import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react'
import { AppRoute } from './source/routes';
import { useColors, useConnection, useMMKVStore } from 'hooks';
import { NavigationContainer } from '@react-navigation/native';
import useString from 'language';

const App = () => {
  const str = useString();
  const { col } = useColors();
  const { isConnected } = useConnection();
  const { setToast } = useMMKVStore();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: col.ROOT_SCR_BG }}>
        <NavigationContainer
          onStateChange={() => {
            if (!isConnected) {
              setToast({ show: true, msg: str.YOUR_INTERNET_CONNCTIONS_IS_NOT_CONNECTED });
            }
          }}>
          <AppRoute />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App
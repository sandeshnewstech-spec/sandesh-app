import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react'
import { AppRoute } from './source/routes';
import { useColors } from 'hooks';

const App = () => {
  const { col, GRADIANTS_COLORS } = useColors();
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: col.ROOT_SCR_BG }}>
        <AppRoute />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App
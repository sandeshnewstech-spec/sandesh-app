/* ADD SCRIPTS */ -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

"startRC": "yarn start --reset-cache",
"adb": "adb reverse tcp:8081 tcp:8081",
"adbKill": "adb kill-server",
"adbStart": "adb start-server"

/* All Dependencies */ -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

"devDependencies": {
  "babel-plugin-module-resolver": "^5.0.0",
  "react-native-svg-transformer": "^1.1.0",
  "react-native-dotenv": "^3.4.9",
},
"dependencies": {
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/native-stack": "^6.9.17",
  "react-native": "0.72.6",
  "react-native-gesture-handler": "^2.13.4",
  "react-native-reanimated": "^3.5.4",
  "react-native-safe-area-context": "^4.7.4",
  "react-native-screens": "^3.27.0",
  "react-native-svg": "^13.14.0",
  "zustand": "^4.4.6",
  "react-native-mmkv": "^2.11.0",
  "react-native-responsive-fontsize": "^0.5.1",
  "react-native-fast-image": "^8.6.3",
},



------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
1. yarn add @react-navigation/native
2. yarn add @react-navigation/native-stack
3. yarn add react-native-screens react-native-safe-area-context

/* Config In Android */ -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

import android.os.Bundle;

//// 1.java

public class MainActivity extends ReactActivity {
  // ...
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  // ...
}

//// 2.kt

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
}

------------------------------------------------------------------------------------------
4. yarn add react-native-svg

/* MAKE :: declarations.d.ts */ -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

------------------------------------------------------------------------------------------
5. yarn add --dev react-native-svg-transformer

/* setup metro.config.js */ -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const defaultAssetExts = require('metro-config/src/defaults/defaults').assetExts;
const defaultSourceExts = require('metro-config/src/defaults/defaults').sourceExts;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  'transformer': {
    'babelTransformerPath': require.resolve("react-native-svg-transformer")
  },
  'resolver': {
    'assetExts': defaultAssetExts.filter(ext => ext !== "svg"),
    'sourceExts': [...defaultSourceExts, "svg"]
  }
};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);

------------------------------------------------------------------------------------------
7. yarn add --dev babel-plugin-module-resolver

/* CONFIG :: babel.config.js */ -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

"plugins": [
    ["module-resolver", {
      "root": ['./source'],
      "extensions": [".tsx", ".ts", ".js", ".jsx", ".json", ".jsonc"],
      "alias": { "*": "./source/", }
    }
    ]
]

------------------------------------------------------------------------------------------
8. yarn add react-native-reanimated

/* CONFIG :: babel.config.js */ -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
/* add this line in plugin on babel.config */

'react-native-reanimated/plugin'

------------------------------------------------------------------------------------------
9. yarn add react-native-gesture-handler

/* add this line in "index.js" */ -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
import 'react-native-gesture-handler';

/* CONFIG :: App.tsx */ -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
/* wrap all code with GestureHandlerRootView */

import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* content */}
    </GestureHandlerRootView>
  );
}

------------------------------------------------------------------------------------------
10. yarn add react-native-safe-area-context
 
/* add this line in "index.js" */ -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

/* CONFIG :: App.tsx */ -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
/* wrap all code with GestureHandlerRootView */

<SafeAreaProvider initialMetrics={initialWindowMetrics}>
{.....}
</SafeAreaProvider>

------------------------------------------------------------------------------------------
11. yarn add -D react-native-dotenv

/* CONFIG :: babel.config.js */ -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
/* add this pugin in this file */

    ["module:react-native-dotenv", {
    "envName": "APP_ENV",
    "moduleName": "@env",
    "path": ".env",
    "blocklist": null,
    "allowlist": null,
    "safe": true,
    "allowUndefined": false,
    "verbose": false
    }],

------------------------------------------------------------------------------------------

12. yarn add react-native-mmkv 
13. yarn add zustand 
14. yarn add react-native-responsive-fontsize
15. yarn add react-native-fast-image

------------------------------------------------------------------------------------------
/* MAKE :: react-native.config.js */

/* for this => add fonts */
/* config font path */

module.exports = {
    project: {
        ios:{},
        android:{}
    },
    assets:['./source/assets/fonts/'],
}

INFO : add fonts with thhis cmd => /* npx react-native-asset */

------------------------------------------------------------------------------------------
/* CONFIG :: tsconfig.json */

  "compilerOptions": {
    "baseUrl": "./",                /* Base directory to resolve non-absolute module names. */
    "paths": {
      "*": ["source/*"]
    }                               /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
  }

------------------------------------------------------------------------------------------
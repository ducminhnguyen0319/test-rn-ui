import {config} from '@tamagui/config';
import {createTamagui, setupReactNative} from '@tamagui/core';
import {Text, View} from 'react-native';

// if using only @tamagui/core with `react-native` components
// if using `tamagui` this isn't necessary
setupReactNative({Text, View});

const appConfig = createTamagui(config);

export type AppConfig = typeof appConfig;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;

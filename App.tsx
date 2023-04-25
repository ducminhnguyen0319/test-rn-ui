/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

// Using formik
// import {Formik} from 'formik';

import {
  GestureResponderEvent,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import type {PropsWithChildren} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button} from 'react-native';

import Section from './src/components/Section';

import TestNativeBase from './src/components/TestNativeBase';
import TestTamagui from './src/components/TestTamagui';
import TestBottomSheet from './src/components/TestRNBottomSheet';
import TestRNPaper from './src/components/TestRNPaper';
import TestRNE from './src/components/TestRNE';
import TestSelectDropdown from './src/components/TestSelectDropdown';
import SearchLocation from './src/components/SearchLocation';

import GooglePlacesInput from './src/components/GooglePlacesInput';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
navigator.geolocation = require('react-native-geolocation-service');

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  RNE: undefined;
  Tamagui: undefined;
  NativeBase: undefined;
  RNSelectDropdown: undefined;
  BottomSheet: undefined;
  RNPaper: undefined;
  Location: undefined;
  GooglePlacesInput: undefined;
};

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={App} options={{title: 'Home'}} />
        <Stack.Screen
          name="GooglePlacesInput"
          component={GooglePlacesInput}
          options={{title: 'GooglePlacesInput'}}
        />
        <Stack.Screen
          name="Location"
          component={SearchLocation}
          options={{title: 'Search location'}}
        />
        <Stack.Screen
          name="RNE"
          component={TestRNE}
          options={{title: 'React Native Elements'}}
        />
        <Stack.Screen
          name="NativeBase"
          component={TestNativeBase}
          options={{title: 'NativeBase'}}
        />
        <Stack.Screen
          name="RNSelectDropdown"
          component={TestSelectDropdown}
          options={{title: 'Select Dropdown'}}
        />
        <Stack.Screen
          name="Tamagui"
          component={TestTamagui}
          options={{title: 'Tamagui'}}
        />
        <Stack.Screen
          name="BottomSheet"
          component={TestBottomSheet}
          options={{title: 'RN BottomSheet'}}
        />
        <Stack.Screen
          name="RNPaper"
          component={TestRNPaper}
          options={{title: 'RN Paper'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

type TestSectionProps = PropsWithChildren<{
  title: string;
  description: string;
  onPress: (event: GestureResponderEvent) => void;
}>;

const TestSection = ({title, description, onPress}: TestSectionProps) => {
  return (
    <Section title={title} description={description}>
      <Button title="More details" onPress={onPress} />
    </Section>
  );
};

const requestCameraPermission = async () => {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization('whenInUse');
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'App Location Permission',
          message:
            'App needs access to your location' +
            'so you can get better search location results.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const App = () => {
  requestCameraPermission();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        horizontal={false}
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TestSection
            title="GooglePlacesInput UI"
            description="react-native-google-places-autocomplete"
            onPress={() => navigation.navigate('GooglePlacesInput')}
          />
          <TestSection
            title="Search location UI"
            description="Combine stuff UIs"
            onPress={() => navigation.navigate('Location')}
          />
          <TestSection
            title="NativeBase"
            description="Test NativeBase UI"
            onPress={() => navigation.navigate('NativeBase')}
          />
          <TestSection
            title="RN Select Dropdown"
            description="Test RN Select Dropdown, it's ez to use"
            onPress={() => navigation.navigate('RNSelectDropdown')}
          />
          <TestSection
            title="Tamagui"
            description="Test Tammagui UI"
            onPress={() => navigation.navigate('Tamagui')}
          />
          <TestSection
            title="RN Bottom sheet"
            description="Test RN Bottom Sheet"
            onPress={() => navigation.navigate('BottomSheet')}
          />
          <TestSection
            title="RN Elements"
            description="Test RN Elements"
            onPress={() => navigation.navigate('RNE')}
          />
          <TestSection
            title="RN Paper"
            description="Test RN Paper"
            onPress={() => navigation.navigate('RNPaper')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppStack;

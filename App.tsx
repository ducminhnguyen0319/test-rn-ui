/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

// Using rneui
import {createTheme, ThemeProvider} from '@rneui/themed';

// Using formik
// import {Formik} from 'formik';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Section from './src/components/Section';
import Search from './src/components/Search';
import {NativeBaseProvider} from 'native-base';

import SelectDropdown from 'react-native-select-dropdown';
import TestNativeBase from './src/components/TestNativeBase';
import TestTamagui from './src/components/TestTamagui';

// Config Tamagui
import {TamaguiProvider} from 'tamagui';
import appConfig from './tamagui.config';

const theme = createTheme({});

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const hits = [
    {id: 1, name: 'A'},
    {id: 2, name: 'B'},
    {id: 3, name: 'C'},
  ];
  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const contentContainerStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <>
      {/* Using with Tamagui */}
      <TamaguiProvider config={appConfig} defaultTheme="light">
        {/* Using with NativeBase UI */}
        <NativeBaseProvider>
          {/* Using with ReactNativeElements UI */}
          <ThemeProvider theme={theme}>
            <SafeAreaView style={backgroundStyle}>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
              />
              <ScrollView
                horizontal={false}
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <ScrollView
                  horizontal={false}
                  contentContainerStyle={contentContainerStyle}>
                  <View
                    style={{
                      backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <Section
                      title="NativeBase"
                      description="Test NativeBase UI">
                      <TestNativeBase />
                    </Section>
                    <Section
                      title="SearchBar - @rneui/base"
                      description="RNE is easy to use, doesn't dependent on expo and also support accessibility">
                      <Search
                        data={hits}
                        onSelect={function (item: {
                          id: number;
                          name: string;
                        }): void {
                          console.log(item);
                        }}
                      />
                    </Section>
                    <Section
                      title="react-native-select-dropdown"
                      description="Test RN Select Dropdown, ez to use">
                      <SelectDropdown
                        data={countries}
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
                        }}
                        buttonTextAfterSelection={(selectedItem, _index) => {
                          // text represented after item is selected
                          // if data array is an array of objects then return selectedItem.property to render after item is selected
                          return selectedItem;
                        }}
                        rowTextForSelection={(item, _index) => {
                          // text represented for each item in dropdown
                          // if data array is an array of objects then return item.property to represent item in dropdown
                          return item;
                        }}
                      />
                    </Section>
                    <Section title="Tamagui" description="Test Tamagui UI">
                      <TestTamagui />
                    </Section>
                    <Section title="Final section" description="Final test" />
                  </View>
                </ScrollView>
              </ScrollView>
            </SafeAreaView>
          </ThemeProvider>
        </NativeBaseProvider>
      </TamaguiProvider>
    </>
  );
}

export default App;

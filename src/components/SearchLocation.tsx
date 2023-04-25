import React, {useCallback, useState} from 'react';

import {VStack, View, Text} from 'native-base';
import {NativeBaseProvider} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import debounce from 'lodash.debounce';
import axios from 'axios';
import {GOOGLE_PLACES_API_KEY} from '@env';

import Popper from './popper';

interface Location {
  lat: Number;
  lng: Number;
}

interface Geometry {
  location: Location;
}

interface SuggestLocation {
  name: string;
  formatted_address: string;
  geometry: Geometry;
}

const YOUR_HOME_LOCATION: Location = {lat: 100, lng: 100};
const YOUR_WORK_LOCATION: Location = {lat: 100, lng: 100};
const YOUR_CURRENT_LOCATION: Location = {lat: 100, lng: 100};

// add 3 more items
const additionalItems: SuggestLocation[] = [
  {
    name: 'Home',
    formatted_address: 'Your home address',
    geometry: {
      location: YOUR_HOME_LOCATION,
    },
  },
  {
    name: 'Work',
    formatted_address: 'Your work address',
    geometry: {
      location: YOUR_WORK_LOCATION,
    },
  },
  {
    name: 'Current Location',
    formatted_address: 'Your current location',
    geometry: {
      location: YOUR_CURRENT_LOCATION,
    },
  },
];

const SearchLocation = () => {
  const [suggestions, setSuggestions] = useState<SuggestLocation[] | []>(
    additionalItems,
  );

  const handleSearch = async (keyword: string) => {
    if (keyword && keyword.length > 0) {
      try {
        const encodedSearchText = encodeURIComponent(keyword);
        const uri = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodedSearchText}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${GOOGLE_PLACES_API_KEY}`;
        console.log(uri);
        const response = await axios.get(uri);

        if (response.data && response.data.candidates) {
          const candidates = response.data.candidates;
          setSuggestions([...additionalItems, ...candidates]);
        } else {
          setSuggestions(additionalItems);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(text => handleSearch(text), 1000),
    [],
  );

  const handleSearchTextChange = (text: string) => {
    debouncedSearch(text);
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <VStack
          w="95%"
          space={5}
          alignSelf="center"
          accessibilityLabel="An area for combination components">
          <View />
          <Text>
            Note: There are some problem with this component on Android device.
            I will skip and move to other options.
          </Text>
          <Popper
            handleSearchTextChange={handleSearchTextChange}
            suggestions={suggestions}
          />
        </VStack>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default SearchLocation;

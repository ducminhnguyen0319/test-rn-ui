import React, {useCallback, useState} from 'react';

import {VStack, View} from 'native-base';
import {NativeBaseProvider} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import debounce from 'lodash.debounce';
import axios from 'axios';
import {GOOGLE_PLACES_API_KEY} from '@env';

import Popper from './popper';

const YOUR_HOME_LOCATION = {lat: 100, lng: 100};
const YOUR_WORK_LOCATION = {lat: 100, lng: 100};
const YOUR_CURRENT_LOCATION = {lat: 100, lng: 100};

const SearchLocation = () => {
  const [searchText, setSearchText] = useState('');
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async () => {
    if (searchText && searchText.length > 0) {
      try {
        const encodedSearchText = encodeURIComponent(searchText);
        const uri = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodedSearchText}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${GOOGLE_PLACES_API_KEY}`;
        // console.log(uri);
        const response = await axios.get(uri);

        // add 3 more items
        const additionalItems = [
          {
            name: 'Home',
            formatted_address: 'Your home address',
            geometry: {
              location: {
                lat: YOUR_HOME_LOCATION.lat,
                lng: YOUR_HOME_LOCATION.lng,
              },
            },
          },
          {
            name: 'Work',
            formatted_address: 'Your work address',
            geometry: {
              location: {
                lat: YOUR_WORK_LOCATION.lat,
                lng: YOUR_WORK_LOCATION.lng,
              },
            },
          },
          {
            name: 'Current Location',
            formatted_address: 'Your current location',
            geometry: {
              location: {
                lat: YOUR_CURRENT_LOCATION.lat,
                lng: YOUR_CURRENT_LOCATION.lng,
              },
            },
          },
        ];

        if (response.data && response.data.candidates) {
          const candidates = response.data.candidates;
          setSuggestions([...additionalItems, ...candidates]);
          setIsSuggestionsOpen(true);
        } else {
          setSuggestions(additionalItems);
          setIsSuggestionsOpen(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
      setIsSuggestionsOpen(true);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(handleSearch, 2000), [
    searchText,
  ]);

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    debouncedSearch();
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
          <Popper
            handleSearchTextChange={handleSearchTextChange}
            suggestions={suggestions}
            isSuggestionsOpen={isSuggestionsOpen}
          />
        </VStack>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default SearchLocation;

import React, {useState} from 'react';
import {
  GooglePlaceData,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from '@env';

const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 63.8372135, lng: 23.1434579}},
};

const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 63.8351629, lng: 23.1154922}},
};

const GooglePlacesInput = () => {
  const [debugData, setDebugData] = useState<GooglePlaceData | null>(null);

  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        setDebugData(data);
      }}
      query={{
        key: GOOGLE_PLACES_API_KEY,
      }}
      minLength={3}
      debounce={500}
      autoFillOnNotFound={true}
      enablePoweredByContainer={false}
      predefinedPlaces={[homePlace, workPlace]}
      currentLocation={true}
      currentLocationLabel="Current location"
      styles={{
        textInput: {
          height: 38,
          color: '#5d5d5d',
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
    />
  );
};

export default GooglePlacesInput;

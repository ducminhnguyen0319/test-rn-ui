import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';

const TestSelectDropdown = () => {
  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
  return (
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
  );
};

export default TestSelectDropdown;

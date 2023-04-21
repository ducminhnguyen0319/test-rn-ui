import React from 'react';
import {View} from 'react-native';

import Search from './Search';

// Using rneui
import {createTheme, ThemeProvider} from '@rneui/themed';

const hits = [
  {id: 1, name: 'A'},
  {id: 2, name: 'B'},
  {id: 3, name: 'C'},
];
const theme = createTheme({});

const TestRNE = () => {
  return (
    <ThemeProvider theme={theme}>
      <View>
        <Search
          data={hits}
          onSelect={function (item: {id: number; name: string}): void {
            console.log(item);
          }}
        />
      </View>
    </ThemeProvider>
  );
};

export default TestRNE;

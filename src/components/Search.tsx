import React, {useState} from 'react';

import {FlatList, View} from 'react-native';
import {ListItem} from '@rneui/base';
import {SearchBar} from '@rneui/base';

type SearchProps = {
  data: Array<{id: number; name: string}>;
  onSelect: (item: {id: number; name: string}) => void;
};

const Search: React.FC<SearchProps> = ({data, onSelect}) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Array<{id: number; name: string}>>([]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text) {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <View>
      <SearchBar
        searchIcon={{size: 24}}
        lightTheme
        placeholder="Search..."
        onChangeText={handleSearch}
        value={query}
      />
      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ListItem onPress={() => onSelect(item)}>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
          stickyHeaderIndices={[0]}
        />
      )}
    </View>
  );
};

export default Search;

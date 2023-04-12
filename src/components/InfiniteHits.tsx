import React from 'react';
import {View, FlatList} from 'react-native';

import styles from '../../styles';
import {Text} from '@rneui/base';

type Props = {
  hits: Array<string>;
  hasMore: boolean;
  refineNext: OnRefineDataNext;
};

type OnRefineDataNext = (id: string) => void;

const SeparatorComponent = (): JSX.Element => {
  return <View style={styles.separator} />;
};

const InfiniteHits = ({hits, hasMore, refineNext}: Props) => (
  <FlatList
    data={hits}
    keyExtractor={item => item}
    ItemSeparatorComponent={SeparatorComponent}
    onEndReached={() => hasMore && refineNext('<next page id>')}
    renderItem={({item}) => (
      <View style={{}}>
        <Text>{item}</Text>
      </View>
    )}
  />
);

export default InfiniteHits;

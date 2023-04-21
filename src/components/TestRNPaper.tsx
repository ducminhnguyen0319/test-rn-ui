import React from 'react';
import {View} from 'react-native';
import {
  ActivityIndicator,
  MD2Colors,
  Button,
  Card,
  Avatar,
  IconButton,
} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import {TextInput} from 'react-native-paper';

// RN Paper
import {Provider as PaperProvider} from 'react-native-paper';

import styles from '../../styles';

const TestRNPaper = () => {
  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  return (
    <PaperProvider>
      <View style={styles.sectionContainer}>
        <TextInput
          accessibilityLabel="RN Paper text input, type something"
          mode="outlined"
          label="Outlined input"
          placeholder="Type something"
          right={<TextInput.Affix text="/100" />}
        />
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
        <Button
          accessibilityLabel="React Native Paper button"
          accessibilityHint="Test hint"
          icon="camera"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Press me
        </Button>
        <Card.Title
          accessibilityLabel="RN Paper Card"
          title="Card Title"
          subtitle="Card Subtitle"
          // eslint-disable-next-line react/no-unstable-nested-components
          left={props => <Avatar.Icon {...props} icon="folder" />}
          // eslint-disable-next-line react/no-unstable-nested-components
          right={props => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <Checkbox.Item label="Item" status="checked" />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Dessert</DataTable.Title>
            <DataTable.Title numeric>Calories</DataTable.Title>
            <DataTable.Title numeric>Fat</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>Frozen yogurt</DataTable.Cell>
            <DataTable.Cell numeric>159</DataTable.Cell>
            <DataTable.Cell numeric>6.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Pagination
            page={page}
            numberOfPages={3}
            onPageChange={page => setPage(page)}
            label="1-2 of 6"
            optionsPerPage={optionsPerPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            showFastPagination
            optionsLabel={'Rows per page'}
          />
        </DataTable>
      </View>
    </PaperProvider>
  );
};

export default TestRNPaper;

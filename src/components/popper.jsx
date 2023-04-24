import {useState, useEffect, forwardRef} from 'react';
import {Text, FlatList} from 'react-native';
import {Pressable, Input, Popover, Icon, useDisclose, Box} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Platform} from 'react-native';

const Popper = ({handleSearchTextChange, suggestions, isSuggestionsOpen}) => {
  return (
    <Box w="100%" alignItems="center">
      <Popover
        preventOverflow
        isKeyboardDismissable={false}
        placement="bottom"
        offset={Platform.OS === 'ios' ? -55 : 0}
        trigger={triggerProps => {
          return (
            <Rinput
              handleSearchTextChange={handleSearchTextChange}
              {...triggerProps}
              ref={triggerProps.ref}
            />
          );
        }}>
        <Popover.Content
          accessibilityLabel="Select one item from the list below"
          w="320">
          <Popover.Arrow />
          <Popover.CloseButton />
          <Popover.Header>
            <Text>Suggestion result</Text>
          </Popover.Header>
          <Popover.Body>
            <FlatList
              data={suggestions}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => console.log('Pressed!', item)}
                  p={1}
                  _pressed={{transform: [{scale: 0.99}], bg: '#ccc'}}>
                  <Text>{item.formatted_address}</Text>
                </Pressable>
              )}
            />
          </Popover.Body>
        </Popover.Content>
      </Popover>
    </Box>
  );
};

const Rinput = forwardRef(({handleSearchTextChange, ...triggerProps}, ref) => {
  const [textValue, setTextValue] = useState('');
  const {isOpen, onOpen, onClose} = useDisclose();

  const handleTextChangeInsideComponent = text => {
    setTextValue(text);
    // Test with GG Place API
    handleSearchTextChange(text);
  };

  useEffect(() => {
    if ((isOpen, textValue.length > 0)) {
      if (!triggerProps['aria-expanded']) {
        triggerProps.onPress();
      }
    }
  }, [textValue]);

  return (
    <Input
      ref={ref}
      value={textValue}
      onChangeText={handleTextChangeInsideComponent}
      onFocus={onOpen}
      onBlur={onClose}
      {...triggerProps}
      placeholder="Select a pickup point"
      width="100%"
      borderRadius="4"
      py="3"
      px="1"
      fontSize="14"
      returnKeyType="search"
      clearButtonMode="while-editing"
      InputLeftElement={
        <Icon
          m="2"
          ml="3"
          size="6"
          color="gray.400"
          as={<MaterialIcons name="search" />}
        />
      }
    />
  );
});

export default Popper;

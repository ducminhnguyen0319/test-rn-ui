import {useState, forwardRef, useRef} from 'react';
import {Text, FlatList, Keyboard} from 'react-native';
import {Pressable, Input, Popover, Icon, useDisclose, Box} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Platform} from 'react-native';

const Popper = ({handleSearchTextChange, suggestions}) => {
  const [textValue, setTextValue] = useState('');
  const {isOpen, onOpen, onClose} = useDisclose();

  console.log('isOpen:', isOpen);
  const onFocus = () => {
    if (suggestions && suggestions.length > 0) {
      onOpen();
    }
  };

  return (
    <Box w="100%" alignItems="center">
      <Popover
        preventOverflow
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        useRNModal={false}
        isKeyboardDismissable={false}
        placement="bottom"
        offset={Platform.OS === 'ios' ? -55 : 0}
        trigger={triggerProps => {
          return (
            <Rinput
              handleSearchTextChange={handleSearchTextChange}
              textValue={textValue}
              setTextValue={setTextValue}
              onFocus={onFocus}
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              {...triggerProps}
              ref={triggerProps.ref}
            />
          );
        }}>
        <Popover.Content
          accessibilityLabel="Select one item from the list below"
          w="320"
          maxH="300">
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
                  onPress={() => {
                    console.log('Pressed!', item);
                    setTextValue(item.formatted_address);
                    Keyboard.dismiss();
                    onClose();
                  }}
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

const Rinput = forwardRef(
  (
    {
      handleSearchTextChange,
      textValue,
      setTextValue,
      isOpen,
      onFocus,
      onOpen,
      onClose,
      ...triggerProps
    },
    ref,
  ) => {
    console.log('Rinput:', triggerProps);
    console.log('ref:', ref);

    const handleTextChangeInsideComponent = text => {
      setTextValue(text);
      // Test with GG Place API
      // handleSearchTextChange(text);

      if (text.length > 0) {
        triggerProps.onPress();
      }
    };

    return (
      <Input
        ref={ref}
        value={textValue}
        onChangeText={handleTextChangeInsideComponent}
        onFocus={onFocus}
        {...triggerProps}
        placeholder="Select a pickup point..."
        width="100%"
        borderRadius="4"
        py="3"
        px="1"
        fontSize="14"
        returnKeyType="done"
        contextMenuHidden
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
  },
);

export default Popper;

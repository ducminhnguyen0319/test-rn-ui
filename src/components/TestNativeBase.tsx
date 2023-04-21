import React, {useState} from 'react';

import {
  AspectRatio,
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  Stack,
  Text,
  VStack,
  View,
  Button,
  Checkbox,
  Switch,
  Select,
  CheckIcon,
  ScrollView,
} from 'native-base';

import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeBaseProvider} from 'native-base';

const DropdownControl = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const items = [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
    {label: 'Option 3', value: 'option3'},
  ];

  return (
    <Select
      selectedValue={selectedValue}
      flex={1}
      accessibilityLabel="Choose Service"
      placeholder="Choose Service"
      mt={1}
      _selectedItem={{
        endIcon: <CheckIcon size="5" />,
      }}
      onValueChange={itemValue => setSelectedValue(itemValue)}>
      {items.map(item => (
        <Select.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Select>
  );
};

const DatePickerControl = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const onChange = (_event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <View>
      <Text>selected: {date.toLocaleString()}</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        is24Hour={true}
        onChange={onChange}
      />
    </View>
  );
};

const Example1 = () => {
  return (
    <Box alignItems="center">
      <Box
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: 'violet.400',
            }}
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5">
            PHOTOS
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              The Garden City
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: 'violet.500',
              }}
              _dark={{
                color: 'violet.400',
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              The Silicon Valley of India.
            </Text>
          </Stack>
          <Text fontWeight="400">
            Bengaluru (also called Bangalore) is the center of India's high-tech
            industry. The city is also known for its parks and nightlife.
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400">
                6 mins ago
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

function Example0() {
  return (
    <VStack
      my="4"
      space={5}
      w="100%"
      divider={
        <Box px="2">
          <View h="0.5px" bg="black" />
        </Box>
      }>
      <VStack w="100%" space={5} alignSelf="center">
        <Heading fontSize="lg">Cupertino</Heading>
        <Input
          accessibilityLabel="Search for your pickup point"
          accessibilityHint="Search for your pickup point"
          placeholder="Search for..."
          variant="filled"
          width="100%"
          borderRadius="10"
          py="1"
          px="2"
          InputLeftElement={
            <Icon
              ml="2"
              size="4"
              color="gray.400"
              as={<Ionicons name="ios-search" />}
            />
          }
        />
      </VStack>
      <Button accessibilityLabel="Press here to do something cool">
        Press me!
      </Button>
      <HStack space={5}>
        <Text>Checkbox default on</Text>
        <Checkbox
          accessibilityLabel="A test checkbox default is on"
          value={'aaaa'}
          defaultIsChecked
        />
        <Text>off</Text>
        <Checkbox accessibilityLabel="A normal checkbox" value={'aaaa'} />
        <Switch
          size="sm"
          offTrackColor="orange.100"
          onTrackColor="orange.200"
          accessibilityLabel="A normal switch..."
        />
      </HStack>
      <VStack
        w="100%"
        space={5}
        alignSelf="center"
        accessibilityLabel="An area for combination components">
        <Heading fontSize="lg">Material</Heading>
        <Input
          placeholder="Search People & Places"
          width="100%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="14"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
          InputRightElement={
            <Icon
              m="2"
              mr="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="mic" />}
            />
          }
        />
      </VStack>
      <VStack w="100%" space={5} alignSelf="center">
        <Heading fontSize="lg">Dropdown</Heading>
        <DropdownControl />
      </VStack>
      <VStack w="100%" space={5} alignSelf="center">
        <Heading fontSize="lg">DatePicker</Heading>
        <DatePickerControl />
      </VStack>
      <View />
    </VStack>
  );
}

const TestNativeBase = () => {
  return (
    <NativeBaseProvider>
      <ScrollView style={{padding: 16}}>
        <VStack>
          <Example0 />
          <Example1 />
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default TestNativeBase;

import React from 'react';
// Config Tamagui
import {TamaguiProvider} from 'tamagui';
import appConfig from '../../tamagui.config';

import {useEffect, useState} from 'react';

import {
  Button,
  Paragraph,
  Progress,
  SizeTokens,
  Slider,
  XStack,
  YStack,
  Text,
  TextArea,
  Input,
} from 'tamagui';

function InputsDemo1() {
  return (
    <YStack
      width={200}
      mih={250}
      overflow="hidden"
      space="$2"
      margin="$3"
      padding="$2">
      <InputDemo size="$2" />
      <InputDemo size="$3" />
      <InputDemo size="$4" />
      <TextArea
        minHeight={140}
        placeholder="Enter your details..."
        numberOfLines={4}
      />
    </YStack>
  );
}

function InputDemo(props: {size: SizeTokens}) {
  return (
    <XStack alignItems="center" space="$2">
      <Input flex={1} size={props.size} placeholder={`Size ${props.size}...`} />
      <Button size={props.size}>Go</Button>
    </XStack>
  );
}

const ProgressDemo = () => {
  const [size, setSize] = useState(4);
  const [progress, setProgress] = useState(20);
  const sizeProp = `$${size}` as SizeTokens;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(60), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <YStack alignItems="center" space>
        <Paragraph height={30} opacity={0.5}>
          <Text>Size: {size}</Text>
        </Paragraph>
        <Progress size={sizeProp} value={progress}>
          <Progress.Indicator animation="bouncy" />
        </Progress>
        <XStack
          ai="center"
          space
          position="absolute"
          top="$0"
          left="$0"
          $xxs={{display: 'none'}}>
          <Slider
            size="$2"
            width={130}
            defaultValue={[4]}
            min={2}
            max={6}
            step={1}
            onValueChange={([val]) => {
              setSize(val);
            }}>
            <Slider.Track borderWidth={1} borderColor="$color5">
              <Slider.TrackActive />
            </Slider.Track>
            <Slider.Thumb circular index={0} />
          </Slider>

          <Button
            size="$2"
            onPress={() => setProgress(prev => (prev + 20) % 100)}>
            <Text>Load</Text>
          </Button>
        </XStack>
        <Text>Next control:</Text>
        <InputsDemo1 />
      </YStack>
    </>
  );
};

const TestTamagui = () => {
  return (
    <TamaguiProvider config={appConfig} defaultTheme="light">
      <ProgressDemo />
    </TamaguiProvider>
  );
};

export default TestTamagui;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { cancelAnimation, useAnimatedGestureHandler, useDerivedValue, useSharedValue, withDecay } from 'react-native-reanimated';

import Page from './src/components/Page';
import { PAGE_WIDTH } from './src/constants/dimensions';

const titles = ['hey', 'there', "what's", 'up'];

type ContextType = {
  x: number;
};

const MAX_WIDTH = -(PAGE_WIDTH * (titles.length - 1));

export default function App() {
  const translateX = useSharedValue(0);
  const clampledTranslateXValue = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_WIDTH);
  })

  const handleGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (_, context) => {
      cancelAnimation(translateX);
      context.x = clampledTranslateXValue.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onFinish: event => {
      translateX.value = withDecay({ velocity: event.velocityX });
    }
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <Animated.View style={styles.container}>
          {titles.map((title, index) => (
            <Page key={index.toString()} index={index} title={title} translateX={clampledTranslateXValue} />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
});

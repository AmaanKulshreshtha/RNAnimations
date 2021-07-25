import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Page from './components/Page';

const WORDS = ["What's", 'Up', 'Mobile', 'Devs?'];

export default function App() {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView horizontal onScroll={scrollHandler} scrollEventThrottle={16} showsHorizontalScrollIndicator={false} pagingEnabled>
      {WORDS.map((word, index) => {
        return (
          <View key={index.toString()}>
            <Page index={index} title={word} translateX={translateX} />
          </View>
        );
      })}
    </Animated.ScrollView>
  );
}


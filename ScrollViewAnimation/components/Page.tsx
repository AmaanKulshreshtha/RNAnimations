import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { height, width } from '../constants';

interface PageProps {
  index: number;
  title: string;
  translateX: Animated.SharedValue<number>;
}

const SIZE = width * 0.7;

const Page: React.FC<PageProps> = ({ index: i, title, translateX }) => {
  const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value, inputRange, [0, 1, 0]);
    const borderRadius = interpolate(translateX.value, inputRange, [0, SIZE / 2, 0], Extrapolate.CLAMP);
    return {
      borderRadius,
      transform: [{ scale }]
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, inputRange, [-height / 2, 0, height / 2], Extrapolate.CLAMP);
    // if we use -ve opacity, we can animate the opacity value faster than if we would've used 0
    const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2], Extrapolate.CLAMP);
    return {
      transform: [{ translateY }],
      opacity
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: `rgba(0, 0, 255, 0.${i + 2})` }]}>
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={{ position: 'absolute' }}>
        <Animated.Text style={[styles.text, rTextStyle]}>{title}</Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 255, 0.4)'
  },
  text: {
    fontSize: 70,
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase'
  }
});

export default Page;

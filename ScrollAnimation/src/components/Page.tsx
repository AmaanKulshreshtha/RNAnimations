import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { PAGE_WIDTH } from '../constants/dimensions';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 40,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5
  }
});

interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const Page: React.FC<PageProps> = ({ title, index, translateX }) => {
  const pageOffset = PAGE_WIDTH * index;

  const rStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + pageOffset }]
    };
  });

  return (
    <Animated.View key={index} style={[styles.container, StyleSheet.absoluteFill, { backgroundColor: `rgba(0,0,255,0.${index + 2})` }, rStyles]}>
      <Text style={styles.text}>{title}</Text>
    </Animated.View>
  );
};

export default Page;

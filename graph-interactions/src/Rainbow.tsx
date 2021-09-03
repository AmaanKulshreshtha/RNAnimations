import { StyleSheet, View } from 'react-native';

import Footer from './components/Footer';
import Graph from './Graph';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between'
  }
});

const Rainbow = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Graph />
        <Footer />
      </View>
    </SafeAreaView>
  );
};

export default Rainbow;

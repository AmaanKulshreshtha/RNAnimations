import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';
import React from 'react';

interface ButtonProps {
  icon: string;
  label: string;
}

const width = (Dimensions.get('window').width - 64) / 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 16,
    width: width
  },
  icon: {
    marginRight: 8
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

const Button = ({ icon, label }: ButtonProps) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        {/* @ts-ignore */}
        <Icon color='white' name={icon} size={18} style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Button;

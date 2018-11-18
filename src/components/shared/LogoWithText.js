/* eslint-disable global-require */
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ProductText from './ProductText';

const styles = StyleSheet.create({
  iconContainer: {
    width: 200,
  },
  icon: {
    alignSelf: 'center',
    height: 60,
    width: 60,
    margin: 20,
    borderRadius: 12,
  },
  appName: {
    alignSelf: 'center',
    fontSize: 20,
  },
});

export default function LogoWithText() {
  return (
    <View style={styles.iconContainer}>
      <Image style={styles.icon} source={require('../../../assets/images/icon.png')} />
      <ProductText>TIA | Tree Irrigation APP</ProductText>
    </View>
  );
}

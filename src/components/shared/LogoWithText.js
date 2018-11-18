import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ProductText from './ProductText';

export const LogoWithText = (props) => {
  return (
    <View style={[styles.iconContainer, props.style]}>
      <Image style={styles.icon} source={require('../../../assets/images/icon.png')} />
      <ProductText style={styles.appName}>Tree Irrigation APP</ProductText>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 150,
    borderWidth: 2,
  },
  icon: {
    alignSelf: 'center',

    height: 60,
    width: 60,
    margin: 20,
    borderRadius: 2,
  },
  appName: {
    alignSelf: 'center',
  },
});

export default LogoWithText;

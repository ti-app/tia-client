import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RkButton } from 'react-native-ui-kitten';

import ProductText from './ProductText';

const register = () => (
  <View>
    <ProductText style={styles.text}>Not a member yet?</ProductText>
    <RkButton rkType="outline">Register</RkButton>
  </View>
);

const login = () => (
  <View>
    <ProductText style={styles.text}>Already a member?</ProductText>
    <RkButton rkType="outline">Login</RkButton>
  </View>
);

const OnboardNavigation = (props) => (
  <View style={props.style}>
    {props.linkToRegister && !props.linkToLogin ? register() : null}
    {!props.linkToRegister && props.linkToLogin ? login() : null}
  </View>
);

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
  },
});

export default OnboardNavigation;

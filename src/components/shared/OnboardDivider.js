import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ProductText from './ProductText';

const OnboardDivider = (props) => (
  <View style={[styles.container, props.style]}>
    <View style={[styles.line, styles.left]} />
    <ProductText style={styles.text}>OR</ProductText>
    <View style={[styles.line, styles.right]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  line: {
    flex: 1,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#7e7e7e',
  },
  left: { marginRight: 12 },
  right: { marginLeft: 12 },
});

export default OnboardDivider;

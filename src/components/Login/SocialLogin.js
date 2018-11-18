import React from 'react';
import { StyleSheet, View } from 'react-native';

import { RkButton } from 'react-native-ui-kitten';

export default class SocialLogin extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.button}>
          <RkButton contentStyle={{ fontFamily: 'product-sans' }} rkType="stretch">
            FACEBOOK
          </RkButton>
        </View>
        <View style={styles.button}>
          <RkButton contentStyle={{ fontFamily: 'product-sans' }} rkType="stretch danger">
            GOOGLE
          </RkButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
});

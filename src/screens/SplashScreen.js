import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo';

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#FCE38A', '#42E695']}
          style={{
            position: 'relative',
            left: 0,
            right: 5,
            top: 0,
            height: 1000,
          }}
        >
          // Icon to be added here
          <Text style={styles.contentText}>CREATING A BETTER TOMORROW</Text>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentText: {
    top: '33%',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

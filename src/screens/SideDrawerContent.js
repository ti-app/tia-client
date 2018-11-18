import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';

const styles = StyleSheet.create({
  contentText: {
    top: '33%',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function SideDrawerContent() {
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
        <Text style={styles.contentText}>CREATING A BETTER TOMORROW</Text>
      </LinearGradient>
    </View>
  );
}

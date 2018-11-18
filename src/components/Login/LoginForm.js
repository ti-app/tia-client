/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View } from 'react-native';

import { RkButton } from 'react-native-ui-kitten';
import { Entypo } from '@expo/vector-icons';

import FormInput from '../shared/FormInput';
import ProductText from '../shared/ProductText';

export default function LoginForm({ style }) {
  return (
    <View style={style}>
      <FormInput
        icon={<Entypo name="user" />}
        placeholder="Email Address"
        textContentType="emailAddress"
      />
      <FormInput
        icon={<Entypo name="lock" />}
        placeholder="Password"
        textContentType="password"
        secureTextEntry
      />
      <View>
        <ProductText>Forgot Password?</ProductText>
      </View>
      <View>
        <RkButton rkType="stretch success" contentStyle={{ fontFamily: 'product-sans' }}>
          LOGIN
        </RkButton>
      </View>
    </View>
  );
}

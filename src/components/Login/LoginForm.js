import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { RkButton } from 'react-native-ui-kitten';
import { Entypo } from '@expo/vector-icons';

import FormInput from '../shared/FormInput';
import ProductText from '../shared/ProductText';

export default class LoginForm extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <FormInput
          icon={<Entypo name="user" />}
          placeholder="Email Address"
          textContentType="emailAddress"
        />
        <FormInput
          icon={<Entypo name="lock" />}
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ResetPassword')}>
          <ProductText>Forgot Password?</ProductText>
        </TouchableOpacity>
        <View>
          <RkButton rkType="stretch success" contentStyle={{ fontFamily: 'product-sans' }}>
            LOGIN
          </RkButton>
        </View>
      </View>
    );
  }
}

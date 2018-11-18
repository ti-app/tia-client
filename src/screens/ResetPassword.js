import React from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import FormInput from '../components/shared/FormInput';
import LogoWithText from '../components/shared/LogoWithText';

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Email Address' };
  }

  onResetPasswordPress() {
    console.log('Reset Password clicked!');
  }

  render() {
    return (
      <View>
        <LogoWithText />
        <View>
          <FormInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          <Button onPress={this.onResetPasswordPress} title="SEND PASSWORD RESET LINK" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({ formContainer: {} });

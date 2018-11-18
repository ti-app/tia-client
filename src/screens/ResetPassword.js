import React from 'react';
import { StyleSheet, View } from 'react-native';
import LogoWithText from '../components/shared/LogoWithText';
import ResetPasswordForm from '../components/ResetPassword/ResetPasswordForm';

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
        <View style={styles.formContainer}>
          <ResetPasswordForm />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  formContainer: {},
});

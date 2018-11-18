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
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <LogoWithText />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <ResetPasswordForm />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 60,
    alignSelf: 'center',
  },
  formContainer: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  form: {},
});

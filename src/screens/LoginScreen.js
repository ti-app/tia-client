import React from 'react';
import { StyleSheet, View } from 'react-native';

import LogoWithText from '../components/shared/LogoWithText';
import LoginForm from '../components/Login/LoginForm';
import SocialLogin from '../components/Login/SocialLogin';
import OnboardNavigation from '../components/shared/OnboardNavigation';
import OnboardDivider from '../components/shared/OnboardDivider';

import { white } from '../styles/colors';
import { space } from '../styles/variables';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <LogoWithText style={styles.icon} />
          <LoginForm {...this.props} style={styles.form} />
          <OnboardDivider style={styles.divider} />
          <SocialLogin style={styles.social} />
          <OnboardNavigation style={styles.onboard} linkToRegister />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
    paddingLeft: space.base,
    paddingRight: space.base,
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: space.xl,
  },
  form: {
    marginBottom: space.base,
  },
  divider: {
    marginBottom: space.base,
  },
  social: {
    marginBottom: space.base,
  },
  onboard: {
    alignSelf: 'center',
  },
});

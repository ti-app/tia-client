import React from 'react';

import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';

import AppNavigator from './src/navigation/AppNavigator';
import loadResourcesAsync from './src/utils/LoadResources';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    showIntroduction: true,
  };

  async componentWillMount() {
    const launchStatus = await this.getLaunchStatus();
    console.log(launchStatus);
    this.setState({ showIntroduction: launchStatus === 'INITIAL' });
  }

  onIntroductionDone = async () => {
    this.setState({ showIntroduction: false });
    try {
      await AsyncStorage.setItem('LAUNCH_STATUS', 'NOT_INITIAL');
    } catch (error) {
      console.log(error);
    }
  };

  getLaunchStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('LAUNCH_STATUS');

      return value ? value : 'INITIAL';
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.showIntroduction) {
      return <AppIntroSlider slides={slides} onDone={this.onIntroductionDone} />;
    }

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  introImage: {
    width: 320,
    height: 320,
  },
});

const slides = [
  {
    key: 'intro_1',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('./assets/images/tia_intro_1.png'),
    imageStyle: styles.introImage,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'intro_2',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('./assets/images/tia_intro_1.png'),
    imageStyle: styles.introImage,
    backgroundColor: '#febe29',
  },
  {
    key: 'intro_3',
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('./assets/images/tia_intro_1.png'),
    imageStyle: styles.introImage,
    backgroundColor: '#22bcb5',
  },
];

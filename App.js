import React from 'react';
import { Location, Permissions } from 'expo';

import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { StyleProvider } from 'native-base';
import { AppLoading } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Provider } from 'react-redux';
import store from './src/store';

import AppNavigator from './src/navigation/AppNavigator';
import MainTabNavigator from './src/navigation/MainNavigator';
import loadResourcesAsync from './src/utils/LoadResources';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import firebaseConfig from './src/config/auth/FirebaseConfig.example';
import * as firebase from 'firebase';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoadingComplete: false,
			showIntroduction: false,
			isAuthenticationReady: false,
			isAuthenticated: false,
		};

		// Initialize firebase...
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
	}

	onAuthStateChanged = (user) => {
		this.setState({ isAuthenticationReady: true });
		this.setState({ isAuthenticated: !!user });
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
				<Provider store={store}>
					<StyleProvider style={getTheme(material)}>
						<View style={styles.container}>
							{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
							{this.state.isAuthenticated ? <MainTabNavigator /> : <AppNavigator />}
						</View>
					</StyleProvider>
				</Provider>
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

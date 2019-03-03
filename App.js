import React from 'react';

import { StyleSheet, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';
import { StyleProvider, Root } from 'native-base';
import { Provider } from 'react-redux';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import store from './src/store';
import AppContent from './src';
import loadResourcesAsync from './src/utils/LoadResources';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoadingComplete: false,
			showIntroduction: false,
		};
	}

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
			return value || 'INITIAL';
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	render() {
		const { showIntroduction, isLoadingComplete } = this.state;
		const { skipLoadingScreen } = this.props;
		if (showIntroduction) {
			return <AppIntroSlider slides={slides} onDone={this.onIntroductionDone} />;
		}

		if (!isLoadingComplete && !skipLoadingScreen) {
			return (
				<AppLoading
					startAsync={loadResourcesAsync}
					onError={this._handleLoadingError}
					onFinish={this._handleFinishLoading}
				/>
			);
		}

		return (
			<Root>
				<Provider store={store}>
					<StyleProvider style={getTheme(material)}>
						<AppContent />
					</StyleProvider>
				</Provider>
			</Root>
		);
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
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		opacity: 0.5,
		backgroundColor: 'black',
		zIndex: 99,
	},
});

/* eslint-disable */
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
/* eslint-enable */

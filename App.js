import React from 'react';

import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { StyleProvider } from 'native-base';
import { AppLoading } from 'expo';

import AppNavigator from './src/navigation/AppNavigator';
import loadResourcesAsync from './src/utils/LoadResources';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

export default class App extends React.Component {
	state = {
		isLoadingComplete: false,
	};

	render() {
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
				<StyleProvider style={getTheme(material)}>
					<View style={styles.container}>
						{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
						<AppNavigator />
					</View>
				</StyleProvider>
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

import React from 'react';

import {
	Platform,
	StatusBar,
	StyleSheet,
	View,
	AsyncStorage,
	ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import MainTabNavigator from './navigation/MainNavigator';

import firebaseConfig from './config/auth/FirebaseConfig.example';
import * as firebase from 'firebase';

class AppContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticationReady: false,
			isAuthenticated: false,
		};

		// Initialize firebase...
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
	}

	onAuthStateChanged = async (user) => {
		this.setState({ isAuthenticationReady: true });
		this.setState({ isAuthenticated: !!user });
		await AsyncStorage.setItem('USER', JSON.stringify(user));
	};

	render() {
		const { loading } = this.props;
		const { isAuthenticated } = this.state;
		return (
			<View style={styles.container}>
				{loading ? (
					<View style={styles.loading}>
						<ActivityIndicator size="large" color="#0000ff" />
					</View>
				) : null}
				{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
				{isAuthenticated ? <MainTabNavigator /> : <AppNavigator />}
			</View>
		);
	}
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

const mapStateToProps = (state) => ({
	loading: state.ui.loading,
});

export default connect(mapStateToProps)(AppContent);

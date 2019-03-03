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
import * as firebase from 'firebase';

import AppNavigator from './navigation/AppNavigator';
import MainTabNavigator from './navigation/MainNavigator';
import firebaseConfig from './config/auth/FirebaseConfig.example';
import { setLoading } from './store/actions/ui-interactions.action';
import apiClient from './utils/ApiClient';
import { updateUserStatus } from './store/actions/auth.action';

class AppContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
		};
	}

	componentWillMount() {
		const { setLoading } = this.props;
		apiClient.interceptors.request.use(
			(config) => {
				setLoading(true);
				return config;
			},
			(error) => Promise.reject(error)
		);
		apiClient.interceptors.response.use(
			(response) => {
				setLoading(false);
				return response;
			},
			(error) => Promise.reject(error)
		);

		setLoading(true);
		// Initialize firebase...
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
	}

	onAuthStateChanged = async (user) => {
		const { setLoading, updateUser } = this.props;
		this.setState({ isAuthenticated: !!user });
		console.log('initial on authstate changed observalble use', user);
		updateUser(!!user, user);
		await AsyncStorage.setItem('USER', JSON.stringify(user));
		setLoading(false);
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

const mapDispatchToProps = (dispatch) => ({
	setLoading: (flag) => dispatch(setLoading(flag)),
	updateUser: (isLoggedIn, user) => dispatch(updateUserStatus(isLoggedIn, user)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppContent);

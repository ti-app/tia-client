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
import axios from 'axios';

import AppNavigator from './navigation/AppNavigator';
import MainTabNavigator from './navigation/MainNavigator';
import firebaseConfig from './config/auth/FirebaseConfig.example';
import { setLoading } from './store/actions/ui-interactions.action';
import { updateUserStatus } from './store/actions/auth.action';

class AppContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
		};
	}

	componentWillMount() {
		setLoading(true);
		// Initialize firebase...
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
	}

	componentDidMount() {
		// const { setLoading, user } = this.props;
		// if (!user || !user.stsTokenManager) {
		//   return;
		// }
		// const xIdToken = user.stsTokenManager.accessToken;
	}

	onAuthStateChanged = async (user) => {
		const { setLoading, updateUser } = this.props;
		this.setState({ isAuthenticated: !!user });
		updateUser(!!user, user);
		await AsyncStorage.setItem('USER', JSON.stringify(user));
		setLoading(false);

		if (user) {
			const { accessToken } = JSON.parse(JSON.stringify(user)).stsTokenManager;
			axios.interceptors.request.use(
				(config) => {
					setLoading(true);
					const { headers, ...rest } = config;
					return {
						headers: {
							'x-id-token': accessToken,
							...headers,
						},
						...rest,
					};
				},
				(error) => Promise.reject(error)
			);
			axios.interceptors.response.use(
				(response) => {
					setLoading(false);
					return response;
				},
				(error) => Promise.reject(error)
			);
		}
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
	user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
	setLoading: (flag) => dispatch(setLoading(flag)),
	updateUser: (isLoggedIn, user) => dispatch(updateUserStatus(isLoggedIn, user)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppContent);

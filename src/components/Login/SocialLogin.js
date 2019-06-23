import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Google, Facebook } from 'expo';

import ProductButton from '../shared/ProductButton';
import { setLoading } from '../../store/actions/ui-interactions.action';
import { updateUserStatus } from '../../store/actions/auth.action';

import {
	GOOGLE_CLIENTID_ANDROID_STANDALONE,
	GOOGLE_CLIENTID_ANDROID_EXPO,
	GOOGLE_CLIENTID_IOS_EXPO,
	WEB_CLIENT_ID,
	FB_APP_ID,
} from 'react-native-dotenv';

class SocialLogin extends React.Component {
	isUserEqual = (googleUser, firebaseUser) => {
		if (firebaseUser) {
			const { providerData } = firebaseUser;
			for (let i = 0; i < providerData.length; i += 1) {
				if (
					providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
					providerData[i].uid === googleUser.getBasicProfile().getId()
				) {
					// We don't need to reauth the Firebase connection.
					return true;
				}
			}
		}
		return false;
	};

	onSignIn = async (googleUser) => {
		// Build Firebase credential with the Google ID token.
		const credential = firebase.auth.GoogleAuthProvider.credential(
			googleUser.idToken,
			googleUser.accessToken
		);
		// Sign in with credential from the Google user.
		firebase
			.auth()
			.signInAndRetrieveDataWithCredential(credential)
			.then(async (result) => {
				console.log('user registered!', result);
			})
			.catch((error) => {
				console.log('error while signing!', error);
			});
	};

	signInWithFBAsync = async () => {
		setLoading(true);
		const options = {
			permission: ['public_profile'],
		};
		const { type, token } = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, options);

		if (type === 'success') {
			setLoading(true);
			const credential = firebase.auth.FacebookAuthProvider.credential(token);
			firebase
				.auth()
				.signInAndRetrieveDataWithCredential(credential)
				.then((response) => {
					setLoading(false);
					console.log('FB Login successfully ', response);
				})
				.catch((error) => {
					setLoading(false);
					console.log('FB Login error', error);
				});
		} else {
			setLoading(false);
		}
	};

	signInWithGoogleAsync = async () => {
		const { setLoading, navigation } = this.props;

		try {
			setLoading(true);
			const result = await Google.logInAsync({
				behavior: 'web',
				androidClientId:
					Expo.Constants.appOwnership === 'standalone'
						? GOOGLE_CLIENTID_ANDROID_STANDALONE
						: GOOGLE_CLIENTID_ANDROID_EXPO,
				iosClientId: GOOGLE_CLIENTID_IOS_EXPO,
				androidStandaloneAppClientId: GOOGLE_CLIENTID_ANDROID_STANDALONE,
				iosStandaloneAppClientId: GOOGLE_CLIENTID_ANDROID_STANDALONE,
				webClientId: WEB_CLIENT_ID,
				scopes: ['profile', 'email'],
			});

			if (result.type === 'success') {
				await this.onSignIn(result);
				navigation.navigate('Home');
				setLoading(false);
				return result.accessToken;
			}
			setLoading(false);
			console.log('sign in with google canceled by user');
			return { cancelled: true };
		} catch (e) {
			setLoading(false);
			console.log('Error while siging in google', e);
			return { error: true };
		}
	};

	render() {
		const { style } = this.props;
		return (
			<View style={[styles.container, style]}>
				<View style={styles.button}>
					<ProductButton
						full
						style={styles.facebookButton}
						onPress={() => this.signInWithFBAsync()}
					>
						FACEBOOK
					</ProductButton>
				</View>
				<View style={styles.button}>
					<ProductButton
						full
						style={styles.googleButton}
						onPress={() => this.signInWithGoogleAsync()}
					>
						GOOGLE
					</ProductButton>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
	},
	button: {
		flex: 1,
	},
	facebookButton: {
		backgroundColor: '#3C5A99',
	},
	googleButton: {
		backgroundColor: '#BD4A39',
	},
});

const mapDispatchToProps = (dispatch) => ({
	setLoading: (flag) => dispatch(setLoading(flag)),
	updateUser: (isLoggedIn, user) => dispatch(updateUserStatus(isLoggedIn, user)),
});

export default connect(
	null,
	mapDispatchToProps
)(SocialLogin);

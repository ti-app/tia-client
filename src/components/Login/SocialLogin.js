import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Google, Facebook } from 'expo';

import ProductButton from '../shared/ProductButton';
import { setLoading } from '../../store/actions/ui-interactions.action';
import { updateUserStatus } from '../../store/actions/auth.action';

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
				console.log('user registered in firebase', result);
			})
			.catch((error) => {
				console.log('error while singing with firebase', error);
			});
	};

	signInWithFBAsync = async () => {
		setLoading(true);
		const FBAPPID = '2439803646062305';
		const options = {
			permission: ['public_profile'],
		};
		const { type, token } = await Facebook.logInWithReadPermissionsAsync(FBAPPID, options);

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
				androidClientId: '67755937701-gkp25qm93ou22ggejl7iu0faj0m0o58k.apps.googleusercontent.com',
				iosClientId: '67755937701-tcogrlq8kf6ht00k57qt225hta46lt5t.apps.googleusercontent.com',
				clientId: '67755937701-gkp25qm93ou22ggejl7iu0faj0m0o58k.apps.googleusercontent.com',
				androidStandaloneAppClientId:
					'67755937701-bh1enrj7rlg0s5hi131qsf4emo76vi3t.apps.googleusercontent.com',
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

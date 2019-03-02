import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import ProductButton from '../shared/ProductButton';
import * as firebase from 'firebase';
import { Google } from 'expo';

export default class SocialLogin extends React.Component {
	isUserEqual = (googleUser, firebaseUser) => {
		if (firebaseUser) {
			var providerData = firebaseUser.providerData;
			for (var i = 0; i < providerData.length; i++) {
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
		console.log('Google Auth Response', googleUser);
		console.log('navigate', this.props.navigation);
		this.props.navigation.navigate('Home');
		await AsyncStorage.setItem('USER', JSON.stringify(googleUser));
		// We need to register an Observer on Firebase Auth to make sure auth is initialized.
		var unsubscribe = firebase.auth().onAuthStateChanged(
			function(firebaseUser) {
				unsubscribe();
				// Check if we are already signed-in Firebase with the correct user.
				if (!this.isUserEqual(googleUser, firebaseUser)) {
					// Build Firebase credential with the Google ID token.
					var credential = firebase.auth.GoogleAuthProvider.credential(
						googleUser.idToken,
						googleUser.accessToken
					);
					// Sign in with credential from the Google user.
					firebase
						.auth()
						.signInAndRetrieveDataWithCredential(credential)
						.then(function(result) {
							console.log('user signed in ');
							if (result.additionalUserInfo.isNewUser) {
								firebase
									.database()
									.ref('/users/' + result.user.uid)
									.set({
										gmail: result.user.email,
										profile_picture: result.additionalUserInfo.profile.picture,
										first_name: result.additionalUserInfo.profile.given_name,
										last_name: result.additionalUserInfo.profile.family_name,
										created_at: Date.now(),
									})
									.then(function(snapshot) {
										// console.log('Snapshot', snapshot);
									});
							} else {
								firebase
									.database()
									.ref('/users/' + result.user.uid)
									.update({
										last_logged_in: Date.now(),
									});
							}
						})
						.catch(function(error) {
							// Handle Errors here.
							var errorCode = error.code;
							var errorMessage = error.message;
							// The email of the user's account used.
							var email = error.email;
							// The firebase.auth.AuthCredential type that was used.
							var credential = error.credential;
							// ...
						});
				} else {
					console.log('User already signed-in Firebase.');
				}
			}.bind(this)
		);
	};
	signInWithGoogleAsync = async () => {
		try {
			const result = await Google.logInAsync({
				androidClientId: '67755937701-gkp25qm93ou22ggejl7iu0faj0m0o58k.apps.googleusercontent.com',
				behavior: 'web',
				iosClientId: '67755937701-tcogrlq8kf6ht00k57qt225hta46lt5t.apps.googleusercontent.com', //enter ios client id
				scopes: ['profile', 'email'],
			});

			if (result.type === 'success') {
				this.onSignIn(result);
				return result.accessToken;
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			return { error: true };
		}
	};
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				<View style={styles.button}>
					<ProductButton full style={styles.facebookButton}>
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

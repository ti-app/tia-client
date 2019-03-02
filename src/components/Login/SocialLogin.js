import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProductButton from '../shared/ProductButton';

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
	onSignIn = (googleUser) => {
		console.log('Google Auth Response', googleUser);
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
			const result = await Expo.Google.logInAsync({
				// androidClientId: YOUR_CLIENT_ID_HERE,
				behavior: 'web',
				iosClientId: '67755937701-9s7v4gstbkiavag2n9uko4nncj37j0hg.apps.googleusercontent.com', //enter ios client id
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

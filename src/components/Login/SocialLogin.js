import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import ProductButton from '../shared/ProductButton';
import * as firebase from 'firebase';
import { setLoading } from '../../store/actions/ui-interactions';

class SocialLogin extends React.Component {
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
		await AsyncStorage.setItem('USER', JSON.stringify(googleUser));
		// We need to register an Observer on Firebase Auth to make sure auth is initialized.
		const unsubscribe = firebase.auth().onAuthStateChanged(
			function(firebaseUser) {
				unsubscribe();
				// Check if we are already signed-in Firebase with the correct user.
				if (!this.isUserEqual(googleUser, firebaseUser)) {
					// Build Firebase credential with the Google ID token.
					const credential = firebase.auth.GoogleAuthProvider.credential(
						googleUser.idToken,
						googleUser.accessToken
					);
					// Sign in with credential from the Google user.
					firebase
						.auth()
						.signInAndRetrieveDataWithCredential(credential)
						.then(function(result) {
							console.log('user signed in ');
						})
						.catch(function(error) {
							console.log('error while singing with firebase', error);
						});
				} else {
					console.log('User already signed-in Firebase.');
				}
			}.bind(this)
		);
	};

	signInWithGoogleAsync = async () => {
		try {
			this.props.setLoading(true);
			const result = await Expo.Google.logInAsync({
				// androidClientId: YOUR_CLIENT_ID_HERE,
				behavior: 'web',
				clientId: '67755937701-tcogrlq8kf6ht00k57qt225hta46lt5t.apps.googleusercontent.com', //enter ios client id
				scopes: ['profile', 'email'],
			});

			if (result.type === 'success') {
				await this.onSignIn(result);
				this.props.navigation.navigate('Home');
				this.props.setLoading(false);
				return result.accessToken;
			} else {
				this.props.setLoading(false);
				return { cancelled: true };
			}
		} catch (e) {
			this.props.setLoading(false);
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

const mapDispatchToProps = (dispatch) => ({
	setLoading: (flag) => dispatch(setLoading(flag)),
});

export default connect(
	null,
	mapDispatchToProps
)(SocialLogin);

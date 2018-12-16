import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Container } from 'native-base';

import LogoWithText from '../components/shared/LogoWithText';
import ResetPasswordForm from '../components/ResetPassword/ResetPasswordForm';

export default class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = { text: 'Email Address', isKeyboardOpen: false };
	}

	componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			this._keyboardDidShow.bind(this)
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this._keyboardDidHide.bind(this)
		);
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	_keyboardDidShow() {
		this.setState({ isKeyboardOpen: true });
	}

	_keyboardDidHide() {
		this.setState({ isKeyboardOpen: false });
	}

	onResetPasswordPress() {
		console.log('Reset Password clicked!');
	}

	render() {
		return (
			<Container style={styles.container}>
				<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
					<View style={[styles.iconContainer, this.state.isKeyboardOpen ? styles.hide : null]}>
						<LogoWithText />
					</View>
					<View style={styles.formContainer}>
						<View style={styles.form}>
							<ResetPasswordForm />
						</View>
					</View>
				</KeyboardAvoidingView>
			</Container>
		);
	}
}
const styles = StyleSheet.create({
	iconContainer: {
		marginTop: 60,
		alignSelf: 'center',
	},
	hide: {
		display: 'none',
	},
	formContainer: {
		height: 400,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	form: {},
});

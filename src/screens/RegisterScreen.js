import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Container } from 'native-base';

import LogoWithText from '../components/shared/LogoWithText';
import RegisterForm from '../components/Register/RegisterForm';
import SocialLogin from '../components/Login/SocialLogin';
import { space } from '../styles/variables';
import OnboardDivider from '../components/shared/OnboardDivider';
import OnboardNavigation from '../components/shared/OnboardNavigation';

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isKeyboardOpen: false };
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

	render() {
		return (
			<Container style={styles.container}>
				<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
					<View style={[styles.iconContainer, this.state.isKeyboardOpen ? styles.hide : null]}>
						<LogoWithText />
					</View>
					<View style={styles.formContainer}>
						<View style={styles.registerForm}>
							<RegisterForm {...this.props} />
						</View>
						<OnboardDivider style={styles.divider} />
						<View style={styles.socialRegister}>
							<SocialLogin {...this.props} />
						</View>
						<OnboardNavigation {...this.props} style={styles.onboard} linkToLogin />
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
	divider: {
		marginBottom: space.base,
	},
	formContainer: {
		height: 400,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: space.base,
		paddingRight: space.base,
	},
	registerForm: {
		marginBottom: space.base,
	},
	socialRegister: {
		marginBottom: space.base,
	},
	onboard: {
		alignSelf: 'center',
	},
});

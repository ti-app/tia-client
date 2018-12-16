import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Content, Container } from 'native-base';

import LogoWithText from '../components/shared/LogoWithText';
import LoginForm from '../components/Login/LoginForm';
import SocialLogin from '../components/Login/SocialLogin';
import OnboardNavigation from '../components/shared/OnboardNavigation';
import OnboardDivider from '../components/shared/OnboardDivider';

import { white } from '../styles/colors';
import { space } from '../styles/variables';

export default class LoginScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {
			isKeyboardOpen: false,
		};
	}

	render() {
		return (
			<Container style={styles.container}>
				<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
					<Content contentContainerStyle={styles.content}>
						<LogoWithText style={[styles.icon, this.state.isKeyboardOpen ? styles.hide : null]} />
						<LoginForm {...this.props} style={styles.form} />
						<OnboardDivider style={styles.divider} />
						<SocialLogin style={styles.social} />
						<OnboardNavigation style={styles.onboard} linkToRegister />
					</Content>
				</KeyboardAvoidingView>
			</Container>
		);
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
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: white,
		paddingLeft: space.base,
		paddingRight: space.base,
	},
	content: {
		flex: 1,
		justifyContent: 'center',
	},
	icon: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: space.xl,
	},
	hide: {
		display: 'none',
	},
	form: {
		marginBottom: space.base,
	},
	divider: {
		marginBottom: space.base,
	},
	social: {
		marginBottom: space.base,
	},
	onboard: {
		alignSelf: 'center',
	},
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
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
	render() {
		return (
			<Container style={styles.container}>
				<Content contentContainerStyle={styles.content}>
					<LogoWithText style={styles.icon} />
					<LoginForm style={styles.form} />
					<OnboardDivider style={styles.divider} />
					<SocialLogin style={styles.social} />
					<OnboardNavigation style={styles.onboard} linkToRegister />
				</Content>
			</Container>
		);
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

import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import ProductText from './ProductText';
import ProductButton from './ProductButton';

const register = ({ navigation }) => (
	// FIXME: Change 'ResetPassword' to 'Register' after Register screen implemented.
	<TouchableOpacity onPress={() => navigation.navigate('Register')}>
		<ProductText style={styles.text}>Not a member yet?</ProductText>
		<ProductButton full transparent success>
			Register
		</ProductButton>
	</TouchableOpacity>
);

const login = ({ navigation }) => (
	<TouchableOpacity onPress={() => navigation.navigate('Login')}>
		<ProductText style={styles.text}>Already a member?</ProductText>
		<ProductButton full transparent success>
			Login
		</ProductButton>
	</TouchableOpacity>
);

const OnboardNavigation = (props) => (
	<View style={props.style}>
		{props.linkToRegister && !props.linkToLogin ? register(props) : null}
		{!props.linkToRegister && props.linkToLogin ? login(props) : null}
	</View>
);

const styles = StyleSheet.create({
	text: {
		alignSelf: 'center',
	},
});

export default OnboardNavigation;

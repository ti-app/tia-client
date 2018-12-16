import React from 'react';
import { StyleSheet, View } from 'react-native';

import ProductText from './ProductText';
import ProductButton from './ProductButton';

const register = () => (
	<View>
		<ProductText style={styles.text}>Not a member yet?</ProductText>
		<ProductButton full transparent success>
			Register
		</ProductButton>
	</View>
);

const login = () => (
	<View>
		<ProductText style={styles.text}>Already a member?</ProductText>
		<ProductButton full transparent success>
			Login
		</ProductButton>
	</View>
);

const OnboardNavigation = (props) => (
	<View style={props.style}>
		{props.linkToRegister && !props.linkToLogin ? register() : null}
		{!props.linkToRegister && props.linkToLogin ? login() : null}
	</View>
);

const styles = StyleSheet.create({
	text: {
		alignSelf: 'center',
	},
});

export default OnboardNavigation;

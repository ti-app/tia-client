import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

// import { RkButton } from 'react-native-ui-kitten';
import { Entypo } from '@expo/vector-icons';

import FormInput from '../shared/FormInput';

import { space } from '../../styles/variables';
import ProductButton from '../shared/ProductButton';

export default class ResetPasswordForm extends React.Component {
	onResetClick() {
		console.log('Reset password clicked');
	}

	render() {
		return (
			<View style={styles.container}>
				<FormInput
					icon={<Entypo name="user" />}
					placeholder="Email Address"
					textContentType="emailAddress"
				/>
				<ProductButton full success onPress={this.onResetClick}>
					SEND PASSWORD RESET LINK
				</ProductButton>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: space.base,
		paddingRight: space.base,
	},
});

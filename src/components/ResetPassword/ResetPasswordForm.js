import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

// import { RkButton } from 'react-native-ui-kitten';
import { Entypo } from '@expo/vector-icons';

import FormInput from '../shared/FormInput';

import { space } from '../../styles/variables';
import ProductButton from '../shared/ProductButton';

export default class ResetPasswordForm extends React.Component {
	state = {
		email: '',
	};

	onEmailChange = (email) => {
		this.setState({
			email,
		});
	};

	onResetClick() {
		const { email } = this.state;
		const auth = firebase.auth();

		auth
			.sendPasswordResetEmail(email)
			.then(function() {
				Toast.show({
					text: `Email has been sent! `,
					buttonText: 'Okay',
					type: 'success',
				});
			})
			.catch(function(error) {
				Toast.show({
					text: `Issue while reseting password`,
					buttonText: 'Okay',
					type: 'error',
				});
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<FormInput
					icon={<Entypo name="user" />}
					placeholder="Email Address"
					textContentType="emailAddress"
					onChangeText={this.onEmailChange}
				/>{' '}
				<ProductButton full success onPress={this.onResetClick}>
					SEND PASSWORD RESET LINK{' '}
				</ProductButton>{' '}
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

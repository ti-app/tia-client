import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import FormInput from '../shared/FormInput';
import { space } from '../../styles/variables';
import ProductButton from '../shared/ProductButton';
import { Toast } from 'native-base';
import * as firebase from 'firebase';

export default class ResetPasswordForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
		};
	}

	onEmailChange = (email) => {
		this.setState({ email });
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
			.catch(function() {
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
					onChangeText={this.onEmailChange.bind(this)}
				/>
				<ProductButton full success onPress={this.onResetClick.bind(this)}>
					<Text>SEND PASSWORD RESET LINK</Text>
				</ProductButton>
				<Toast ref="toast" />
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

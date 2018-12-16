import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { Entypo, EvilIcons, AntDesign } from '@expo/vector-icons';

import FormInput from '../shared/FormInput';

import ProductButton from '../shared/ProductButton';

export default class RegisterPasswordForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPassword: false,
			email: '',
			password: '',
			location: '',
		};
	}

	onEmailChange(email) {
		this.setState({ email });
	}

	onPasswordChange(password) {
		this.setState({ password });
	}

	onLocationChange(location) {
		this.setState({ location });
	}

	onRegisterClick() {
		console.log('register clicked');
	}

	onTogglePasswordVisiblity() {
		this.setState((prevState) => {
			this.setState({ ...prevState, showPassword: !prevState.showPassword });
		});
	}

	render() {
		const { showPassword } = this.state;
		return (
			<View style={styles.container}>
				<FormInput
					icon={<AntDesign name="user" />}
					placeholder="Email Address"
					textContentType="emailAddress"
					onChangeText={this.onEmailChange.bind(this)}
				/>
				<FormInput
					icon={<Entypo name="lock" />}
					secondaryIcon={
						showPassword ? <AntDesign size={15} name="eye" /> : <AntDesign size={15} name="eyeo" />
					}
					placeholder="Passsword"
					textContentType="password"
					secureTextEntry={!showPassword}
					onChangeText={this.onPasswordChange.bind(this)}
					secondaryIconPress={this.onTogglePasswordVisiblity.bind(this)}
				/>
				<FormInput
					icon={<EvilIcons name="location" />}
					placeholder="Location"
					textContentType="location"
					onChangeText={this.onLocationChange.bind(this)}
				/>
				<ProductButton full success onPress={this.onRegisterClick.bind(this)}>
					REGISTER
				</ProductButton>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
});

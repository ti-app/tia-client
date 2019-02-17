import React from 'react';
import { View, TouchableOpacity, AsyncStorage } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import ProductButton from '../shared/ProductButton';
import FormInput from '../shared/FormInput';
import ProductText from '../shared/ProductText';

import * as firebase from 'firebase';

export default class LoginForm extends React.Component {
	state = {
		email: '',
		password: '',
	};

	onEmailChange(email) {
		this.setState({ email });
	}

	onPasswordChange(password) {
		this.setState({ password });
	}

	onLoginClick() {
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(
				async (resp) => {
					try {
						this.props.navigation.navigate('Home');
						this.state = {
							email: '',
							password: '',
						};
						await AsyncStorage.setItem('USER', resp);
					} catch (error) {
						console.log(error);
					}
				},
				(error) => {
					console.log(error.message);
				}
			);
	}

	render() {
		return (
			<View style={this.props.style}>
				<FormInput
					icon={<Entypo name="user" />}
					placeholder="Email Address"
					textContentType="emailAddress"
					onChangeText={this.onEmailChange.bind(this)}
				/>
				<FormInput
					icon={<Entypo name="lock" />}
					placeholder="Password"
					textContentType="password"
					onChangeText={this.onPasswordChange.bind(this)}
					secureTextEntry={true}
				/>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('ResetPassword')}>
					<ProductText>Forgot Password?</ProductText>
				</TouchableOpacity>
				<View>
					<ProductButton full success onPress={this.onLoginClick.bind(this)}>
						LOGIN
					</ProductButton>
				</View>
			</View>
		);
	}
}

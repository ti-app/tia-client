import React from 'react';
import { View, TouchableOpacity, AsyncStorage } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { Toast } from 'native-base';
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

	onLoginClick = async () => {
		console.log(this.state.email, this.state.password, 'Login Click');
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(async (firebaseUser) => {
				try {
					Toast.show({
						text: `Welcome! Successfully logged in`,
						buttonText: 'Okay',
						type: 'success',
					});
					console.log('Toast', Toast);
					this.props.navigation.navigate('Home');
					await AsyncStorage.setItem('USER', JSON.stringify(firebaseUser));
					console.log('USER', firebaseUser);
					// this.state({ email: '', password: ''});
				} catch (error) {
					Toast.show({
						text: error,
						buttonText: 'Okay',
						type: 'warning',
					});
					console.log('Error', error);
				}
			})
			.catch((error) => {
				Toast.show({
					text: error,
					buttonText: 'Okay',
					type: 'warning',
				});
				console.log('Error', error);
			});
	};

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
					<ProductButton full success onPress={this.onLoginClick}>
						LOGIN
					</ProductButton>
				</View>
			</View>
		);
	}
}

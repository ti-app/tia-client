import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import ProductButton from '../shared/ProductButton';
import FormInput from '../shared/FormInput';
import ProductText from '../shared/ProductText';

export default class LoginForm extends React.Component {
	render() {
		return (
			<View style={this.props.style}>
				<FormInput
					icon={<Entypo name="user" />}
					placeholder="Email Address"
					textContentType="emailAddress"
				/>
				<FormInput
					icon={<Entypo name="lock" />}
					placeholder="Password"
					textContentType="password"
					secureTextEntry={true}
				/>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('ResetPassword')}>
					<ProductText>Forgot Password?</ProductText>
				</TouchableOpacity>
				<View>
					<ProductButton full success onPress={() => this.props.navigation.navigate('Home')}>
						LOGIN
					</ProductButton>
				</View>
			</View>
		);
	}
}

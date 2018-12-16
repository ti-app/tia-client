import React from 'react';
import { View } from 'react-native';

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
				<View>
					<ProductText>Forgot Password?</ProductText>
				</View>
				<View>
					<ProductButton full success>
						LOGIN
					</ProductButton>
				</View>
			</View>
		);
	}
}

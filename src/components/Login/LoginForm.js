import React from 'react';
import { View, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { Entypo } from '@expo/vector-icons';
import { Toast } from 'native-base';
import * as firebase from 'firebase';

import ProductButton from '../shared/ProductButton';
import FormInput from '../shared/FormInput';
import ProductText from '../shared/ProductText';
import { setLoading } from '../../store/actions/ui-interactions.action';

class LoginForm extends React.Component {
	state = {
		email: '',
		password: '',
	};

	onEmailChange = (email) => {
		this.setState({ email });
	};

	onPasswordChange = (password) => {
		this.setState({ password });
	};

	onLoginClick = async () => {
		const { email, password } = this.state;
		const { setLoading, navigation } = this.props;
		setLoading(true);
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(async (firebaseUser) => {
				try {
					setLoading(false);
					Toast.show({
						text: `Welcome! Successfully logged in`,
						buttonText: 'Okay',
						type: 'success',
					});
					navigation.navigate('Home');
					await AsyncStorage.setItem('USER', JSON.stringify(firebaseUser));
					// this.state({ email: '', password: ''});
				} catch (error) {
					setLoading(false);
					Toast.show({
						text: error,
						buttonText: 'Okay',
						type: 'warning',
					});
					console.log('Error', error);
				}
			})
			.catch((error) => {
				setLoading(false);
				Toast.show({
					text: error,
					buttonText: 'Okay',
					type: 'warning',
				});
				console.log('Error', error);
			});
	};

	render() {
		const { style, navigation } = this.props;
		return (
			<View style={style}>
				<FormInput
					icon={<Entypo name="user" />}
					placeholder="Email Address"
					textContentType="emailAddress"
					onChangeText={this.onEmailChange}
				/>
				<FormInput
					icon={<Entypo name="lock" />}
					placeholder="Password"
					textContentType="password"
					onChangeText={this.onPasswordChange}
					secureTextEntry
				/>
				<TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
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

const mapDispatchToProps = (dispatch) => ({
	setLoading: (flag) => dispatch(setLoading(flag)),
});

export default connect(
	null,
	mapDispatchToProps
)(LoginForm);

import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';

import { Entypo, EvilIcons, AntDesign } from '@expo/vector-icons';

import FormInput from '../shared/FormInput';

import ProductButton from '../shared/ProductButton';

import * as firebase from 'firebase';

import Toast, { DURATION } from 'react-native-easy-toast';

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
		firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(
				(resp) => {
					firebase
						.auth()
						.currentUser.updateProfile({
							location: this.state.location,
						})
						.then(async (updateUser) => {
							try {
								this.refs.toast.show(`Welcome ${this.state.email} !`);
								this.props.navigation.navigate('Home');
								this.state = {
									showPassword: false,
									email: '',
									password: '',
									location: '',
								};
								await AsyncStorage.setItem('USER', resp);
							} catch (error) {
								console.log(error);
							}
						});
				},
				(error) => {
					console.log(error.message);
				}
			);
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
				<Toast ref="toast" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
});

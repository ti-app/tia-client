import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';

import OptionsBar from '../components/Navigation/OptionsBar';
// import UserStarRating from "../components/shared/UserStarRating";
// import BioTextInput from "../components/shared/BioTextInput";

export default class UserProfileScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: '',
		};
	}

	async componentWillMount() {
		const currentUser = await this.getCurrentUser();
		this.setState({ currentUser });
	}

	async getCurrentUser() {
		try {
			const user = await AsyncStorage.getItem('USER');
			return JSON.parse(user) || 'INITIAL';
		} catch (error) {
			throw error;
		}
	}
	// Header{}
	static navigationOptions = ({ navigation }) => {
		const header = navigation.getParam('header', {
			headerTitle: (
				<OptionsBar
					title="User Profile"
					leftOption={{
						label: 'Back',
						action: () => navigation.navigate('Home'),
					}}
					rightOption={{
						label: '',
						action: () => {},
					}}
				/>
			),
			headerTransparent: true,
			headerStyle: {
				height: 80,
				backgroundColor: '#ffff',
				opacity: 0.8,
			},
			headerLeft: null,
		});
		return header;
	};
	render() {
		const { currentUser } = this.state;

		console.log('+++ User Profile Page', currentUser);
		return (
			<View style={styles.container}>
				<Image
					square
					style={styles.avatar}
					source={{
						uri: currentUser.photoURL,
					}}
				/>
				{/* <UserStarRating /> */}
				<Text style={styles.name}>{currentUser.displayName}</Text>
				<Text style={styles.description}>Uploaded:20 Plants, Owned:5 Plants</Text>
				<View style={styles.bio}>{/* <BioTextInput /> */}</View>
				<TouchableOpacity style={styles.buttonContainer2}>
					<Text style={styles.biopublic}>View your public profile</Text>
				</TouchableOpacity>
				<View>
					<Text>
						{currentUser.email} {currentUser.emailVerified ? 'Verified' : 'Not Verified'}
					</Text>
				</View>
				<View>
					<Text>
						{currentUser.phoneNumber ? 'Telephone:' : ''}
						{currentUser.phoneNumber}
					</Text>
				</View>
				<TouchableOpacity style={styles.buttonContainer}>
					<Text>History</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		display: 'flex',
		marginTop: 60,
		alignItems: 'center',
		padding: 30,
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 65,
		borderWidth: 4,
		borderColor: 'white',
		marginBottom: 10,
		alignSelf: 'center',
		// position: "absolute",
		marginTop: 10,
	},
	name: {
		fontSize: 28,
		fontWeight: '600',
	},
	info: {
		fontSize: 16,
		color: '#00BFFF',
		marginTop: 10,
	},
	description: {
		fontSize: 16,
		color: '#696969',
		marginTop: 10,
		textAlign: 'center',
	},
	buttonContainer: {
		marginTop: 10,
		height: 45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
		width: 250,
		borderRadius: 30,
		backgroundColor: '#00BFFF',
	},
	buttonContainer2: {
		marginTop: 10,
		height: 45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
		width: 250,
		backgroundColor: 'white',
	},
	bio: {
		fontSize: 10,
		fontWeight: 'bold',
		fontStyle: 'italic',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#696969',
	},
	biopublic: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});

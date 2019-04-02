import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import UserStarRating from '../components/shared/UserStarRating';
// import BioTextInput from '../components/shared/BioTextInput';

export default class UserProfileScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header} />
				<Image style={styles.avatar} source={require('./img/Viv_profile.jpg')} />
				<View style={styles.body}>
					{/* <UserStarRating/> */}
					<View style={styles.bodyContent}>
						<Text style={styles.name}>Vivek Kumar</Text>

						<Text style={styles.description}>Uploaded:20 Plants, Owned:5 Plants</Text>

						{/* <View style={styles.bio}>
              <BioTextInput/> 
            </View> */}

						<TouchableOpacity style={styles.buttonContainer2}>
							<Text style={styles.biopublic}>View your public profile</Text>
						</TouchableOpacity>

						<View>
							<Text>Email-id:vivkumar@gmail.com</Text>
						</View>

						<View>
							<Text>Telephone:+91 9881728175</Text>
						</View>

						<TouchableOpacity style={styles.buttonContainer}>
							<Text>History</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		backgroundColor: '#00BFFF',
		height: 20,
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 65,
		borderWidth: 4,
		borderColor: 'white',
		marginBottom: 10,
		alignSelf: 'center',
		position: 'absolute',
		marginTop: 10,
	},
	body: {
		marginTop: 150,
	},
	bodyContent: {
		alignItems: 'center',
		padding: 30,
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

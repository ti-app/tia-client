import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { Toast, Text, List, ListItem, View } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import firebase from 'firebase';

class SideDrawerContent extends React.Component {
	componentWillUnmount() {}

	logout = async () => {
		const { navigation } = this.props;
		try {
			await firebase.auth().signOut();
			navigation.navigate('login');
			Toast.show({
				text: 'Log out successfully',
				buttonText: 'Okay',
			});
		} catch (e) {
			Toast.show({
				text: 'Issue while sign out',
				buttonText: 'Okay',
			});
		}
	};

	navigateTo = (to) => {
		const { navigation } = this.props;
		navigation.navigate(to);
	};

	render() {
		const { user } = this.props;
		return (
			<LinearGradient
				colors={['#00dbb0', '#77ffe4']}
				start={[0, 1]}
				end={[1, 0]}
				location={[0.59, 0.79]}
			>
				<View style={styles.container}>
					{user && (
						<View>
							<View style={styles.userContainer}>
								{user.photoURL ? (
									<Image
										square
										style={styles.userPhoto}
										source={{
											uri: user.photoURL,
										}}
										onPress={() => this.navigateTo('UserProfile')}
									/>
								) : (
									<FontAwesome style={styles.userIcon} name="user-circle" size={60} />
								)}
							</View>
							<Text style={styles.displayName} onPress={() => this.navigateTo('UserProfile')}>
								{user.displayName}
							</Text>
							<List>
								<ListItem button onPress={() => this.navigateTo('AddNewSpot')}>
									<Text style={styles.text}>Add a Plant</Text>
								</ListItem>
								<ListItem button>
									<Text style={styles.text}>Settings</Text>
								</ListItem>
								<ListItem button>
									<Text style={styles.text}>History</Text>
								</ListItem>
								<ListItem button onPress={() => this.navigateTo('Faq')}>
									<Text style={styles.text}>FAQ</Text>
								</ListItem>
								<ListItem button onPress={this.logout}>
									<Text style={styles.text}>Log out</Text>
								</ListItem>
							</List>
						</View>
					)}
				</View>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		top: 30,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		height: '100%',
		width: '100%',
	},
	userContainer: {
		height: 80,
		width: 80,
		borderWidth: 1,
		borderRadius: 40,
		alignSelf: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	userPhoto: {
		height: 80,
		width: 80,
		borderRadius: 40,
		alignSelf: 'center',
	},
	displayName: {
		alignSelf: 'center',
		color: 'white',
		fontSize: 20,
		top: 5,
	},
	userIcon: {
		alignSelf: 'center',
	},
	text: {
		color: 'white',
		fontSize: 20,
	},
});

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps)(SideDrawerContent);

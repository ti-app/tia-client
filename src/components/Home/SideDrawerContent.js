import React from 'react';
import { StyleSheet, Image, AsyncStorage } from 'react-native';
import { Toast, Text, Container, List, ListItem, Content, Icon } from 'native-base';
import firebase from 'firebase';
const routes = ['Home', 'Add a spot', 'Settings'];

export default class SideDrawerContent extends React.Component {
	constructor(props) {
		super(props);
		state = {
			loggedInUser: '',
		};
	}

	async componentDidMount() {
		this._isMount = true;
		const user = await AsyncStorage.getItem('USER');
		if (this._isMount) {
			this.setState({
				loggedInUser: JSON.parse(user),
			});
		}
	}

	componentWillUnmount() {
		this._isMount = false;
	}

	logout = async () => {
		try {
			await firebase.auth().signOut();
			this.props.navigation.navigate('login');
			await AsyncStorage.removeItem('USER');
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

	render() {
		// const { loggedInUser } = this.state;
		return (
			<Container style={styles.container}>
				<Content>
					<Image
						square
						style={{
							height: 80,
							width: 70,
							position: 'absolute',
							alignSelf: 'center',
							top: 20,
							borderRadius: 10,
						}}
						source={{
							uri:
								'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png',
						}}
					/>
				</Content>
				<Content>
					<List contentContainerStyle={{ position: 'absolute', top: 20 }}>
						<ListItem button onPress={() => this.props.navigation.navigate(data)}>
							{/* <Text>{this.state.loggedInUser.user.email}</Text> */}
						</ListItem>
					</List>
					<List
						dataArray={routes}
						contentContainerStyle={{}}
						renderRow={(data) => {
							return (
								<ListItem button onPress={() => this.props.navigation.navigate(data)}>
									<Text>{data}</Text>
								</ListItem>
							);
						}}
					/>
					<List>
						<ListItem button onPress={this.logout}>
							<Text>Log out</Text>
						</ListItem>
					</List>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		marginTop: 200,
		zIndex: 99,
	},
});

import React from 'react';
import { StyleSheet, Image, AsyncStorage } from 'react-native';
import { Button, Text, Container, List, ListItem, Content, Icon } from 'native-base';
const routes = ['Home', 'Add a spot', 'Settings', 'Logout'];

export default class SideDrawerContent extends React.Component {
	state = {
		loggedInUser: '',
	};

	async componentDidMount() {
		const user = await AsyncStorage.getItem('USER');
		this.setState({
			loggedInUser: JSON.parse(user),
		});
	}

	render() {
		const { loggedInUser } = this.state;
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
					<List contentContainerStyle={{ marginTop: 220 }}>
						<ListItem button onPress={() => this.props.navigation.navigate(data)}>
							<Text>{loggedInUser.displayName}</Text>
						</ListItem>
					</List>
					<List contentContainerStyle={{ marginTop: 10 }}>
						<ListItem button onPress={() => this.props.navigation.navigate(data)}>
							<Text>{loggedInUser.email}</Text>
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

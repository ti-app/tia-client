import React from 'react';
import { StyleSheet } from 'react-native';

import HomeDrawer from '../components/Home/Drawer';
import HomeMap from '../components/Home/HomeMap';
import HomeNavigationBar from '../components/Home/HomeNavigationBar';
import AddActionButton from '../components/shared/AddActionButton';

export default class HomeScreen extends React.Component {
	state = {};

	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: <HomeNavigationBar nearbySpotsCount={12} />,
			headerTransparent: true,
			headerStyle: {
				zIndex: 100,
				height: 80,
				borderBottomColor: 'red',
				borderBottomWidth: 2,
				backgroundColor: '#ffff',
				opacity: 0.8,
			},
		};
	};

	render() {
		return (
			<HomeDrawer>
				<HomeMap />
				<AddActionButton />
			</HomeDrawer>
		);
	}
}

const styles = StyleSheet.create({});

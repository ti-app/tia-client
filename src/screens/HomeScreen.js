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
			headerStyle: {
				zIndex: 100,
				height: 80,
				borderBottomColor: 'red',
				borderBottomWidth: 2,
				background: 'rgba(255,255,255,1)',
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

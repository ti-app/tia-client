import React from 'react';
import { StyleSheet } from 'react-native';

import HomeDrawer from '../components/Home/Drawer';
import HomeMap from '../components/Home/HomeMap';
import HomeNavigationBar from '../components/Home/HomeNavigationBar';

export default class HomeScreen extends React.Component {
	state = {};

	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: <HomeNavigationBar nearbySpotsCount={12} />,
		};
	};

	render() {
		return (
			<HomeDrawer>
				<HomeMap />
			</HomeDrawer>
		);
	}
}

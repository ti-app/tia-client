import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { connect } from 'react-redux';

import HomeDrawer from '../components/Home/Drawer';
import HomeMap from '../components/Home/HomeMap';
import HomeNavigationBar from '../components/Home/HomeNavigationBar';
import AddActionButton from '../components/shared/AddActionButton';
import { fetchCurrentLocation } from '../store/actions/location';

class HomeScreen extends React.Component {
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

	componentWillMount() {
		this.props.fetchCurrentLocation();
	}

	render() {
		const { currentLocation } = this.props;

		return (
			<HomeDrawer>
				<HomeMap />
				<AddActionButton />
			</HomeDrawer>
		);
	}
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({
	currentLocation: state.location.currentLocation,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCurrentLocation: () => dispatch(fetchCurrentLocation()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen);

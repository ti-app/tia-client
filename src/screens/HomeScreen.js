import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';

import HomeDrawer from '../components/Home/Drawer';
import HomeMap from '../components/Home/HomeMap';
import HomeNavigationBar from '../components/Home/HomeNavigationBar';
import AddActionButton from '../components/shared/AddActionButton';
import FilterTree from '../components/Home/FilterTree';
import { fetchCurrentLocation } from '../store/actions/location';

class HomeScreen extends React.Component {
	state = { isFilterOpen: false };

	static navigationOptions = ({ navigation }) => {
		const header = navigation.getParam('header', {
			headerTitle: <HomeNavigationBar nearbySpotsCount={12} />,
			headerTransparent: true,
			headerStyle: {
				height: 80,
				borderBottomColor: 'red',
				borderBottomWidth: 2,
				backgroundColor: '#ffff',
				opacity: 0.8,
			},
			headerLeft: null,
		});

		return header;
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		const { isFilterOpen } = nextProps;

		if (isFilterOpen !== prevState.isFilterOpen) {
			nextProps.navigation.setParams({
				header: isFilterOpen
					? { header: null }
					: {
							headerTitle: <HomeNavigationBar nearbySpotsCount={12} />,
							headerTransparent: true,
							headerStyle: {
								height: 80,
								borderBottomColor: 'red',
								borderBottomWidth: 2,
								backgroundColor: '#ffff',
								opacity: 0.8,
							},
							headerLeft: null,
					  },
			});
			return { isFilterOpen };
		} else {
			return null;
		}
	}

	componentDidMount() {
		this.props.fetchCurrentLocation();
	}

	render() {
		const { isFilterOpen } = this.state;

		return (
			<HomeDrawer>
				{isFilterOpen ? (
					<View style={styles.filterContainer}>
						<FilterTree />
					</View>
				) : null}
				<HomeMap />
				<AddActionButton />
			</HomeDrawer>
		);
	}
}

const styles = StyleSheet.create({
	filterContainer: {
		height: 380,
		backgroundColor: 'white',
		borderBottomColor: 'red',
		borderBottomWidth: 2,
	},
});

const mapStateToProps = (state) => ({
	isFilterOpen: state.ui.isFilterOpen,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCurrentLocation: () => dispatch(fetchCurrentLocation()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen);

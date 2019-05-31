import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

import HomeDrawer from '../components/Home/Drawer';
import HomeMap from '../components/Home/HomeMap';
import HomeNavigationBar from '../components/Navigation/HomeNavigationBar';
import AddActionButton from '../components/shared/AddActionButton';
import FilterTree from '../components/Home/FilterTree';
import SpotDetails from '../components/Home/SpotDetails';
import { fetchUserLocation } from '../store/actions/location.action';
import OptionsBar from '../components/Navigation/OptionsBar';
import { SpotDetailsNavBar } from '../components/Navigation/SpotDetailsNavBar';
import { toggleFilter, toggleSpotDetails } from '../store/actions/ui-interactions.action';

class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.mapRef = React.createRef();
		this.state = {
			defaultHeaderOptions: {
				headerTitle: <HomeNavigationBar nearbySpotsCount={0} />,
				headerTransparent: true,
				headerStyle: {
					height: 80,
					borderBottomColor: 'red',
					backgroundColor: '#ffff',
					opacity: 0.8,
				},
				headerLeft: null,
			},
		};
	}

	static navigationOptions = ({ navigation }) => {
		const header = navigation.getParam('header', {
			headerTitle: <HomeNavigationBar nearbySpotsCount={0} />,
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

	componentDidMount() {
		const { fetchUserLocation } = this.props;
		fetchUserLocation();
	}

	componentDidUpdate(prevProps) {
		const {
			isFilterOpen,
			toggleFilter,
			navigation,
			isSpotDetailsOpen,
			toggleSpotDetails,
			treeGroups,
		} = this.props;
		const { defaultHeaderOptions } = this.state;
		const { headerStyle: defaultHeaderStyle } = defaultHeaderOptions;

		const changeNavigationBar =
			isFilterOpen !== prevProps.isFilterOpen || isSpotDetailsOpen !== prevProps.isSpotDetailsOpen;
		const isFilterOrSpotDetailsNavBar = isFilterOpen || isSpotDetailsOpen;
		if (changeNavigationBar) {
			navigation.setParams({
				treeCount: treeGroups.length,
				header: {
					...defaultHeaderOptions,
					headerStyle: {
						...defaultHeaderStyle,
						borderBottomWidth: isFilterOrSpotDetailsNavBar ? 0 : 2,
					},
					headerTitle: (() => {
						switch (true) {
							case isFilterOpen:
								return (
									<OptionsBar
										title="Filters"
										leftOption={{ label: 'Cancel', action: () => toggleFilter() }}
										rightOption={{
											label: 'Save',
											action: () => {
												console.log('Save filter option and do something with it');
											},
										}}
									/>
								);
							case isSpotDetailsOpen:
								return <SpotDetailsNavBar leftOption={{ action: () => toggleSpotDetails() }} />;
							default:
								return <HomeNavigationBar nearbySpotsCount={treeGroups.length} />;
						}
					})(),
				},
			});
		} else if (
			treeGroups.length !== prevProps.treeGroups.length &&
			!isFilterOpen &&
			!isSpotDetailsOpen
		) {
			navigation.setParams({
				header: {
					...defaultHeaderOptions,
					headerTitle: <HomeNavigationBar nearbySpotsCount={treeGroups.length} />,
				},
			});
		}
	}

	handleMyLocationClick() {
		const { userLocation } = this.props;
		const { latitude, longitude } = userLocation;
		this.mapRef.animateToRegion({
			latitude,
			longitude,
			latitudeDelta: 0.023569992395493955,
			longitudeDelta: 0.0216786190867424,
		});
	}

	handleOnMapLoad = (ref) => {
		this.mapRef = ref;
	};

	render() {
		const { isFilterOpen, isSpotDetailsOpen } = this.props;

		return (
			<HomeDrawer {...this.props}>
				{isFilterOpen ? (
					<View style={styles.filterContainer}>
						<FilterTree />
					</View>
				) : null}
				<HomeMap onMapLoad={this.handleOnMapLoad} {...this.props} />
				{isSpotDetailsOpen ? (
					<View style={styles.spotDetailsContainer}>
						<SpotDetails />
					</View>
				) : (
					<React.Fragment>
						<AddActionButton {...this.props} mapRef={this.mapRef} />
						<TouchableOpacity
							style={styles.myLocationIcon}
							onPress={() => this.handleMyLocationClick()}
						>
							<MaterialIcons name="my-location" size={40} />
						</TouchableOpacity>
					</React.Fragment>
				)}
			</HomeDrawer>
		);
	}
}

const styles = StyleSheet.create({
	filterContainer: {
		height: 380,
		backgroundColor: 'white',
	},
	myLocationIcon: {
		position: 'absolute',
		bottom: 32,
		left: 16,
	},
	spotDetailsContainer: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		height: 400,
		backgroundColor: 'white',
		width: '100%',
	},
});

const mapStateToProps = (state) => ({
	isFilterOpen: state.ui.isFilterOpen,
	userLocation: state.location.userLocation,
	isSpotDetailsOpen: state.ui.isSpotDetailsOpen,
	treeGroups: state.tree.treeGroups,
});

const mapDispatchToProps = (dispatch) => ({
	toggleFilter: () => dispatch(toggleFilter()),
	fetchUserLocation: () => dispatch(fetchUserLocation()),
	toggleSpotDetails: () => dispatch(toggleSpotDetails()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen);

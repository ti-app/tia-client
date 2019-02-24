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
import { fetchCurrentLocation } from '../store/actions/location';
import { OptionsBar } from '../components/Navigation/OptionsBar';
import { toggleFilter } from '../store/actions/ui-interactions';

class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.clusteredMapRef = React.createRef();
		this.state = {
			defaultHeaderOptions: {
				headerTitle: <HomeNavigationBar nearbySpotsCount={12} />,
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

	componentDidMount() {
		this.props.fetchCurrentLocation();
	}

	componentDidUpdate(prevProps) {
		const { isFilterOpen, toggleFilter, navigation } = this.props;
		const { defaultHeaderOptions } = this.state;
		const { headerStyle: defaultHeaderStyle } = defaultHeaderOptions;

		if (isFilterOpen !== prevProps.isFilterOpen) {
			navigation.setParams({
				header: {
					...defaultHeaderOptions,
					headerStyle: {
						...defaultHeaderStyle,
						borderBottomWidth: isFilterOpen ? 0 : 2,
					},
					headerTitle: isFilterOpen ? (
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
					) : (
						<HomeNavigationBar nearbySpotsCount={12} />
					),
				},
			});
		}
	}

	handleMyLocationClick() {
		const { latitude, longitude } = this.props.currentLocation;
		this.clusteredMapRef.getMapRef().animateToRegion({
			latitude,
			longitude,
			latitudeDelta: 0.508817991434235,
			longitudeDelta: 0.15413663983345,
		});
	}

	render() {
		const { isFilterOpen, isSpotDetailsOpen } = this.props;

		return (
			<HomeDrawer {...this.props}>
				{isFilterOpen ? (
					<View style={styles.filterContainer}>
						<FilterTree />
					</View>
				) : null}
				<HomeMap
					onMapLoad={(ref) => {
						this.clusteredMapRef = ref;
					}}
				/>
				{isSpotDetailsOpen ? (
					<View style={styles.spotDetailsContainer}>
						<SpotDetails />
					</View>
				) : (
					<React.Fragment>
						<AddActionButton {...this.props} />
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
		bottom: 0,
		height: 500,
		backgroundColor: 'white',
	},
});

const mapStateToProps = (state) => ({
	isFilterOpen: state.ui.isFilterOpen,
	currentLocation: state.location.currentLocation,
	isSpotDetailsOpen: state.location.isSpotDetailsOpen,
});

const mapDispatchToProps = (dispatch) => ({
	toggleFilter: () => dispatch(toggleFilter()),
	fetchCurrentLocation: () => dispatch(fetchCurrentLocation()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen);

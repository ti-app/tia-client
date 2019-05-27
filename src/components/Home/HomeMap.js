import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { Container } from 'native-base';
import { connect } from 'react-redux';

import debounce from '../../utils/Debounce';
import ClusteredMap from '../Map/ClusteredMap';
import TreeCluster from '../Map/TreeCluster';
import Tree from '../Map/Tree';
import { toggleSpotDetails } from '../../store/actions/ui-interactions.action';
import { fetchTrees, setTreeSpot, resetTreeSpot } from '../../store/actions/tree.action';
import { setMapCenterAndFetchTrees } from '../../store/actions/location.action';
import store from '../../store';

class HomeMap extends React.Component {
	constructor(props) {
		super(props);

		this.clusteredMapRef = React.createRef();
		this.state = {};
	}

	componentDidMount() {}

	componentDidUpdate(prevProps) {
		const { latitude: prevUserLat, longitude: prevUserLng } = prevProps.userLocation;
		const { userLocation, setMapCenterAndFetchTrees } = this.props;
		const { latitude: userLatitude, longitude: userLongitude } = userLocation;

		if ((userLatitude !== prevUserLat || userLongitude !== prevUserLng) && this.clusteredMapRef) {
			const mapLocation = {
				latitude: userLatitude,
				longitude: userLongitude,
				latitudeDelta: 0.508817991434235,
				longitudeDelta: 0.15413663983345,
			};
			this.clusteredMapRef.getMapRef().animateToRegion(mapLocation, 2000);
			console.log('[HomeMap.js::componentDidUpdate] calling setMapCenterAndFetchTrees');
			setMapCenterAndFetchTrees(mapLocation);
		}
	}

	onRegionChange = (region) => {
		const { setMapCenterAndFetchTrees, isSpotDetailsOpen } = this.props;
		if (!isSpotDetailsOpen) {
			console.log('[HomeMap.js::onRegionChange] calling setMapCenterAndFetchTrees');
			setMapCenterAndFetchTrees(region);
		} else {
			console.log(
				'[HomeMap.js::onRegionChange] avoiding call to setMapCenterAndFetchTrees because isSpotDetailsOpen is truthy'
			);
		}
	};

	renderMarker = (data) => {
		const { toggleSpotDetails } = this.props;
		return (
			<Marker
				key={data.id}
				coordinate={data.location}
				onPress={() => {
					toggleSpotDetails(data);
				}}
			>
				<Tree status={data.health} />
			</Marker>
		);
	};

	renderCluster = (cluster, onPress) => {
		const { pointCount, clusterId, coordinate } = cluster;

		// TODO: get all points in a cluster with following commented code
		// and calculate average of the health status of thee and decide cluster's
		// health status
		const clusteringEngine = this.clusteredMapRef.getClusteringEngine();
		const clusteredPoints = clusteringEngine.getLeaves(clusterId, 100);

		const healthList = ['almostDead', 'weak', 'healthy'];

		const clusteredPointHealthList = clusteredPoints.map((point) => point.properties.item.health);

		let totalHealthScore = 0;
		clusteredPointHealthList.forEach((_) => {
			totalHealthScore += healthList.indexOf(_);
		});
		totalHealthScore /= parseFloat(clusteredPoints.length);
		totalHealthScore = parseInt(Math.round(totalHealthScore), 10);

		return (
			<Marker
				key={`cluster-${clusterId}`}
				identifier={`cluster-${clusterId}`}
				coordinate={coordinate}
				onPress={onPress}
			>
				<TreeCluster pointCount={pointCount} status={healthList[totalHealthScore]} />
			</Marker>
		);
	};

	render() {
		const { userLocation, trees } = this.props;

		const { latitude, longitude } = userLocation;
		const { onMapLoad } = this.props;

		const mapData = trees.map((aTree) => {
			const { _id, health, location, ...rest } = aTree;
			const { coordinates } = location;
			return {
				id: _id,
				health,
				location: { longitude: coordinates[0], latitude: coordinates[1] },
				...rest,
			};
		});

		return (
			<Container style={styles.container}>
				<ClusteredMap
					onMapLoad={(ref) => {
						this.clusteredMapRef = ref;
						onMapLoad(ref);
					}}
					initialRegion={{
						latitude,
						longitude,
						latitudeDelta: 0.508817991434235,
						longitudeDelta: 0.15413663983345,
					}}
					x
					data={mapData}
					renderMarker={this.renderMarker}
					renderCluster={this.renderCluster}
					onRegionChangeComplete={debounce(this.onRegionChange, 100, false)}
					showsUserLocation
				/>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
});

HomeMap.propTypes = {
	userLocation: PropTypes.shape({
		latitude: PropTypes.number.isRequired,
		longitude: PropTypes.number.isRequired,
	}).isRequired,
};

HomeMap.defaultProps = {};

const mapStateToProps = (state) => ({
	userLocation: state.location.userLocation,
	trees: state.tree.trees,
	isSpotDetailsOpen: state.ui.isSpotDetailsOpen,
});

const mapDispatchToProps = (dispatch) => ({
	toggleSpotDetails: (spot) => {
		dispatch(toggleSpotDetails());
		const { isSpotDetailsOpen } = store.getState().ui;
		if (isSpotDetailsOpen) {
			// prettier-ignore
			console.log('[HomeMap.js::mapDispatchToProps] isSpotDetailsOpen is truthy, dispatching setTreeSpot')
			dispatch(setTreeSpot(spot));
		} else {
			// prettier-ignore
			console.log('[HomeMap.js::mapDispatchToProps] isSpotDetailsOpen is falsy, dispatching resetTreeSpot')
			dispatch(resetTreeSpot());
		}
	},
	fetchTrees: (...param) => dispatch(fetchTrees(...param)),
	setMapCenterAndFetchTrees: (location) => dispatch(setMapCenterAndFetchTrees(location)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeMap);

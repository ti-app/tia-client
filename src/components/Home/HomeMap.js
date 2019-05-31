import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { Container } from 'native-base';
import { connect } from 'react-redux';

import { getAvgHealthStatus } from '../../utils/HealtStatus';
import debounce from '../../utils/Debounce';
import Map from '../Map/Map';
import TreeCluster from '../Map/TreeCluster';
import Tree from '../Map/Tree';
import Spot from '../Map/Spot';
import { toggleSpotDetails } from '../../store/actions/ui-interactions.action';
import { fetchTreeGroups, setTreeSpot, resetTreeSpot } from '../../store/actions/tree.action';
import { setMapCenterAndFetchTreeGroups, setMapCenter } from '../../store/actions/location.action';
import store from '../../store';

class HomeMap extends React.Component {
	constructor(props) {
		super(props);

		this.mapRef = React.createRef();
		this.state = {
			splittedTreeGroup: null,
		};
	}

	componentDidMount() {}

	componentDidUpdate(prevProps) {
		const { latitude: prevUserLat, longitude: prevUserLng } = prevProps.userLocation;
		const { userLocation, setMapCenterAndFetchTreeGroups } = this.props;
		const { latitude: userLatitude, longitude: userLongitude } = userLocation;

		if ((userLatitude !== prevUserLat || userLongitude !== prevUserLng) && this.mapRef) {
			const mapLocation = {
				latitude: userLatitude,
				longitude: userLongitude,
				latitudeDelta: 0.023569992395493955,
				longitudeDelta: 0.0216786190867424,
			};
			this.mapRef.animateToRegion(mapLocation, 2000);
			console.log('[HomeMap.js::componentDidUpdate] calling setMapCenterAndFetchTreeGroups');
			setMapCenterAndFetchTreeGroups(mapLocation);
		}
	}

	onRegionChange = (region) => {
		console.log(region);
		const { setMapCenter, isSpotDetailsOpen } = this.props;
		if (!isSpotDetailsOpen) {
			console.log('[HomeMap.js::onRegionChange] calling setMapCenter');
			setMapCenter(region);
		} else {
			console.log(
				'[HomeMap.js::onRegionChange] avoiding call to setMapCenter because isSpotDetailsOpen is truthy'
			);
		}
	};

	renderMarker = (data) => {
		const { splittedTreeGroup } = this.state;
		const { toggleSpotDetails } = this.props;

		if (data.trees.length === 1) {
			return (
				<Marker
					key={data.trees[0]._id}
					coordinate={data.location}
					onPress={() => {
						toggleSpotDetails(data.trees[0]);
					}}
				>
					<Tree status={data.trees[0].health} />
				</Marker>
			);
		}

		if (
			splittedTreeGroup &&
			splittedTreeGroup.id === data.id &&
			JSON.stringify(splittedTreeGroup.trees) === JSON.stringify(data.trees) // TODO: This could create some problem. But right now this is the only faster and easier I can think of.
		) {
			const { trees } = splittedTreeGroup;
			const division = 360 / trees.length;
			const radius = 0.00003;
			const { longitude: centerLng, latitude: centerLat } = data.location;

			return trees.map((tree, i) => {
				const modifiedLng = centerLng + Math.cos(division * (i + 1) * (Math.PI / 180)) * radius;
				const modifiedLat = centerLat + Math.sin(division * (i + 1) * (Math.PI / 180)) * radius;

				return (
					<Marker
						key={tree._id}
						coordinate={{ longitude: modifiedLng, latitude: modifiedLat }}
						onPress={() => {
							toggleSpotDetails(tree);
						}}
					>
						<Tree status={tree.health} />
					</Marker>
				);
			});
		}

		return (
			<Marker
				key={data.id}
				coordinate={data.location}
				onPress={() => {
					this.setState({ splittedTreeGroup: data });
				}}
			>
				<Spot health={data.health} trees={data.trees} />
			</Marker>
		);
	};

	renderCluster = (cluster, onPress) => {
		const { pointCount, clusterId, coordinate } = cluster;

		const clusteringEngine = this.mapRef.getClusteringEngine();
		const clusteredPoints = clusteringEngine.getLeaves(clusterId, 100);

		const clusteredPointHealthList = clusteredPoints.map((point) => point.properties.item.health);

		return (
			<Marker
				key={`cluster-${clusterId}`}
				identifier={`cluster-${clusterId}`}
				coordinate={coordinate}
				onPress={onPress}
			>
				<TreeCluster
					pointCount={pointCount}
					status={getAvgHealthStatus(clusteredPointHealthList)}
				/>
			</Marker>
		);
	};

	render() {
		const { userLocation, treeGroups } = this.props;

		const { latitude, longitude } = userLocation;
		const { onMapLoad } = this.props;

		const mapData = treeGroups.map((treeGroup) => {
			const { _id, health, location, ...rest } = treeGroup;
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
				<Map
					onMapLoad={(ref) => {
						this.mapRef = ref;
						onMapLoad(ref);
					}}
					initialRegion={{
						latitude,
						longitude,
						latitudeDelta: 0.023569992395493955,
						longitudeDelta: 0.0216786190867424,
					}}
					x
					// data={mapData}
					// renderMarker={this.renderMarker}
					// renderCluster={this.renderCluster}
					onRegionChangeComplete={debounce(this.onRegionChange, 100, false)}
					showsUserLocation
				>
					{mapData.map((treeGroup) => this.renderMarker(treeGroup))}
				</Map>
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
	treeGroups: state.tree.treeGroups,
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
	fetchTreeGroups: (...param) => dispatch(fetchTreeGroups(...param)),
	setMapCenter: (location) => dispatch(setMapCenter(location)),
	setMapCenterAndFetchTreeGroups: (location) => dispatch(setMapCenterAndFetchTreeGroups(location)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeMap);

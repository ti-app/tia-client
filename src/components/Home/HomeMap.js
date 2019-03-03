import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { Container } from 'native-base';
import { connect } from 'react-redux';

import ClusteredMap from '../Map/ClusteredMap';
import TreeCluster from '../Map/TreeCluster';
import Tree from '../Map/Tree';
import { toggleSpotDetails } from '../../store/actions/ui-interactions.action';
import { fetchTrees } from '../../store/actions/tree.action';

class HomeMap extends React.Component {
	constructor(props) {
		super(props);

		this.clusteredMapRef = React.createRef();
		this.state = {};
	}

	componentDidMount() {}

	componentDidUpdate(prevProps) {
		const { latitude: prevLat, longitude: prevLng } = prevProps.currentLocation;
		const { currentLocation, fetchTrees } = this.props;
		const { latitude, longitude } = currentLocation;

		if ((latitude !== prevLat || longitude !== prevLng) && this.clusteredMapRef) {
			fetchTrees(currentLocation);
			this.clusteredMapRef.getMapRef().animateToRegion(
				{
					latitude,
					longitude,
					latitudeDelta: 0.508817991434235,
					longitudeDelta: 0.15413663983345,
				},
				2000
			);
		}
	}

	onRegionChange = (region) => {};

	renderMarker = (data) => {
		const { toggleSpotDetails } = this.props;
		return (
			<Marker
				key={data.id}
				coordinate={data.location}
				onPress={() => {
					toggleSpotDetails();
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
		const { currentLocation, trees } = this.props;

		const { latitude, longitude } = currentLocation;
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

		console.log(mapData);

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
					onRegionChange={this.onRegionChange}
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
	currentLocation: PropTypes.shape({
		latitude: PropTypes.number.isRequired,
		longitude: PropTypes.number.isRequired,
	}).isRequired,
};

HomeMap.defaultProps = {};

const mapStateToProps = (state) => ({
	currentLocation: state.location.currentLocation,
	trees: state.tree.trees,
});

const mapDispatchToProps = (dispatch) => ({
	toggleSpotDetails: () => dispatch(toggleSpotDetails()),
	fetchTrees: (...param) => dispatch(fetchTrees(...param)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeMap);

import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

import ClusteredMap from '../Map/ClusteredMap';
import TreeCluster from '../Map/TreeCluster';
import Tree from '../Map/Tree';
import { Container } from 'native-base';

class HomeMap extends React.Component {
	constructor(props) {
		super(props);

		this.mapRef = React.createRef();
		this.state = {
			region: {},
		};
	}

	onRegionChange(region) {
		this.setState({ region });
	}

	renderMarker(data) {
		return (
			<Marker key={data.id} coordinate={data.location}>
				<Tree status="healthy" />
			</Marker>
		);
	}

	renderCluster = (cluster, onPress) => {
		const pointCount = cluster.pointCount,
			coordinate = cluster.coordinate,
			clusterId = cluster.clusterId;

		// TODO: get all points in a cluster with following commented code
		// and calculate average of the health status of thee and decide cluster's
		// health status
		// const clusteringEngine = this.mapRef.getClusteringEngine(),
		//   clusteredPoints = clusteringEngine.getLeaves(clusterId, 100);

		return (
			<Marker
				key={`cluster-${clusterId}`}
				identifier={`cluster-${clusterId}`}
				coordinate={coordinate}
				onPress={onPress}
			>
				<TreeCluster pointCount={pointCount} status="healthy" />
			</Marker>
		);
	};

	render() {
		const { currentLocation } = this.props;

		const { latitude, longitude } = currentLocation;

		return (
			<Container style={styles.container}>
				<ClusteredMap
					onMapLoad={(ref) => {
						this.mapRef = ref;
					}}
					initialRegion={{
						latitude,
						longitude,
						latitudeDelta: 0.508817991434235,
						longitudeDelta: 0.15413663983345,
					}}
					x
					data={[
						{ id: '1', location: { latitude: 18.527834704573817, longitude: 73.84387493133544 } },
						{ id: '2', location: { latitude: 18.53426376419619, longitude: 73.84490489959717 } },
						{ id: '3', location: { latitude: 18.52449800870638, longitude: 73.85129928588867 } },
						{ id: '4', location: { latitude: 18.525189768078093, longitude: 73.85134220123291 } },
					]}
					renderMarker={this.renderMarker}
					renderCluster={this.renderCluster}
					onRegionChange={this.onRegionChange.bind(this)}
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
});

export default connect(mapStateToProps)(HomeMap);

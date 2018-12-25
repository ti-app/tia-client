import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

import Map from '../Map/Map';
import TreeCluster from '../Map/TreeCluster';
import Tree from '../Map/Tree';
import { Container } from 'native-base';

class HomeMap extends React.Component {
	state = {
		region: {
			latitude: 40.43907562958712,
			longitude: -122.53999315202236,
			latitudeDelta: 6.508817991434235,
			longitudeDelta: 4.45413663983345,
		},
	};

	onRegionChange(region) {
		this.setState({ region });
	}

	renderMarker(data) {
		return (
			<Marker coordinate={data.location}>
				<Tree />
			</Marker>
		);
	}

	renderCluster = (cluster, onPress) => {
		const pointCount = cluster.pointCount,
			coordinate = cluster.coordinate,
			clusterId = cluster.clusterId;

		return (
			<Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
				<TreeCluster pointCount={pointCount} />
			</Marker>
		);
	};

	render() {
		const { currentLocation } = this.props;

		const { latitude, longitude } = currentLocation;

		return (
			<Container style={styles.container}>
				<Map
					initialRegion={{
						latitude,
						longitude,
						latitudeDelta: 0.508817991434235,
						longitudeDelta: 0.15413663983345,
					}}
					x
					data={[
						{ location: { latitude: 39.70718665682654, longitude: -123.57421875 } },
						{ location: { latitude: 41.57436130598913, longitude: -122.607421875 } },
						{ location: { latitude: 40.84706035607122, longitude: -121.640625 } },
						{ location: { latitude: 41.07935114946899, longitude: -123.4423828125 } },
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
		latitude: PropTypes.number,
		longitude: PropTypes.number,
	}),
};

HomeMap.defaultProps = {
	currentLocation: {
		latitude: 18.5740821,
		longitude: 73.7777393,
	},
};

const mapStateToProps = (state) => ({
	currentLocation: state.location.currentLocation,
});

export default connect(mapStateToProps)(HomeMap);

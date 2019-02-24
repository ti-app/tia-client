import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

import ClusteredMap from '../Map/ClusteredMap';
import TreeCluster from '../Map/TreeCluster';
import Tree from '../Map/Tree';
import { Container } from 'native-base';
import { toggleSpotDetails } from '../../store/actions/ui-interactions';

class HomeMap extends React.Component {
	constructor(props) {
		super(props);

		this.clusteredMapRef = React.createRef();
		this.state = {
			region: {},
		};

		this.toggleSpotDetails;
	}

	componentDidMount() {
		this.toggleSpotDetails = this.props.toggleSpotDetails;
	}

	componentDidUpdate(prevProps) {
		const { latitude: prevLat, longitude: prevLng } = prevProps.currentLocation;
		const { latitude, longitude } = this.props.currentLocation;

		if ((latitude !== prevLat || longitude !== prevLng) && this.clusteredMapRef) {
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

	onRegionChange(region) {
		this.setState({ region });
	}

	renderMarker(data) {
		return (
			<Marker
				key={data.id}
				coordinate={data.location}
				onPress={function() {
					console.log('Tre emarker clicked.', this);
					// FIXME: Everything till here was fine. Now I am trying to call following
					// methods, and it says that this.props is undefined, has to do something with
					// implementation of clusteredmapview.js
					// this.props.toggleSpotDetails()
					// Need to find a way to pass this function in the context where thsi function is called
					// I know weird right
				}.bind(this)}
			>
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
		// const clusteringEngine = this.clusteredMapRef.getClusteringEngine(),
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
						this.clusteredMapRef = ref;
						this.props.onMapLoad(ref);
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

const mapDispatchToProps = (dispatch) => ({
	toggleSpotDetails: () => dispatch(toggleSpotDetails()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeMap);

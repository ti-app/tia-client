import React from 'react';
import { StyleSheet } from 'react-native';
import { MapView } from 'expo';
import ClusteredMapView from 'react-native-maps-super-cluster';

export default class HomeScreen extends React.Component {
	render() {
		const { onMapLoad } = this.props;

		return (
			<ClusteredMapView
				ref={(r) => {
					onMapLoad(r);
				}}
				style={styles.map}
				{...this.props}
			/>
		);
	}
}

const styles = StyleSheet.create({
	map: { flex: 1 },
});

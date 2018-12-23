import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class TreeMarker extends React.Component {
	render() {
		return (
			<View style={styles.outerCircle}>
				<View style={styles.innerCircle} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	outerCircle: {
		backgroundColor: '#228B22',
		padding: 5,
		borderRadius: 25,
	},
	innerCircle: {
		backgroundColor: '#ffffff',
		padding: 5,
		borderRadius: 25,
	},
});

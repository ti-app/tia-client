import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class TreeCluster extends React.Component {
	render() {
		const { pointCount } = this.props;
		return (
			<View style={styles.clusterContainer}>
				<Text style={styles.clusterText}>{pointCount}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	clusterContainer: {
		width: 40,
		height: 40,
		padding: 6,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'green',
	},
	clusterText: {
		fontSize: 15,
		color: '#ffffff',
		fontWeight: '500',
		textAlign: 'center',
	},
});

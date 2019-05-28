import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getColorByTreeStatus } from '../../utils/ColorMapping';

export default ({ pointCount, status }) => {
	return (
		<View style={{ ...styles.clusterContainer, backgroundColor: getColorByTreeStatus(status) }}>
			<Text style={styles.clusterText}>{pointCount}</Text>
		</View>
	);
};

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

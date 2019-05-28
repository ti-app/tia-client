import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getColorByTreeStatus } from '../../utils/ColorMapping';

export default ({ status }) => (
	<View style={{ ...styles.outerCircle, backgroundColor: getColorByTreeStatus(status) }}>
		<View style={styles.innerCircle} />
	</View>
);

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

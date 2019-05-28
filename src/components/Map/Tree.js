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
		padding: 0,
		borderRadius: 7.5,
		width: 15,
		height: 15,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	innerCircle: {
		backgroundColor: '#ffffff',
		width: 10,
		height: 10,
		borderRadius: 5,
	},
});

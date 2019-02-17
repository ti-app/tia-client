import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { getColorByTreeStatus } from '../../utils/ColorMapping';

export default class TreeCluster extends React.Component {
	render() {
		const { pointCount, status } = this.props;
		return (
			<View style={{ ...styles.clusterContainer, backgroundColor: getColorByTreeStatus(status) }}>
				<Text style={styles.clusterText}>{pointCount}</Text>
			</View>
		);
	}
}

TreeCluster.propTypes = {
	pointCount: PropTypes.number.isRequired,
	status: PropTypes.string.isRequired,
};

TreeCluster.defaultProps = {
	pointCount: 0,
	status: 'healthy',
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

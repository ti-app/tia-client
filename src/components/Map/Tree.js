import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { getColorByTreeStatus } from '../../utils/ColorMapping';

export default class TreeMarker extends React.Component {
	render() {
		const { status } = this.props;

		return (
			<View style={{ ...styles.outerCircle, backgroundColor: getColorByTreeStatus(status) }}>
				<View style={styles.innerCircle} />
			</View>
		);
	}
}

TreeMarker.propTypes = {
	status: PropTypes.string.isRequired,
};

TreeMarker.defaultProps = {
	pointCount: 0,
	status: 'healthy',
};

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

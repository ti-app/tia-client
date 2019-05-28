/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { toggleSpotDetails } from '../../store/actions/ui-interactions.action';
import { getColorByTreeStatus } from '../../utils/ColorMapping';

class Spot extends Component {
	// state = {
	//     splittedTrees: false
	// };

	render() {
		const { trees, health } = this.props;

		return (
			<View style={{ ...styles.treeGroup, backgroundColor: getColorByTreeStatus(health) }}>
				<Text style={styles.treeCountText}>{trees.length}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	treeGroup: {
		width: 20,
		height: 20,
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	treeCountText: {
		color: 'white',
	},
});

const mapDispatchToProps = (dispatch) => ({
	toggleSpotDetails: () => dispatch(toggleSpotDetails),
});

export default connect(
	null,
	mapDispatchToProps
)(Spot);

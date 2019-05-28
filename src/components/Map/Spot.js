/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { StyleSheet, View } from 'react-native';
// import { getColorByTreeStatus } from '../../utils/ColorMapping';
import Tree from './Tree';

const renderTree = (id, top, left, status) => (
	<View key={id} style={{ top, left }}>
		<Tree status={status} />
	</View>
);

export default ({ trees }) => {
	const division = 360 / trees.length;
	const radius = 50;
	const offsetToParentCenter = 60;
	const offsetToChildCenter = 10;
	const totalOffset = offsetToParentCenter - offsetToChildCenter;

	return (
		<View style={styles.parentView}>
			{trees.map(({ id, status }, i) => {
				const y = Math.sin(division * i * (Math.PI / 180)) * radius;
				const x = Math.cos(division * i * (Math.PI / 180)) * radius;
				const top = y + totalOffset;
				const left = x + totalOffset;
				return renderTree(id, top, left, status);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	parentView: {
		position: 'relative',
		width: 120,
		height: 120,
		// borderWidth: 2,
		// borderColor: '#f00'
	},
	outerCircle: {
		position: 'absolute',
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

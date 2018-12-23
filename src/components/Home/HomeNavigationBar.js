import React from 'react';

import { StyleSheet } from 'react-native';

import { View, Text } from 'native-base';

export default ({ nearbySpotsCount }) => (
	<View style={styles.container}>
		<View style={styles.menuButton} />
		<View>
			<Text style={styles.title}> Nearby </Text>
			<Text style={styles.info}>{nearbySpotsCount} spots around you</Text>
		</View>
		<View style={styles.filterButton} />
	</View>
);

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		height: 80,
		backgroundColor: 'white',
		borderBottomColor: 'red',
		borderBottomWidth: 2,
	},
	title: {
		alignSelf: 'center',
	},
	info: {
		alignSelf: 'center',
	},
	menuButton: {},
	filterButton: {},
});

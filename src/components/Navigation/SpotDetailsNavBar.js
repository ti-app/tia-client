import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
import { AntDesign, Feather } from '@expo/vector-icons';

export const SpotDetailsNavBar = ({ leftOption }) => (
	<View style={styles.container}>
		<TouchableOpacity style={styles.leftButton} onPress={() => leftOption.action()}>
			<AntDesign name="arrowleft" size={20} />
		</TouchableOpacity>
		<View style={styles.titleContainer}>
			<Text style={styles.title}> Spot Details </Text>
		</View>
		<View style={styles.placeholder} />
	</View>
);

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	titleContainer: {
		marginTop: 10,
		flex: 1,
	},
	title: {
		alignSelf: 'center',
		fontSize: 18,
	},
	leftButton: {
		// display: 'flex',
		// flexDirection: 'column',
		// justifyContent: 'center',
		paddingLeft: 10,
		flex: 1,
	},
	leftIcon: { color: '#fff' },
	placeholder: {
		flex: 1,
	},
});

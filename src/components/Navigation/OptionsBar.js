import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';

export const OptionsBar = ({ title, leftOption, rightOption }) => (
	<View style={styles.container}>
		<TouchableOpacity style={styles.leftButton} onPress={() => leftOption.action()}>
			<Text style={styles.leftOptionLabel}> {leftOption.label} </Text>
		</TouchableOpacity>
		<View style={styles.titleContainer}>
			<Text style={styles.title}> {title} </Text>
		</View>
		<TouchableOpacity style={styles.rightButton} onPress={() => rightOption.action()}>
			<Text style={styles.rightOptionLabel}> {rightOption.label} </Text>
		</TouchableOpacity>
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
	},
	title: {
		alignSelf: 'center',
		fontWeight: 'bold',
		fontSize: 18,
	},
	leftOptionLabel: {},
	rightOptionLabel: {},
	leftButton: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: 10,
	},
	rightButton: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		paddingRight: 10,
	},
});

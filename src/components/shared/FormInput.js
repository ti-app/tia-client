import React from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';

import { space } from '../../styles/variables';
import { gray, lightGray, black } from '../../styles/colors';

const FormInput = (props) => (
	<View style={styles.container}>
		<View style={styles.icon}>{props.icon}</View>
		<TextInput {...props} placeholderTextColor={gray} style={styles.input} />
		<TouchableOpacity style={styles.secondaryIcon} onPress={props.secondaryIconPress}>
			{props.secondaryIcon}
		</TouchableOpacity>
	</View>
);

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: lightGray,
		marginBottom: space.small,
		paddingLeft: space.small,
		paddingRight: space.small,
	},
	icon: {
		opacity: 0.5,
		alignSelf: 'center',
		padding: space.small,
	},
	secondaryIcon: {
		opacity: 0.5,

		display: 'flex',
		flexDirection: 'column',
		alignSelf: 'center',
		padding: space.small,
	},
	input: {
		flex: 1,
		fontFamily: 'product-sans',
		color: black,
		height: 40,
	},
};

export default FormInput;

import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'native-base';

import ProductText from './ProductText';

import { white } from '../../styles/colors';

const ProductButton = ({ onPress, ...props }) => (
	<Button onPress={onPress} {...props}>
		<ProductText {...props} style={[styles.text]} />
	</Button>
);

const styles = StyleSheet.create({
	text: {
		color: white,
		alignSelf: 'center',
	},
});

export default ProductButton;

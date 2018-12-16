import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'native-base';

import ProductText from './ProductText';

import { black } from '../../styles/colors';

const ProductButton = (props) => (
	<Button {...props}>
		<ProductText {...props} style={[styles.text]} />
	</Button>
);

const styles = StyleSheet.create({
	text: {
		color: black,
		alignSelf: 'center',
	},
});

export default ProductButton;

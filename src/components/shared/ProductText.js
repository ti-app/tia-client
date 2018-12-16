import React from 'react';
import { Text } from 'native-base';
import { darkGray } from '../../styles/colors';

export default class ProductText extends React.Component {
	render() {
		return (
			<Text
				{...this.props}
				style={[{ fontFamily: 'product-sans', color: darkGray }, this.props.style]}
			/>
		);
	}
}

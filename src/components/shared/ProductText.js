import React from 'react';
import { Text } from 'react-native';

export default class ProductText extends React.Component {
    render() {
        return (
            <Text
                {...this.props}
                style={[{ fontFamily: 'product-sans', color: '#7e7e7e' }, this.props.style]}
            />
        );
    }
}

import React from 'react';
import { TextInput } from 'react-native';

export default class FormInput extends React.Component {
    render() {
        return (
            <TextInput
                {...this.props}
                style={[
                    this.props.style,
                    {
                        fontFamily: 'product-sans',
                        color: '#000',
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                    },
                ]}
            />
        );
    }
}

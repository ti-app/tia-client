import React from 'react';
import { TextInput, View } from 'react-native';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#eeeeee',
        borderRadius: 4,
        marginBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
    },
    icon: {
        opacity: 0.5,
        alignSelf: 'center',
        padding: 5,
    },
    input: {
        flex: 1,
        fontFamily: 'product-sans',
        color: '#000',
        height: 40,
    },
};

const FormInput = (props) => (
    <View style={styles.container}>
        <View style={styles.icon}>{props.icon}</View>
        <TextInput {...props} placeholderTextColor="#bebebe" style={[props.style, styles.input]} />
    </View>
);

export default FormInput;

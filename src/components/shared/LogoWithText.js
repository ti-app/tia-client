import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ProductText from './ProductText';

import { space } from '../../styles/variables';

export const LogoWithText = (props) => {
    return (
        <View style={[styles.iconContainer, props.style]}>
            <Image style={styles.icon} source={require('../../../assets/images/icon.png')} />
            <ProductText>TIA | Tree Irrigation APP</ProductText>
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 30,
        width: 30,
        margin: space.base,
    },
});

export default LogoWithText;

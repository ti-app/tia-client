import React from 'react';
import { View, Image } from 'react-native';
import ProductText from './ProductText';

export const LogoWithText = () => {
    return (
        <View style={styles.iconContainer}>
            <Image style={styles.icon} source={require('../../assets/images/icon.png')} />
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
        margin: 20,
    },
});

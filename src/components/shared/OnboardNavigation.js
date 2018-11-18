import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RkButton } from 'react-native-ui-kitten';

import ProductText from './ProductText';

const register = () => (
    <View>
        <ProductText>Not a member yet?</ProductText>
        <RkButton rkType="outline">Register</RkButton>
    </View>
);

const login = () => (
    <View>
        <ProductText>Already a member?</ProductText>
        <RkButton rkType="clear">Login</RkButton>
    </View>
);

const OnboardNavigation = (props) => (
    <View>
        {props.linkToRegister && !props.linkToLogin ? register() : null}
        {!props.linkToRegister && props.linkToLogin ? login() : null}
    </View>
);

export default OnboardNavigation;

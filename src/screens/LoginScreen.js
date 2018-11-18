import React from 'react';
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';

import ProductText from '../components/shared/ProductText';
import Login from '../components/Login/Login';
import LoginForm from '../components/Login/LoginForm';
import SocialLogin from '../components/Login/SocialLogin';
import OnboardNavigation from '../components/shared/OnboardNavigation';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.iconContainer}>
                        <Image
                            style={styles.icon}
                            source={require('../../assets/images/icon.png')}
                        />
                        <ProductText>TIA | Tree Irrigation APP</ProductText>
                        {/* <Login /> */}
                    </View>
                    <LoginForm />
                    <SocialLogin />
                    <OnboardNavigation linkToRegister />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        justifyContent: 'center',
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    formContainer: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    loadingText: {
        fontSize: 20,
    },
    icon: {
        height: 30,
        width: 30,
        margin: 20,
    },
});

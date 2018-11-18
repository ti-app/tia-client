import React from 'react';
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';

import ProductText from '../components/shared/ProductText';
import Login from '../components/Login/Login';
import LoginForm from '../components/Login/LoginForm';
import SocialLogin from '../components/Login/SocialLogin';
import OnboardNavigation from '../components/shared/OnboardNavigation';
import OnboardDivider from '../components/shared/OnboardDivider';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.iconContainer}>
                        <Image
                            style={styles.icon}
                            source={require('../../assets/images/icon.png')}
                        />
                        <ProductText>TIA | Tree Irrigation APP</ProductText>
                        {/* <Login /> */}
                    </View>
                    <LoginForm style={styles.formContainer} />
                    <OnboardDivider style={styles.dividerContainer} />
                    <SocialLogin style={styles.socialContainer} />
                    <OnboardNavigation style={styles.onboardContainer} linkToRegister />
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
        paddingLeft: 16,
        paddingRight: 16,
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    formContainer: {
        marginBottom: 16,
    },
    dividerContainer: {
        marginBottom: 16,
    },
    socialContainer: {
        marginBottom: 16,
    },
    onboardContainer: {
        alignSelf: 'center',
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

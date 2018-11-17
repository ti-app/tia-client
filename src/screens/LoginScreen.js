import React from 'react';
import { StyleSheet, View, Image, TextInput } from 'react-native';
import ProductText from '../components/ProductText';
import Login from '../components/Login/Login';
export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
    }

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
                    <Login />
                    </View>
                    <View style={styles.formContainer}>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />
                    </View>
                    <View style={styles.extrasContainer} />
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

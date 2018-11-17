import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
// import LogoWithText from '../components/LogoWithText';

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Email Address' };
    }

    onResetPasswordPress() {
        console.log('Reset Password clicked!');
    }

    render() {
        return (
            <View>
                {/* <LogoWithText /> */}
                <View>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                    <Button onPress={this.onResetPasswordPress} title="SEND PASSWORD RESET LINK" />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({ formContainer: {} });

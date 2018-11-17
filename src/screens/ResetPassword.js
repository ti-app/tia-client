import React from 'react';
import { StyleSheet, View, TextIn, Button } from 'react-native';
// import LogoWithText from '../components/LogoWithText';

export default class ResetPassword extends React.Component {
    render() {
        return (
            <View>
                <LogoWithText />
                <View style={styles.formContainer}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                    <Button>SEND PASSWORD RESET LINK</Button>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({});

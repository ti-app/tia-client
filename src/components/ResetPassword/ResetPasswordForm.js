import React from 'react';
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';

import { RkButton } from 'react-native-ui-kitten';
import { Entypo } from '@expo/vector-icons';

import FormInput from '../shared/FormInput';

import { space } from '../../styles/variables';

export default class ResetPasswordForm extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <FormInput
                    icon={<Entypo name="user" />}
                    placeholder="Email Address"
                    textContentType="emailAddress"
                />
                <View>
                    <RkButton
                        rkType="stretch success"
                        contentStyle={{ fontFamily: 'product-sans' }}
                    >
                        SEND PASSWORD RESET LINK
                    </RkButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: space.base,
        paddingRight: space.base,
    },
});

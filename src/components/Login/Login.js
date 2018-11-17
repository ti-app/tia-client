import React, { Component } from 'react';
import { View, Keyboard, Dimensions, LayoutAnimation } from 'react-native';

import { FbSignInUpButton } from './FbSignInUpButton';

class Login extends Component {
    render(){
        return (
            <View >
            <FbSignInUpButton />
          </View>
        )
    }
}
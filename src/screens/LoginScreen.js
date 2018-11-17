import React, { Component } from 'react';
import { View } from 'react-native';

import Login from '../components/Login/Login';
import loadAssetsAsync from '../utils/LoadFonts';

class LoginScreen extends Component {
    componentDidMount(){
        loadAssetsAsync();
    }
    render(){
        return (
            <Login />
        )
    }
}
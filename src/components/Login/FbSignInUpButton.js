import React, { Component } from 'react';
import { View, Dimensions, Image, Text } from 'react-native';
import { FontAwesome } from '../../../assets/fonts/FontAwesome.ttf';
import { RkButton, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class FbSignInUpButton extends Component {
    render() {
        return (
            <View style={styles.buttons}>
                <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
                    Login with Facebook
                </Icon.Button>
            </View>
        );
    }
}
let styles = RkStyleSheet.create((theme) => ({
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    fb: {
      flex: 4,
      marginLeft: 10,
      marginVertical: 1
    }
  }));

//   export default connect(mapStateToProps, {
//     facebookSignin, facebookSignup
//   })(FbSignInUpButton);

import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import {FontAwesome} from '../../../assets/fonts/FontAwesome.ttf';
import { RkButton, RkText, RkStyleSheet } from 'react-native-ui-kitten';


export default class FbSignInUpButton extends Component {
    render() {
        return (
            <View style={styles.buttons}>
                <RkButton style={styles.button} rkType="social">
                    <RkText
                        onPress={() => {
                            this._pressSignInUp();
                        }}
                        rkType="awesome hero accentColor"
                        style={{ fontFamily: 'fontawesome' }}
                    >
                        awdawdeawea
                        {/* {FontAwesome.facebook} */}
                    </RkText>
                </RkButton>
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

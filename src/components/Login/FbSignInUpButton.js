import React, { Component } from 'react';
import { View } from 'react-native';
import { RkButton, RkText, RkStyleSheet } from 'react-native-ui-kitten';
// import { FontAwesome } from './../../assets/fonts';

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
        marginBottom: scaleVertical(24),
        justifyContent: 'space-between',
    },
    fb: {
        flex: 4,
        marginLeft: 10,
        marginVertical: 1,
        height: scale(56),
    },
}));

//   export default connect(mapStateToProps, {
//     facebookSignin, facebookSignup
//   })(FbSignInUpButton);

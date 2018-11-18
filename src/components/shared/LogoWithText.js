import React from "react";
import { View, Image, StyleSheet } from "react-native";
import ProductText from "./ProductText";

import { space, font } from "../../styles/variables";

export const LogoWithText = props => {
    return (
        <View style={[styles.iconContainer, props.style]}>
            <Image style={styles.icon} source={require("../../../assets/images/icon.png")} />
            <ProductText style={styles.appName}>Tree Irrigation App</ProductText>
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        alignSelf: "center",
        height: 60,
        width: 60,
        margin: space.base,
        borderRadius: 12
    },

    appName: {
        alignSelf: "center",
        fontSize: font.large
    }
});

export default LogoWithText;

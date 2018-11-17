import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProductText from '../components/shared/ProductText';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <ProductText style={styles.loadingText}>Loading...</ProductText>
            </View>
        );
    }

    componentDidMount() {
        setTimeout(() => this.props.navigation.navigate('Login'), 500);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 20,
    },
});

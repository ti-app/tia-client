import React from 'react';
import { View, Text } from 'react-native';

export default class SideDrawerContent extends React.Component {
    render() {
        return (
            <View
                style={{ 
                    flex: 1, 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: '#EEE' 
                }}>
                <Text>OrderList</Text>
                <Text>Notify</Text>
            </View>
        );
    }
};
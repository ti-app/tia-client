import React from 'react';
import { MapView } from 'expo';
import Drawer from 'react-native-drawer';
import { View } from 'react-native';
import SideDrawerContent from './SideDrawerContent';

export default class HomeScreen extends React.Component {

    state = {
        drawerOpen: false,
        drawerDisabled: false,
    };

    closeDrawer = () => {
        this._drawer.close()
    };

    openDrawer = () => {
        this._drawer.open()
    };

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="static"
                content={
                    <SideDrawerContent />
                }
                acceptDoubleTap
                styles={{ main: { shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15 } }}
                onOpen={() => {
                    console.log('onopen')
                    this.setState({ drawerOpen: true })
                }}
                onClose={() => {
                    console.log('onclose')
                    this.setState({ drawerOpen: false })
                }}
                captureGestures={false}
                tweenDuration={100}
                panThreshold={0.08}
                disabled={this.state.drawerDisabled}
                openDrawerOffset={(viewport) => {
                    return 100
                }}
                closedDrawerOffset={() => 50}
                panOpenMask={0.2}
                negotiatePan>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View>
            </Drawer>
        );
    }
}

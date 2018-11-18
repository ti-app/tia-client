import React from 'react';
import { MapView } from 'expo';
import Drawer from 'react-native-drawer';
import { View, Platform } from 'react-native';
import SideDrawerContent from './SideDrawerContent';
import { getLocationAsync } from '../utils/Navigator';

export default class HomeScreen extends React.Component {
    state = {
        drawerOpen: false,
        drawerDisabled: false,
        location: null,
        errorMessage: null
    };

    closeDrawer = () => {
        this._drawer.close();
    };

    openDrawer = () => {
        this._drawer.open();
    };

    async componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            const location = await getLocationAsync();
            this.setState({ ...this.state, location });
        }
    }

    render() {
        return (
            <Drawer
                ref={(ref) => (this._drawer = ref)}
                type="static"
                content={<SideDrawerContent />}
                acceptDoubleTap
                styles={{ main: { shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15 } }}
                onOpen={() => {
                    console.log('onopen');
                    this.setState({ drawerOpen: true });
                }}
                onClose={() => {
                    console.log('onclose');
                    this.setState({ drawerOpen: false });
                }}
                captureGestures={false}
                tweenDuration={100}
                panThreshold={0.08}
                disabled={this.state.drawerDisabled}
                openDrawerOffset={(viewport) => {
                    return 100;
                }}
                closedDrawerOffset={() => 10}
                panOpenMask={0.5}
                negotiatePan>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: (this.state.location && this.state.location.latitude) || 18.577943,
                            longitude: (this.state.location && this.state.location.longitude) || 73.6742973,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View>
            </Drawer>
        );
    }
}

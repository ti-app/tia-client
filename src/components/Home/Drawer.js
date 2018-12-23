import React from 'react';
import Drawer from 'react-native-drawer';
import { StyleSheet } from 'react-native';

import SideDrawerContent from './SideDrawerContent';

export default class HomeDrawer extends React.Component {
	state = {
		drawerOpen: false,
		drawerDisabled: false,
	};

	closeDrawer = () => {
		this._drawer.close();
	};

	openDrawer = () => {
		this._drawer.open();
	};

	render() {
		const { children } = this.props;
		return (
			<Drawer
				ref={(ref) => (this._drawer = ref)}
				type="static"
				content={<SideDrawerContent />}
				acceptDoubleTap
				styles={{ main: { shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15 } }}
				onOpen={() => {
					this.setState({ drawerOpen: true });
				}}
				onClose={() => {
					this.setState({ drawerOpen: false });
				}}
				captureGestures={false}
				tweenDuration={100}
				panThreshold={0.08}
				disabled={this.state.drawerDisabled}
				openDrawerOffset={(viewport) => {
					return 100;
				}}
				closedDrawerOffset={() => 20}
				panOpenMask={0.2}
				negotiatePan
			>
				{children}
			</Drawer>
		);
	}
}

const styles = StyleSheet.create({});

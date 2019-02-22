import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';

import HomeDrawer from '../components/Home/Drawer';
import HomeMap from '../components/Home/HomeMap';
import HomeNavigationBar from '../components/Navigation/HomeNavigationBar';
import AddActionButton from '../components/shared/AddActionButton';
import FilterTree from '../components/Home/FilterTree';
import { fetchCurrentLocation } from '../store/actions/location';
import { OptionsBar } from '../components/Navigation/OptionsBar';
import { toggleFilter } from '../store/actions/ui-interactions';

class HomeScreen extends React.Component {
	state = {
		isFilterOpen: false,
		defaultHeaderOptions: {
			headerTitle: <HomeNavigationBar nearbySpotsCount={12} />,
			headerTransparent: true,
			headerStyle: {
				height: 80,
				borderBottomColor: 'red',
				backgroundColor: '#ffff',
				opacity: 0.8,
			},
			headerLeft: null,
		},
	};

	static navigationOptions = ({ navigation }) => {
		const header = navigation.getParam('header', {
			headerTitle: <HomeNavigationBar nearbySpotsCount={12} />,
			headerTransparent: true,
			headerStyle: {
				height: 80,
				borderBottomColor: 'red',
				borderBottomWidth: 2,
				backgroundColor: '#ffff',
				opacity: 0.8,
			},
			headerLeft: null,
		});
		return header;
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		const { isFilterOpen, toggleFilter } = nextProps;
		const { defaultHeaderOptions } = prevState;
		const { headerStyle: defaultHeaderStyle } = defaultHeaderOptions;

		if (isFilterOpen !== prevState.isFilterOpen) {
			nextProps.navigation.setParams({
				header: {
					...defaultHeaderOptions,
					headerStyle: {
						...defaultHeaderStyle,
						borderBottomWidth: isFilterOpen ? 0 : 2,
					},
					headerTitle: isFilterOpen ? (
						<OptionsBar
							title="Filters"
							leftOption={{ label: 'Cancel', action: () => toggleFilter() }}
							rightOption={{
								label: 'Save',
								action: () => {
									console.log('Save filter option and do something with it');
								},
							}}
						/>
					) : (
						<HomeNavigationBar nearbySpotsCount={12} />
					),
				},
			});
			return { isFilterOpen };
		} else {
			return null;
		}
	}

	componentDidMount() {
		this.props.fetchCurrentLocation();
	}

	render() {
		const { isFilterOpen } = this.state;

		return (
			<HomeDrawer {...this.props}>
				{isFilterOpen ? (
					<View style={styles.filterContainer}>
						<FilterTree />
					</View>
				) : null}
				<HomeMap />
				<AddActionButton {...this.props} />
			</HomeDrawer>
		);
	}
}

const styles = StyleSheet.create({
	filterContainer: {
		height: 380,
		backgroundColor: 'white',
	},
});

const mapStateToProps = (state) => ({
	isFilterOpen: state.ui.isFilterOpen,
});

const mapDispatchToProps = (dispatch) => ({
	toggleFilter: () => dispatch(toggleFilter()),
	fetchCurrentLocation: () => dispatch(fetchCurrentLocation()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen);

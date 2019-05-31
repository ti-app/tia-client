import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Container, View, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { ImagePicker, Permissions } from 'expo';

import OptionsBar from '../components/Navigation/OptionsBar';
import Tree from '../components/Map/Tree';
import FormInput from '../components/shared/FormInput';
import { SelectTreeHealth } from '../components/shared/SelectTreeHealth';
import { addGroup } from '../store/actions/tree.action';
import { fetchUserLocation } from '../store/actions/location.action';

class AddNewSpotScreen extends React.Component {
	state = {
		photo: null,
		plants: 0,
		health: null,
		treeLocation: null,
	};

	static navigationOptions = ({ navigation }) => {
		const header = navigation.getParam('header', {
			headerTitle: (
				<OptionsBar
					title="Add a new spot"
					leftOption={{
						label: 'Cancel',
						action: () => navigation.navigate('Home'),
					}}
				/>
			),
			headerTransparent: true,
			headerStyle: {
				height: 80,
				backgroundColor: '#ffff',
				opacity: 0.8,
			},
			headerLeft: null,
		});
		return header;
	};

	componentWillMount() {
		const { fetchUserLocation } = this.props;
		fetchUserLocation();
	}

	handleNumberOfPlantsChange = (numberOfPlants) => {
		this.setState({ plants: numberOfPlants });
	};

	handleSelectedStatusChange = (selectedStatus) => {
		const healthEntry = Object.entries(selectedStatus).find((_) => _[1] === true);
		if (healthEntry && healthEntry[0]) {
			this.setState({ health: healthEntry[0] });
		}
	};

	takePhoto = async () => {
		const { status: cameraPerm } = await Permissions.askAsync(Permissions.CAMERA);

		const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
			const pickerResult = await ImagePicker.launchCameraAsync({});
			this.setState({ photo: pickerResult.uri });
		}
	};

	handleAddSpot = () => {
		const { addGroup } = this.props;
		const { photo, plants, health, treeLocation } = this.state;
		const { latitude, longitude } = treeLocation;
		const formData = this.createFormData(photo, {
			plants,
			health,
			lat: latitude,
			lng: longitude,
		});
		addGroup(formData);
	};

	createFormData = (uri, body) => {
		const data = new FormData();
		if (uri) {
			const filename = uri.split('/').pop();
			const type = filename.split('.').pop();

			data.append('photo', {
				uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
				type: `image/${type}`,
				name: filename,
			});
		}

		Object.keys(body).forEach((key) => {
			data.append(key, body[key]);
		});

		return data;
	};

	isAddButtonDisabled = () => {
		const { plants, health } = this.state;
		return !(plants && health);
	};

	handleOnRegionChange = (region) => {
		this.setState({ treeLocation: region });
	};

	render() {
		const { photo, health } = this.state;
		const { userLocation } = this.props;
		const { latitude, longitude } = userLocation;

		return (
			<Container style={styles.container}>
				<View style={styles.mapView}>
					<MapView
						style={styles.mapView}
						initialRegion={{
							latitude,
							longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
						onRegionChangeComplete={this.handleOnRegionChange}
						scrollEnabled={false}
						pitchEnabled={false}
						rotateEnabled={false}
						zoomEnabled={false}
					>
						<Marker key="unique-marker-id-here" coordinate={{ latitude, longitude }}>
							<Tree status={health || 'healthy'} />
						</Marker>
					</MapView>

					{/* <View style={styles.markerFixed}>
                        <Tree status="healthy" />
                    </View> */}
				</View>

				<Text style={styles.whereIsItText}> Where is it?</Text>

				<View style={styles.form}>
					<View style={styles.plantCountInputContainer}>
						<View style={styles.plantCountInput}>
							<FormInput
								placeholder="NUMBER OF PLANTS?"
								keyboardType="number-pad"
								onChangeText={this.handleNumberOfPlantsChange}
							/>
						</View>
					</View>
					<View style={styles.healthButtonGroup}>
						<Text style={styles.healthOfPlantText}> Health of plant(s) </Text>
						<SelectTreeHealth onSelectedStatusChange={this.handleSelectedStatusChange} />
					</View>
					{photo ? (
						<Image
							source={{ uri: photo }}
							resizeMode="contain"
							style={{ width: '100%', height: 150 }}
						/>
					) : (
						<TouchableOpacity style={styles.imageUploadContainer} onPress={this.takePhoto}>
							<Text> Take a photo</Text>
						</TouchableOpacity>
					)}
					<View style={styles.addButtonContainer}>
						<Button
							style={[
								styles.addButton,
								this.isAddButtonDisabled() ? styles.addButtonDisabled : styles.addButtonEnabled,
							]}
							disabled={this.isAddButtonDisabled()}
							success
							onPress={this.handleAddSpot}
						>
							<Text> ADD </Text>
						</Button>
					</View>
				</View>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
	},
	mapView: { flex: 1 },
	markerFixed: {
		zIndex: 3,
		left: '50%',
		marginLeft: -12,
		marginTop: -20,
		position: 'absolute',
		top: '50%',
	},
	form: { flex: 1, flexDirection: 'column', padding: 20, justifyContent: 'space-between' },
	whereIsItText: {
		fontSize: 25,
	},
	plantCountInputContainer: {},
	plantCountInput: {},
	healthOfPlantText: {
		paddingBottom: 10,
	},
	healthButtonGroup: {},
	imageUploadContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 150,
		backgroundColor: 'lightgray',
	},
	imageContainer: {
		width: '100%',
		height: 150,
	},
	image: {
		width: '100%',
	},
	addButtonContainer: {},
	addButton: { justifyContent: 'center', width: '100%' },
	addButtonDisabled: { opacity: 0.4 },
	addButtonEnabled: { opacity: 1 },
});

const mapStateToProps = (state) => ({
	mapCenter: state.location.mapCenter,
	userLocation: state.location.userLocation,
});

const mapDispatchToProps = (dispatch) => ({
	addGroup: (flag) => dispatch(addGroup(flag)),
	fetchUserLocation: () => dispatch(fetchUserLocation()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddNewSpotScreen);

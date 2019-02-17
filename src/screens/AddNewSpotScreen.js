import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, View, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { ImagePicker, Permissions } from 'expo';

import { OptionsBar } from '../components/Navigation/OptionsBar';
import Tree from '../components/Map/Tree';
import FormInput from '../components/shared/FormInput';
import { SelectTreeHealth } from '../components/shared/SelectTreeHealth';

class AddNewSpotScreen extends React.Component {
	state = {};

	static navigationOptions = ({ navigation }) => {
		const header = navigation.getParam('header', {
			headerTitle: (
				<OptionsBar
					title="Add a new spot"
					leftOption={{
						label: 'Cancel',
						action: () => navigation.navigate('Home'),
					}}
					rightOption={{
						label: 'Save',
						action: () => {
							console.log('Save new spot and do something with it');
						},
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

	uploadImage = async () => {
		const { status: cameraPerm } = await Permissions.askAsync(Permissions.CAMERA);

		const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
			let pickerResult = await ImagePicker.launchCameraAsync({});
			// TODO: Do something with the picker result
		}
	};

	render() {
		return (
			<Container style={styles.container}>
				<MapView
					style={styles.mapView}
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
					scrollEnabled={false}
					pitchEnabled={false}
					rotateEnabled={false}
				>
					<Marker
						key="unique-marker-id-here"
						coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
					>
						<Tree status="healthy" />
					</Marker>
				</MapView>

				<Text style={styles.whereIsItText}> Where is it?</Text>

				<View style={styles.form}>
					<View style={styles.plantCountInputContainer}>
						<View style={styles.plantCountInput}>
							<FormInput placeholder="NUMBER OF PLANTS?" />
						</View>
					</View>
					<View style={styles.healthButtonGroup}>
						<Text style={styles.healthOfPlantText}> Health of plant(s) </Text>
						<SelectTreeHealth
							onSelectedStatusChange={(selectedStatus) => {
								console.log(selectedStatus);
							}}
						/>
					</View>
					<TouchableOpacity style={styles.imageUploadContainer} onPress={this.uploadImage}>
						<Text> Take a photo</Text>
					</TouchableOpacity>
					<View style={styles.addButtonContainer}>
						<Button
							style={styles.addButton}
							success
							onPress={() => {
								console.log('add a tree and save this to database');
							}}
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
	addButtonContainer: {},
	addButton: { justifyContent: 'center', width: '100%' },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddNewSpotScreen);

import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Slider } from 'react-native';
import { Container, Content, View, Text, Button } from 'native-base';
import { toggleFilter } from '../../store/actions/ui-interactions.action';
import { SelectTreeHealth } from '../shared/SelectTreeHealth';

class FilterTree extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			minDistance: 1,
			maxDistance: 5,
			distance: 2,
		};
	}

	render() {
		const { distance } = this.state;

		return (
			<Container style={styles.container}>
				<Content style={styles.content}>
					<Text style={styles.textStyle}>How far from you?</Text>
					<View style={styles.view}>
						<Slider
							style={styles.slider}
							step={1}
							minimumValue={this.state.minDistance}
							maximumValue={this.state.maxDistance}
							value={distance}
							onValueChange={(val) => this.setState({ distance: val })}
							thumbTintColor="rgb(252, 228, 149)"
							maximumTrackTintColor="#000"
							minimumTrackTintColor="#2f2f2f"
						/>
					</View>
					<View style={styles.currentDistanceView}>
						<Text style={styles.currentDistance}>{this.state.distance + 'km'}</Text>
					</View>
					<Text style={styles.textStyle}>How much water you can carry?</Text>
					<View style={styles.view}>
						<Button dark>
							<Text> 1-5 Lt. </Text>
						</Button>
						<Button info>
							<Text> 5-10 Lt. </Text>
						</Button>
						<Button light>
							<Text> 10-15 Lt. </Text>
						</Button>
					</View>
					<Text style={styles.textStyle}>Health of the plant(s)</Text>
					<SelectTreeHealth
						onSelectedStatusChange={(selectedStatus) => {
							console.log(selectedStatus);
						}}
						type="multiple"
					/>
				</Content>
			</Container>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	toggleFilter: () => dispatch(toggleFilter()),
});

export default connect(
	null,
	mapDispatchToProps
)(FilterTree);

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		marginTop: 70,
		zIndex: 99,
	},
	content: {
		padding: 20,
	},
	cancelButton: {
		color: '#000',
	},
	saveButton: {
		color: 'green',
	},
	view: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textStyle: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 10,
	},
	slider: {
		padding: 10,
		width: '100%',
	},
	currentDistanceView: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	currentDistance: {
		color: '#000',
	},
});

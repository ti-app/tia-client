import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Image } from 'react-native';
import { View, Text, Container, Content, Button } from 'native-base';

import { waterTree } from '../../store/actions/tree.action';

class SpotDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			waterButton: {
				disabled: false,
				text: 'WATERED',
			},
		};
	}

	renderWeekStatus = (weekStatus) => {
		return (
			<View style={styles.weekStatus}>
				{weekStatus.map((aWeek) => (
					<View key={aWeek.key} style={{ ...styles.weekDot, ...styles[aWeek.status] }} />
				))}
			</View>
		);
	};

	updateWaterButton = (props) => {
		this.setState({ waterButton: { ...props } });
	};

	waterTree = () => {
		this.updateWaterButton({ disabled: true, text: 'please wait...' });
		const { tree } = this.props;
		const spotWatered = tree.spotDetails;
		console.log(`[SpotDetails.js::waterTree] watering tree with id "${spotWatered.id}"`);
		// I am sorry I am doing eslint disable for this one. Don't tell anyone. Shhhh....
		// eslint-disable-next-line react/destructuring-assignment
		this.props.waterTree(spotWatered);
	};

	render() {
		const { waterButton } = this.state;
		return (
			<Container style={styles.container}>
				<View style={styles.content}>
					<View style={styles.heading}>
						<Text style={styles.addressLabel}>Two Stones</Text>
						<Text style={styles.distanceLabel}>1.3 km FROM HOME</Text>
					</View>
					<View style={styles.weekStatusContainer}>
						{this.renderWeekStatus([
							{ key: 1, status: 'healthy' },
							{ key: 2, status: 'healthy' },
							{ key: 3, status: 'healthy' },
							{ key: 4, status: 'healthy' },
							{ key: 5, status: 'healthy' },
							{ key: 6, status: 'healthy' },
							{ key: 7, status: 'healthy' },
						])}
						<Text style={styles.lastWateredText}>LAST WATERED ON 05/10/2018 05:55 PM</Text>
					</View>
					<Image
						source={{
							uri: 'https://media.gettyimages.com/photos/ponthus-beech-picture-id167076876',
						}}
						resizeMode="contain"
						style={{ width: '100%', height: 200 }}
					/>
					<Text>82 more have watered here</Text>
					<Button
						style={styles.wateredButton}
						/**
						 * For some reason, the button does not look 'disabled'
						 * even if waterButton.disabled is true :/
						 */
						disabled={waterButton.disabled}
						success
						onPress={this.waterTree}
					>
						<Text> {waterButton.text} </Text>
					</Button>
				</View>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingRight: 16,
		paddingLeft: 16,
		paddingTop: 8,
		paddingBottom: 16,
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '100%',
	},
	heading: { display: 'flex', flexDirection: 'row' },
	addressLabel: { fontSize: 20, textAlignVertical: 'bottom', paddingRight: 8 },
	distanceLabel: { fontSize: 12, color: 'gray', textAlignVertical: 'bottom' },
	weekStatus: { display: 'flex', flexDirection: 'row' },
	weekStatusContainer: {},
	weekDot: { marginRight: 4, width: 12, height: 12, borderRadius: 6 },
	healthy: { backgroundColor: 'green' },
	weak: { backgroundColor: 'orange' },
	almostDead: { backgroundColor: 'red' },
	lastWateredText: { fontSize: 12, color: 'gray' },
	wateredButton: { width: '100%', paddingRight: 8, paddingLeft: 8, textAlign: 'center' },
});

const mapStateToProps = (state) => ({
	tree: state.tree,
});

const mapDispatchToProps = (dispatch) => ({
	waterTree: (tree) => dispatch(waterTree(tree)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SpotDetails);

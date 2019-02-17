import React from 'react';
import { StyleSheet, Slider } from 'react-native';
import { Container, Content, View, Text, Button } from 'native-base';

export class SelectTreeHealth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedHealthStatus: {
				healthy: false,
				weak: false,
				almostDead: false,
			},
		};
	}

	handleSelection = (field) => {
		const { type } = this.props;
		this.setState(
			(prevState) => {
				return type === 'multiple'
					? {
							selectedHealthStatus: {
								...prevState.selectedHealthStatus,
								[field]: !prevState.selectedHealthStatus[field],
							},
					  }
					: {
							selectedHealthStatus: {
								...{ healthy: false, weak: false, almostDead: false }, // First set all values to false
								[field]: !prevState.selectedHealthStatus[field], // Then make only single value true
							},
					  };
			},
			() => {
				this.props.onSelectedStatusChange(this.state.selectedHealthStatus);
			}
		);
	};

	render() {
		const { healthy, weak, almostDead } = this.state.selectedHealthStatus;
		return (
			<View style={styles.view}>
				<Button
					success
					style={healthy ? null : styles.notSelected}
					onPress={() => this.handleSelection('healthy')}
				>
					<Text> HEALTHY </Text>
				</Button>
				<Button
					warning
					style={weak ? null : styles.notSelected}
					onPress={() => this.handleSelection('weak')}
				>
					<Text> WEAK </Text>
				</Button>
				<Button
					danger
					style={almostDead ? null : styles.notSelected}
					onPress={() => this.handleSelection('almostDead')}
				>
					<Text> ALMOST DEAD </Text>
				</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	view: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	notSelected: {
		opacity: 0.4,
	},
});

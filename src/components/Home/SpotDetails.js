import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';

class SpotDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderWeekStatus = (weekStatus) => {
		weekStatus.forEach((aWeek) => <View style={{ ...styles.weekDot, ...styles[aWeek.status] }} />);
	};

	render() {
		return (
			<Container>
				<Content>
					<View style={styles.heading}>
						<Text style={styles.addressLabel}>Two Stones</Text>
						<Text style={styles.distanceLabel}>1.3 km FROM HOME</Text>
					</View>
					<View style={styles.weekStatus}>
						{this.renderWeekStatus()}
						<Text style={styles.lastWateredText}>LAST WATERED ON 05/10/2018 05:55 PM</Text>
					</View>
					<Image
						source={{
							uri: 'https://media.gettyimages.com/photos/ponthus-beech-picture-id167076876',
						}}
						style={{ width: 400, height: 400 }}
					/>
					<Text>82 more have watered here</Text>
				</Content>
				<Button
					style={styles.wateredText}
					success
					onPress={() => {
						console.log('watered the tree');
					}}
				>
					<Text> WATERED </Text>
				</Button>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	heading: {},
	addressLabel: {},
	distanceLabel: {},
	weekStatus: {},
	lastWateredText: {},
	wateredText: { width: '100%' },
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
	null,
	mapDispatchToProps
)(SpotDetails);

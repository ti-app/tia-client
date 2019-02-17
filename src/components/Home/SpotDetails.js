import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

class SpotDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <Text>spot details Not impelmnted yet</Text>;
	}
}

const styles = StyleSheet.create({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
	null,
	mapDispatchToProps
)(SpotDetails);

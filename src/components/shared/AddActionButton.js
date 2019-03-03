import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import { MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';

export default class AddActionButton extends Component {
	state = {
		clicked: false,
	};

	render() {
		const { clicked } = this.state;
		const { navigation } = this.props;
		return (
			<ActionButton
				buttonColor="#00dbb0"
				onPress={() =>
					this.setState((prevState) => ({
						clicked: !prevState.clicked,
					}))
				}
				renderIcon={() =>
					clicked ? (
						<AntDesign name="plus" size={40} style={styles.icon} />
					) : (
						<MaterialIcons name="add-location" size={40} style={styles.icon} />
					)
				}
			>
				<ActionButton.Item buttonColor="#f5a623" title="Coming soon!" onPress={() => {}}>
					<AntDesign name="question" size={40} style={styles.icon} />
				</ActionButton.Item>
				<ActionButton.Item
					buttonColor="#4267b2"
					title="Add a tree"
					onPress={() => navigation.navigate('AddNewSpot')}
				>
					<Entypo name="tree" size={40} style={styles.icon} />
				</ActionButton.Item>
			</ActionButton>
		);
	}
}

const styles = StyleSheet.create({
	icon: { color: '#fff' },
});

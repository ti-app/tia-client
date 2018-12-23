import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import { MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';

export default class AddActionButton extends Component {
	state = {
		clicked: false,
	};
	render() {
		return (
			<ActionButton
				buttonColor="rgba(0,255,0,1)"
				onPress={() =>
					this.setState((prevState) => ({
						clicked: !prevState.clicked,
					}))
				}
				renderIcon={() =>
					this.state.clicked ? (
						<AntDesign name="plus" size={40} style={styles.icon} />
					) : (
						<MaterialIcons name="add-location" size={40} style={styles.icon} />
					)
				}
			>
				<ActionButton.Item buttonColor="#3498db" title="Coming soon!" onPress={() => {}}>
					<AntDesign name="question" size={40} style={styles.icon} />
				</ActionButton.Item>
				<ActionButton.Item
					buttonColor="#9b59b6"
					title="Add a tree"
					onPress={() => console.log('notes tapped!')}
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

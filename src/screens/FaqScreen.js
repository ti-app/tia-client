import React from 'react';
import { Text, StyleSheet, View, ScrollView, h4 } from 'react-native';
import { Container } from 'native-base';

export default class FaqScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container style={styles.container}>
				<ScrollView>
					<View style={styles.view}>
						<Text style={styles.question}>What is TIA?</Text>
						<Text style={styles.answer}>
							A social networking app to give voice to young plants. Users associated with this app
							can recognize young plants who needs caring on the field and add information about
							them to the app. Once the plant is added, it becomes visible to all other users. The
							plant health changes with every passing day and they regain their full health once the
							user water the plants.
						</Text>
						<Text style={styles.question}>Is this app going to be free forever?</Text>
						<Text style={styles.answer}>
							Yes. This app is aimed to sustain as many young plants as possible and it's a
							necessity to restore the ecological balance of the planet. TIA is aimed to connect
							everyone for this cause and hence it makes sense to keep it free always.
						</Text>
						<Text style={styles.question}>What does the dots on the map denotes?</Text>
						<Text style={styles.answer}>
							Every dot on the map stands for one plant. User can click on these dots and fetch
							information about the plant, update plant health or add more information about the
							plant.
						</Text>
						<Text style={styles.question}>How is the color of the plant (dots) decided?</Text>
						<Text style={styles.answer}>
							The green color means the plant has been recently taken care of and red color means
							the plant has been neglected for a longer period. As soon as the plant is watered, the
							color of the dot representing the plant changes to green. There is also a concept of
							healthcycle represented by number of days. After that many days as represented by
							healthcycle, the color of the dot will change to red. In between the dot will move
							from green to greenish yellow to yellow to orange to red.
						</Text>
						<Text style={styles.question}>
							What happens if more than one user upload the same plant more than once?
						</Text>
						<Text style={styles.answer}>
							The moderator of the area will ensure that there are no duplicacies. However given the
							tolerance of the map, there may be duplicates.
						</Text>
						<Text style={styles.question}>When can the plants be deleted from the app?</Text>
						<Text style={styles.answer}>
							Any plant once uploaded can be deleted under two scenarios: The plant has attained
							maturity and can look after itself without any human intervention The plant is dead
							for sure or uprooted. In this case the plant site can be made available for future
							plantation provided there are no hurdles. Note that any plant deleted from the app
							will not be deleted permanently unless a moderator approves.
						</Text>
					</View>
				</ScrollView>
			</Container>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		height: 600,
	},
	view: {
		padding: 15,
	},
	question: {
		fontSize: 18,
		fontWeight: '600',
	},
	answer: {
		paddingTop: 5,
		color: 'black',
	},
});

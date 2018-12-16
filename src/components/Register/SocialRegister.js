import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProductButton from '../shared/ProductButton';

export default class SocialRegister extends React.Component {
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				<View style={styles.button}>
					<ProductButton full style={styles.facebookButton}>
						REGISTER WITH F
					</ProductButton>
				</View>
				<View style={styles.button}>
					<ProductButton full style={styles.googleButton}>
						REGISTER WITH G
					</ProductButton>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
	},
	button: {
		flex: 1,
	},
	facebookButton: {
		backgroundColor: '#3C5A99',
	},
	googleButton: {
		backgroundColor: '#BD4A39',
	},
});

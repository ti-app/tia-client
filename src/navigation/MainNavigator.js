import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import AddNewSpotScreen from '../screens/AddNewSpotScreen';

const MainNavigator = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
		},
		AddNewSpot: {
			screen: AddNewSpotScreen,
		},
	},
	{ initialRouteName: 'Home' }
);

export default createAppContainer(MainNavigator);

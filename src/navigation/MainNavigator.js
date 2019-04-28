import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import AddNewSpotScreen from '../screens/AddNewSpotScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const MainNavigator = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
		},
		AddNewSpot: {
			screen: AddNewSpotScreen,
		},
		UserProfile: {
			screen: UserProfileScreen,
		},
	},
	{ initialRouteName: 'Home' }
);

export default createAppContainer(MainNavigator);

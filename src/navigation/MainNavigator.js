import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import AddNewSpotScreen from '../screens/AddNewSpotScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import FaqScreen from '../screens/FaqScreen';

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
		Faq: {
			screen: FaqScreen,
		},
	},
	{ initialRouteName: 'Home' }
);

export default createAppContainer(MainNavigator);

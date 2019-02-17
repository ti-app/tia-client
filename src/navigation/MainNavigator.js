import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AddNewSpotScreen from '../screens/AddNewSpotScreen';

const AppNavigator = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
		},
		Login: {
			screen: LoginScreen,
		},
		ResetPassword: {
			screen: ResetPasswordScreen,
		},
		Register: {
			screen: RegisterScreen,
		},
		AddNewSpot: {
			screen: AddNewSpotScreen,
		},
	},
	{ initialRouteName: 'Home' }
);

export default createAppContainer(AppNavigator);

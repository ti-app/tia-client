import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoadingScreen from '../screens/LoadingScreen';

const AppNavigator = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
		},
		Loading: {
			screen: LoadingScreen,
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
	},
	{ initialRouteName: 'Loading' }
);

export default createAppContainer(AppNavigator);

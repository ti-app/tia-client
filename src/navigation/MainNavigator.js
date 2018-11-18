import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPassword';

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
    },
    { initialRouteName: 'Login' }
);

export default createAppContainer(AppNavigator);

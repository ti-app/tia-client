import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPassword';

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Login: {
        screen: LoginScreen,
    },
    Reset: {
        screen: ResetPasswordScreen,
    },
});

export default createAppContainer(AppNavigator);

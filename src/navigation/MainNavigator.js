import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/LoginScreen';

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Login: {
        screen: LoginScreen,
    },
});

export default createAppContainer(AppNavigator);

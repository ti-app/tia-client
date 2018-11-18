import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPassword';

const AppNavigator = createStackNavigator({
  Reset: {
    screen: ResetPasswordScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  Login: {
    screen: LoginScreen,
  },
});

export default createAppContainer(AppNavigator);

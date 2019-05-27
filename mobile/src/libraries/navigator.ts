import { createStackNavigator } from 'react-navigation';
import AuthenticationScreen from '../modules/auth/screens/AuthenticationScreen';
import { HomeScreen } from '../modules/home/screens/HomeScreen';
import RegistrationScreen from '../modules/auth/screens/RegistrationScreen';
import { MAIN_COLOR } from '../theme/colors';

export const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Authentication: AuthenticationScreen,
    Registration: RegistrationScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: MAIN_COLOR,
      },
      headerTintColor: '#ffffff',
    },
  },
);

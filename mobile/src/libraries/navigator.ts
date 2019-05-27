import { useScreens } from 'react-native-screens';
import { createStackNavigator } from 'react-navigation';
import AuthenticationScreen from '../modules/auth/screens/AuthenticationScreen';
import { HomeScreen } from '../modules/home/screens/HomeScreen';
import { MAIN_COLOR } from '../theme/colors';

useScreens();

export const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Authentication: AuthenticationScreen,
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

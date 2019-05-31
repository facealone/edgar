import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import AuthenticationScreen from '../modules/auth/screens/AuthenticationScreen';
import { HomeScreen } from '../modules/home/screens/HomeScreen';
import RegistrationScreen from '../modules/auth/screens/RegistrationScreen';
import { MAIN_COLOR } from '../theme/colors';
import { IAuthenticationState } from '../modules/auth/types/authentication';
import { AddHouseScreen } from '../modules/house/screens/AddHouseScreen';

const options = {
  headerStyle: {
    backgroundColor: MAIN_COLOR,
  },
  headerTintColor: '#ffffff',
};

const AuthStack = createStackNavigator(
  {
    Home: HomeScreen,
    Authentication: AuthenticationScreen,
    Registration: RegistrationScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: options,
  },
);

const AppStack = createStackNavigator(
  {
    AddHouse: AddHouseScreen,
  },
  {
    initialRouteName: 'AddHouse',
    defaultNavigationOptions: options,
  },
);

export const createRootNavigator = (auth: IAuthenticationState) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        Auth: AuthStack,
        App: AppStack,
      },
      {
        initialRouteName: true === auth.authenticated ? 'App' : 'Auth',
      },
    ),
  );
};

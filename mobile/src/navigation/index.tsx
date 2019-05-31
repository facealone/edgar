import React, { Fragment } from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { MAIN_COLOR } from '../theme/colors';
import { HomeScreen } from '../modules/home/screens/HomeScreen';
import AuthenticationScreen from '../modules/auth/screens/AuthenticationScreen';
import AddHouseScreen from '../modules/house/screens/AddHouseScreen';
import RegistrationScreen from '../modules/auth/screens/RegistrationScreen';
import { BottomTabsStack } from './bottomTabs';
import AuthLoadingScreen from '../modules/auth/screens/AuthLoadingScreen';
import SendVoucherScreen from '../modules/house/screens/member/SendVoucherScreen';
import { Button, Icon } from 'native-base';

const options = {
  headerStyle: {
    backgroundColor: MAIN_COLOR,
  },
  headerTintColor: '#ffffff',
};

const LogoutNavigator = createStackNavigator(
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

const HouseInitNavigator = createStackNavigator(
  {
    AddHouse: AddHouseScreen,
  },
  {
    initialRouteName: 'AddHouse',
    defaultNavigationOptions: options,
  },
);

const MembersInitNavigator = createStackNavigator(
  {
    SendVoucher: SendVoucherScreen,
  },
  {
    initialRouteName: 'SendVoucher',
    defaultNavigationOptions: options,
  },
);

const AppNavigator = createStackNavigator(
  {
    BottomTabs: {
      screen: BottomTabsStack,
      navigationOptions: {
        title: 'Boulevard Ney', // todo : dynamic house name
        headerRight: (
          <Fragment>
            <Button transparent>
              <Icon
                name={'ios-notifications'}
                style={{ color: '#fff', marginTop: 7 }}
              />
            </Button>
            <Button transparent>
              <Icon
                name={'ios-settings'}
                style={{ color: '#fff', marginTop: 7 }}
              />
            </Button>
          </Fragment>
        ),
      },
    },
    AddHouse: AddHouseScreen,
    SendVoucher: SendVoucherScreen,
  },
  {
    initialRouteName: 'BottomTabs',
    defaultNavigationOptions: options,
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Logout: LogoutNavigator,
      HouseInit: HouseInitNavigator,
      MembersInit: MembersInitNavigator,
      App: AppNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

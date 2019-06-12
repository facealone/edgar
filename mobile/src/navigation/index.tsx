import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { Button, Icon } from 'native-base';
import { MAIN_COLOR } from '../theme/colors';
import { HomeScreen } from '../modules/home/screens/HomeScreen';
import AuthenticationScreen from '../modules/auth/screens/AuthenticationScreen';
import HouseAddScreen from '../modules/house/screens/AddScreen';
import RegistrationScreen from '../modules/auth/screens/RegistrationScreen';
import { BottomTabsStack } from './bottomTabs';
import AuthLoadingScreen from '../modules/auth/screens/AuthLoadingScreen';
import SendVoucherScreen from '../modules/house/screens/member/SendVoucherScreen';
import CardShowScreen from '../modules/card/screens/ShowScreen';
import CardAddScreen from '../modules/card/screens/AddScreen';
import ShopAddScreen from '../modules/shop/screens/AddScreen';
import { ScanScreen } from '../modules/card/screens/ScanScreen';
import RecipeBrowseScreen from '../modules/recipe/screens/BrowseScreen';
import { commonStyles } from '../theme/common';

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
    HouseAdd: HouseAddScreen,
  },
  {
    initialRouteName: 'HouseAdd',
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
          <>
            <Button transparent>
              <Icon
                name={'ios-notifications'}
                style={commonStyles.headerIcon}
              />
            </Button>
            <Button transparent>
              <Icon name={'person-add'} style={commonStyles.headerIcon} />
            </Button>
          </>
        ),
      },
    },
    HouseAdd: HouseAddScreen,
    SendVoucher: SendVoucherScreen,
    CardShow: CardShowScreen,
    CardScan: ScanScreen,
    CardAdd: CardAddScreen,
    ShopAdd: ShopAddScreen,
    RecipeBrowser: RecipeBrowseScreen,
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

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
import SendVoucherScreen from '../modules/house/screens/voucher/SendVoucherScreen';
import CardShowScreen from '../modules/card/screens/ShowScreen';
import CardAddScreen from '../modules/card/screens/AddScreen';
import ShopAddScreen from '../modules/shop/screens/AddScreen';
import { ScanScreen } from '../modules/card/screens/ScanScreen';
import RecipeBrowseScreen from '../modules/recipe/screens/BrowseScreen';
import { commonStyles } from '../theme/common';
import RecipeAddScreen from '../modules/recipe/screens/AddScreen';
import RecipeShowScreen from '../modules/recipe/screens/ShowScreen';
import CurrentHouseTitle from '../modules/house/components/CurrentHouseTitle';
import HouseListScreen from '../modules/house/screens/ListScreen';
import HouseShowScreen from '../modules/house/screens/ShowScreen';
import BudgetTransactionListScreen from '../modules/budget/screens/transaction/ListScreen';

const options = {
  headerStyle: {
    backgroundColor: MAIN_COLOR,
  },
  headerTitleStyle: {
    fontSize: 19,
    fontWeight: 'normal',
    fontFamily: 'Roboto',
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
        headerTitle: <CurrentHouseTitle />,
        headerRight: (
          <>
            <Button transparent>
              <Icon
                name={'ios-notifications-outline'}
                style={commonStyles.headerIcon}
              />
            </Button>
          </>
        ),
      },
    },
    HouseAdd: HouseAddScreen,
    HouseList: HouseListScreen,
    HouseShow: HouseShowScreen,
    SendVoucher: SendVoucherScreen,
    CardShow: CardShowScreen,
    CardScan: ScanScreen,
    CardAdd: CardAddScreen,
    ShopAdd: ShopAddScreen,
    RecipeBrowser: RecipeBrowseScreen,
    RecipeAdd: RecipeAddScreen,
    RecipeShow: RecipeShowScreen,
    BudgetTransactionList: BudgetTransactionListScreen,
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

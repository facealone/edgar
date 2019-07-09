import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MAIN_COLOR } from '../theme/colors';
import { Icon } from 'native-base';
import CardListScreen from '../modules/card/screens/ListScreen';
import BudgetListScreen from '../modules/budget/screens/ListScreen';
import i18n from '../i18n';
import { HouseTabsStack } from './houseTabs';
import SettingsScreen from '../modules/common/screens/SettingsScreen';

export const BottomTabsStack = createMaterialBottomTabNavigator(
  {
    House: {
      screen: HouseTabsStack,
      navigationOptions: {
        tabBarLabel: i18n.t('navigation.home'),
        tabBarIcon: () => (
          <Icon style={{ color: MAIN_COLOR }} name={'ios-home'} />
        ),
      },
    },
    CardList: {
      screen: CardListScreen,
      navigationOptions: {
        tabBarLabel: i18n.t('navigation.cards'),
        tabBarIcon: () => (
          <Icon style={{ color: MAIN_COLOR }} name={'ios-card'} />
        ),
      },
    },
    BudgetList: {
      screen: BudgetListScreen,
      navigationOptions: {
        tabBarLabel: i18n.t('navigation.budget'),
        tabBarIcon: () => (
          <Icon style={{ color: MAIN_COLOR }} name={'ios-cash'} />
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: i18n.t('navigation.settings'),
        tabBarIcon: () => (
          <Icon style={{ color: MAIN_COLOR }} name={'ios-settings'} />
        ),
      },
    },
  },
  {
    initialRouteName: 'House',
    lazy: true,
    activeColor: MAIN_COLOR,
    barStyle: { backgroundColor: '#fff' },
  },
);

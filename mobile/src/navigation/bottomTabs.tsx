import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MAIN_COLOR } from '../theme/colors';
import { Icon } from 'native-base';
import CardsScreen from '../modules/card/screens/CardsScreen';
import ChatScreen from '../modules/chat/screens/ChatScreen';
import ProfilScreen from '../modules/user/screens/ProfilScreen';
import i18n from '../i18n';
import { HouseTabsStack } from './houseTabs';

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
    Cards: {
      screen: CardsScreen,
      navigationOptions: {
        tabBarLabel: i18n.t('navigation.cards'),
        tabBarIcon: () => (
          <Icon style={{ color: MAIN_COLOR }} name={'ios-card'} />
        ),
      },
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        tabBarLabel: i18n.t('navigation.chat'),
        tabBarIcon: () => (
          <Icon style={{ color: MAIN_COLOR }} name={'ios-chatbubbles'} />
        ),
      },
    },
    Profil: {
      screen: ProfilScreen,
      navigationOptions: {
        tabBarLabel: i18n.t('navigation.profil'),
        tabBarIcon: () => (
          <Icon style={{ color: MAIN_COLOR }} name={'ios-person'} />
        ),
      },
    },
  },
  {
    initialRouteName: 'House',
    activeColor: MAIN_COLOR,
    barStyle: { backgroundColor: '#fff' },
  },
);

import React from 'react';
import {
  createMaterialTopTabNavigator,
  withNavigationFocus,
} from 'react-navigation';
import { MAIN_COLOR } from '../theme/colors';
import ShopListScreen from '../modules/shop/screens/ListScreen';
import RecipesScreen from '../modules/recipe/screens/ListScreen';
import i18n from '../i18n';
import { Spinner } from 'native-base';

const lazyScreen = (Screen: any) => {
  return withNavigationFocus(
    class extends React.Component {
      render() {
        if (!this.props.isFocused) {
          return <Spinner />;
        }

        return <Screen {...this.props} />;
      }
    },
  );
};

export const HouseTabsStack = createMaterialTopTabNavigator(
  {
    ShopList: {
      screen: lazyScreen(ShopListScreen),
      navigationOptions: {
        tabBarLabel: i18n.t('navigation.tabs.shops'),
      },
    },
    Menu: {
      screen: lazyScreen(ShopListScreen),
      navigationOptions: {
        tabBarLabel: i18n.t('navigation.tabs.menus'),
      },
    },
    RecipeList: {
      screen: lazyScreen(RecipesScreen),
      navigationOptions: {
        tabBarLabel: i18n.t('navigation.tabs.recipes'),
      },
    },
  },
  {
    initialRouteName: 'ShopList',
    lazy: true,
    tabBarOptions: {
      style: {
        backgroundColor: '#fff',
        borderBottomColor: MAIN_COLOR,
      },
      indicatorStyle: {
        backgroundColor: MAIN_COLOR,
      },
      activeTintColor: '#000',
      inactiveTintColor: MAIN_COLOR,
    },
  },
);

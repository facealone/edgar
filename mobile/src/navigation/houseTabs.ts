import { createMaterialTopTabNavigator } from 'react-navigation';
import { MAIN_COLOR } from '../theme/colors';
import ShopsScreen from '../modules/shop/screens/ShopsScreen';
import CardsScreen from '../modules/card/screens/CardsScreen';
import i18n from '../i18n';

export const HouseTabsStack = createMaterialTopTabNavigator(
  {
    Shops: {
      screen: ShopsScreen,
      navigationOptions: {
        tabBarLabel: i18n.t('navigation.tabs.shops'),
      },
    },
    Menu: {
      screen: CardsScreen,
      navigationOptions: {
        tabBarLabel: i18n.t('navigation.tabs.menus'),
      },
    },
    Recipes: {
      screen: CardsScreen,
      navigationOptions: {
        tabBarLabel: i18n.t('navigation.tabs.recipes'),
      },
    },
  },
  {
    initialRouteName: 'Shops',
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

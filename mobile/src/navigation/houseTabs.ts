import { createMaterialTopTabNavigator } from 'react-navigation';
import { MAIN_COLOR } from '../theme/colors';
import ShopListScreen from '../modules/shop/screens/ListScreen';
import CardsScreen from '../modules/card/screens/ListScreen';
import RecipesScreen from '../modules/recipe/screens/ListScreen';
import i18n from '../i18n';

export const HouseTabsStack = createMaterialTopTabNavigator(
  {
    ShopList: {
      screen: ShopListScreen,
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
    RecipeList: {
      screen: RecipesScreen,
      navigationOptions: {
        tabBarLabel: i18n.t('navigation.tabs.recipes'),
      },
    },
  },
  {
    initialRouteName: 'ShopList',
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

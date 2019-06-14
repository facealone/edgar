import React from 'react';
import { Content, Button, Icon } from 'native-base';
import { WebView } from 'react-native';
import { commonStyles } from '../../../theme/common';
import i18n from '../../../i18n';

interface IProps {
  navigation: any;
}

const RECIPES_PROVIDER_URI = 'https://www.marmiton.org/recettes/';

class BrowseScreen extends React.PureComponent<IProps> {
  componentDidMount = () => {
    this.props.navigation.setParams({
      recipeUri: RECIPES_PROVIDER_URI,
    });
  };

  onNavigationStateChange = (webViewState: any) => {
    this.props.navigation.setParams({
      recipeUri: webViewState.url,
    });
  };

  render = () => {
    return (
      <Content contentContainerStyle={{ flex: 1 }}>
        <WebView
          source={{
            uri: RECIPES_PROVIDER_URI,
          }}
          onNavigationStateChange={this.onNavigationStateChange}
          javaScriptEnabled
        />
      </Content>
    );
  };
}

BrowseScreen.navigationOptions = ({ navigation }: any) => {
  const params = navigation.state.params;

  return {
    title: i18n.t('recipe.add.title'),
    headerRight: (
      <Button
        transparent
        onPress={() =>
          params.recipeUri &&
          navigation.navigate('RecipeAdd', { recipeUri: params.recipeUri })
        }
      >
        <Icon name={'save'} style={commonStyles.headerIcon} />
      </Button>
    ),
  };
};

export default BrowseScreen;

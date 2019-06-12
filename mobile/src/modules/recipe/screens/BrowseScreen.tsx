import React from 'react';
import { Content, Button, Icon } from 'native-base';
import { WebView } from 'react-native';
import { commonStyles } from '../../../theme/common';

export default class BrowseScreen extends React.Component {
  static state = {
    recipeUri: '',
  };

  static navigationOptions = {
    title: 'Ajouter une recette',
    headerRight: (
      <Button transparent>
        <Icon name={'save'} style={commonStyles.headerIcon} />
      </Button>
    ),
  };

  onNavigationStateChange = (webViewState: any) => {
    this.setState({ recipeUri: webViewState.url });
  };

  render = () => {
    return (
      <Content contentContainerStyle={{ flex: 1 }}>
        <WebView
          source={{
            uri: 'https://www.marmiton.org/recettes/',
          }}
          onNavigationStateChange={this.onNavigationStateChange}
          javaScriptEnabled
        />
      </Content>
    );
  };
}

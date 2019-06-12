import React from 'react';
import { Content, Text, Button } from 'native-base';

export default class ListScreen extends React.Component {
  render = () => {
    return (
      <Content>
        <Text>Recipes</Text>
        <Button onPress={() => this.props.navigation.navigate('RecipeBrowser')}>
          <Text>Add recipe</Text>
        </Button>
      </Content>
    );
  };
}

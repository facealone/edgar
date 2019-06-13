import React from 'react';
import { Content } from 'native-base';
import RecipeForm from '../components/RecipeForm';
import i18n from '../../../i18n';

export default class AddScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t('recipe.add.title'),
  };

  render = () => {
    return (
      <Content>
        <RecipeForm />
      </Content>
    );
  };
}

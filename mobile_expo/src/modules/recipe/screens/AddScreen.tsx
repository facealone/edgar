import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Content } from 'native-base';
import RecipeForm from '../components/RecipeForm';
import i18n from '../../../i18n';
import { reset } from '../actions/add';
import { addRecipe } from '../middlewares/add';
import { listRecipeCategories } from '../middlewares/categories';
import {
  IRecipeAddResetAction,
  IRecipeForm,
  IRecipeAddState,
} from '../types/add';
import { commonStyles } from '../../../theme/common';
import { ICategoriesState } from '../types/categories';
import { Keyboard } from 'react-native';

interface IProps {
  reset(): IRecipeAddResetAction;
  listRecipeCategories(): any;
  addRecipe(payload: IRecipeForm): any;
  add: IRecipeAddState;
  categories: ICategoriesState;
  navigation: any;
}

class AddScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: i18n.t('recipe.add.title'),
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidUpdate = () => {
    const { add, navigation } = this.props;

    if (add.payload) {
      navigation.navigate('RecipeList');
    }
  };

  componentDidMount = () => {
    this.props.listRecipeCategories();
  };

  handleSubmit = (payload: IRecipeForm) => {
    payload.uri = this.props.navigation.state.params.recipeUri;

    Keyboard.dismiss();
    this.props.addRecipe(payload);
  };

  render = () => {
    const { add, categories } = this.props;

    return (
      <Content style={commonStyles.content}>
        {categories.payload && (
          <RecipeForm
            categories={categories.payload}
            loading={add.loading}
            onSubmit={this.handleSubmit}
          />
        )}
      </Content>
    );
  };
}

export default connect(
  state => {
    return {
      add: state.recipe.add,
      categories: state.recipe.categories,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators(
        { reset, addRecipe, listRecipeCategories },
        dispatch,
      ),
    };
  },
)(AddScreen);

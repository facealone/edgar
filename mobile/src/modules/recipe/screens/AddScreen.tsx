import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Content } from 'native-base';
import RecipeForm from '../components/RecipeForm';
import i18n from '../../../i18n';
import { reset } from '../actions/add';
import { addRecipe } from '../middlewares/add';
import {
  IRecipeAddResetAction,
  IRecipeForm,
  IRecipeAddState,
} from '../types/add';
import { commonStyles } from '../../../theme/common';

interface IProps {
  reset(): IRecipeAddResetAction;
  addRecipe(payload: IRecipeForm): any;
  add: IRecipeAddState;
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

  handleSubmit = (payload: IRecipeForm) => {
    this.props.addRecipe(payload);
  };

  render = () => {
    const { add } = this.props;

    return (
      <Content style={commonStyles.content}>
        <RecipeForm loading={add.loading} onSubmit={this.handleSubmit} />
      </Content>
    );
  };
}

export default connect(
  state => {
    return {
      add: state.recipe.add,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ reset, addRecipe }, dispatch),
    };
  },
)(AddScreen);

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Spinner } from 'native-base';
import { commonStyles } from '../../../theme/common';
import { reset } from '../actions/remove';
import { removeRecipe } from '../middlewares/remove';
import { IRecipeRemoveActionTypes } from '../types/remove';

interface IProps {
  id: string;
  navigation: any;
  remove: IRecipeRemoveActionTypes;
  reset(): any;
  removeRecipe(id: string): any;
}

class RemoveButton extends React.PureComponent<IProps> {
  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidUpdate = () => {
    const { remove, navigation } = this.props;
    console.log(remove);
    if (remove.id) {
      navigation.navigate('RecipeList');
    }
  };

  render = () => {
    const { remove, removeRecipe, id } = this.props;

    if (true === remove.loading) {
      return <Spinner color={'#fff'} style={{ marginRight: 10 }} />;
    }

    return (
      <Button transparent onPress={() => removeRecipe(id)}>
        <Icon name={'trash'} style={commonStyles.headerIcon} />
      </Button>
    );
  };
}

export default connect(
  state => {
    return {
      remove: state.recipe.remove,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ reset, removeRecipe }, dispatch),
    };
  },
)(RemoveButton);

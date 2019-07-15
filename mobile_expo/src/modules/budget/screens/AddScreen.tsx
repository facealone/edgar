import React from 'react';
import { connect } from 'react-redux';
import { Content, Text, Separator } from 'native-base';
import { commonStyles } from '../../../theme/common';
import { addBudget } from '../middlewares/add';
import { reset } from '../actions/add';
import { bindActionCreators } from 'redux';
import i18n from '../../../i18n';
import {
  IBudgetAddState,
  IBudgetForm,
  IBudgetAddResetAction,
} from '../types/add';
import { Keyboard } from 'react-native';
import BudgetForm from '../components/BudgetForm';

interface IProps {
  add: IBudgetAddState;
  navigation: any;
  reset(): IBudgetAddResetAction;
  addBudget(payload: IBudgetForm): any;
}

class AddScreen extends React.PureComponent<IProps> {
  static navigationOptions = {
    title: i18n.t('budget.add.title'),
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidUpdate = () => {
    const { add, navigation } = this.props;

    if (add.payload) {
      navigation.navigate('BudgetList');
    }
  };

  handleSubmit = (payload: IBudgetForm) => {
    Keyboard.dismiss();
    payload.amount = Number(payload.amount);

    this.props.addBudget(payload);
  };

  render = () => {
    const { add } = this.props;

    return (
      <Content style={commonStyles.content}>
        <BudgetForm loading={add.loading} onSubmit={this.handleSubmit} />
      </Content>
    );
  };
}

export default connect(
  state => {
    return {
      add: state.budget.add,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ reset, addBudget }, dispatch),
    };
  },
)(AddScreen);

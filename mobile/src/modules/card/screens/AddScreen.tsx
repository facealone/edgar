import React from 'react';
import { Content, Text } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardForm from '../components/CardForm';
import i18n from '../../../i18n';
import { ICardAddState, ICardForm, ICardAddResetAction } from '../types/add';
import { reset } from '../actions/add';
import { addCard } from '../middlewares/add';
import { commonStyles } from '../../../theme/common';
import { Keyboard } from 'react-native';

interface IProps {
  add: ICardAddState;
  navigation: any;
  addCard(name: string, barCode: string): any;
  reset(): ICardAddResetAction;
}

class AddScreen extends React.PureComponent<IProps> {
  static navigationOptions = {
    title: i18n.t('card.add.title'),
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidUpdate = () => {
    const { add, navigation } = this.props;

    if (add.payload) {
      navigation.navigate('CardList');
    }
  };

  handleSubmit = (payload: ICardForm) => {
    const { navigation, addCard } = this.props;
    const barCode = navigation.state.params.barCode;

    Keyboard.dismiss();
    addCard(payload.name, barCode);
  };

  render = () => {
    const { add } = this.props;

    return (
      <Content padder style={commonStyles.content}>
        <CardForm onSubmit={this.handleSubmit} loading={add.loading} />
      </Content>
    );
  };
}

export default connect(
  state => {
    return {
      add: state.card.add,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ reset, addCard }, dispatch),
    };
  },
)(AddScreen);

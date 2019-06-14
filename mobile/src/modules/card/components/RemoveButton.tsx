import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Spinner, Toast } from 'native-base';
import { commonStyles } from '../../../theme/common';
import { reset } from '../actions/remove';
import { removeCard } from '../middlewares/remove';
import { ICardRemoveState } from '../types/remove';
import i18n from '../../../i18n';

interface IProps {
  id: string;
  navigation: any;
  remove: ICardRemoveState;
  reset(): any;
  removeCard(id: string): any;
}

class RemoveButton extends React.PureComponent<IProps> {
  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidUpdate = () => {
    const { remove, navigation } = this.props;

    if (remove.id) {
      navigation.navigate('CardList');
      Toast.show({ text: i18n.t('success.remove') });
    }
  };

  render = () => {
    const { remove, removeCard, id } = this.props;

    if (true === remove.loading) {
      return <Spinner color={'#fff'} style={{ marginRight: 10 }} />;
    }

    return (
      <Button transparent onPress={() => removeCard(id)}>
        <Icon name={'trash'} style={commonStyles.headerIcon} />
      </Button>
    );
  };
}

export default connect(
  state => {
    return {
      remove: state.card.remove,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ reset, removeCard }, dispatch),
    };
  },
)(RemoveButton);

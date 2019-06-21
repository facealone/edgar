import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../../i18n';
import { Content, Text } from 'native-base';
import HouseForm from '../components/HouseForm';
import { commonStyles } from '../../../theme/common';
import { IHouseAddState, IHouseForm, IHouseAddResetAction } from '../types/add';
import { addHouse } from '../middlewares/add';
import { reset } from '../actions/add';
import { Keyboard } from 'react-native';

interface IProps {
  add: IHouseAddState;
  navigation: any;
  addHouse(payload: IHouseForm): any;
  reset(): IHouseAddResetAction;
}

class JoinScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: i18n.t('house.join.title'),
  };

  handleSubmit = (payload: IHouseForm) => {
    Keyboard.dismiss();
    this.props.reset();
    this.props.addHouse(payload);
  };

  componentDidUpdate = () => {
    const { add, navigation } = this.props;

    if (add.payload) {
      navigation.navigate('MembersInit');
    }
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  render = () => {
    const { add } = this.props;

    return (
      <Content style={commonStyles.content}>
        <Text style={commonStyles.intro}>
          {i18n.t('house.join.introduction')}
        </Text>
        <HouseForm loading={add.loading} onSubmit={this.handleSubmit} />
      </Content>
    );
  };
}

export default connect(
  state => {
    return {
      add: state.house.add,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ addHouse, reset }, dispatch),
    };
  },
)(JoinScreen);

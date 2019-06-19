import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Content, Text, Button, Spinner } from 'native-base';
import { commonStyles } from '../../../../theme/common';
import i18n from '../../../../i18n';
import { Share, Keyboard } from 'react-native';
import { reset } from '../../actions/voucher/add';
import { addVoucher } from '../../middlewares/voucher/add';
import {
  IHouseVoucherAddState,
  IHouseVoucherAddResetAction,
  IVoucherForm,
} from '../../types/voucher/add';
import VoucherForm from '../../components/voucher/VoucherForm';

interface IProps {
  add: IHouseVoucherAddState;
  reset(): IHouseVoucherAddResetAction;
  navigation: any;
  addVoucher(payload: IVoucherForm): any;
}

class SendVoucherScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: i18n.t('house.voucher.title'),
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidUpdate = async () => {
    const { add, navigation } = this.props;
    const { name, id } = navigation.state.params;

    if (add.payload) {
      await Share.share({
        message: i18n.t('house.voucher.success.message', {
          voucher: add.payload.code,
          house: navigation.state.params.name,
        }),
      });

      navigation.navigate('HouseShow', { id, name });
    }
  };

  handleSubmit = (payload: IVoucherForm) => {
    const { addVoucher, navigation } = this.props;
    const { id } = navigation.state.params;
    payload.houseId = id;

    Keyboard.dismiss();
    addVoucher(payload);
  };

  render = () => {
    const { add, navigation } = this.props;

    return (
      <Content style={commonStyles.content}>
        <Text style={commonStyles.intro}>
          {i18n.t('house.voucher.introduction', {
            house: navigation.state.params.name,
          })}
        </Text>
        <VoucherForm loading={add.loading} onSubmit={this.handleSubmit} />
      </Content>
    );
  };
}

export default connect(
  state => {
    return {
      add: state.house.voucher.add,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ reset, addVoucher }, dispatch),
    };
  },
)(SendVoucherScreen);

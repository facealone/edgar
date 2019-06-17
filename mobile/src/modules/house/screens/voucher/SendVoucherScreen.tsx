import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Content, Text, Button, Spinner } from 'native-base';
import { commonStyles } from '../../../../theme/common';
import i18n from '../../../../i18n';
import { Share } from 'react-native';
import { reset } from '../../actions/voucher/add';
import { addVoucher } from '../../middlewares/voucher/add';
import {
  IHouseVoucherAddState,
  IHouseVoucherAddResetAction,
} from '../../types/voucher/add';

interface IProps {
  add: IHouseVoucherAddState;
  reset(): IHouseVoucherAddResetAction;
  navigation: any;
  addVoucher(houseId: string): any;
}

class SendVoucherScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: i18n.t('house.member.voucher.title'),
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidUpdate = async () => {
    const { add, navigation } = this.props;
    const { name, id } = navigation.state.params;

    if (add.voucher) {
      await Share.share({
        message: i18n.t('house.member.voucher.success.message', {
          voucher: add.voucher,
          house: navigation.state.params.name,
        }),
      });

      navigation.navigate('HouseShow', { id, name });
    }
  };

  render = () => {
    const { add, navigation, addVoucher } = this.props;
    const { name, id } = navigation.state.params;

    return (
      <Content style={commonStyles.content}>
        <Text style={commonStyles.intro}>
          {i18n.t('house.member.voucher.introduction', {
            house: name,
          })}
        </Text>
        <Button
          style={commonStyles.submitButton}
          disabled={add.loading}
          onPress={() => addVoucher(id)}
        >
          {add.loading && <Spinner color={'#fff'} />}
          <Text>{i18n.t('house.member.voucher.form.submit')}</Text>
        </Button>
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

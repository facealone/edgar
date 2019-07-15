import React from 'react';
import { connect } from 'react-redux';
import { Content, Text, Separator, ListItem, Body } from 'native-base';
import { bindActionCreators } from 'redux';
import { commonStyles } from '../../../../theme/common';
import i18n from '../../../../i18n';
import { IHouseVoucherListState } from '../../types/voucher/list';
import { listVouchers } from '../../middlewares/voucher/list';
import { reset } from '../../actions/voucher/list';

interface IProps {
  vouchers: IHouseVoucherListState;
  house: string;
  listVouchers(house: string): any;
  reset(): any;
}

class VoucherList extends React.Component<IProps> {
  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidMount = () => {
    const { house, listVouchers } = this.props;

    listVouchers(house);
  };

  render = () => {
    const { vouchers } = this.props;

    return (
      <Content style={commonStyles.content}>
        <Separator bordered>
          <Text style={commonStyles.headerFlatList}>
            {i18n.t('house.voucher.list.title')} ({vouchers.payload.totalItems})
          </Text>
        </Separator>
        {vouchers.payload.items.map(voucher => (
          <ListItem key={voucher.code}>
            <Body>
              <Text>{voucher.username}</Text>
              <Text note>
                {i18n.t('house.voucher.list.code')} : {voucher.code}
              </Text>
              <Text note>
                {i18n.t('house.voucher.list.role')} :{' '}
                {i18n.t(`roles.${voucher.role}`)}
              </Text>
            </Body>
          </ListItem>
        ))}
      </Content>
    );
  };
}

export default connect(
  state => {
    return {
      vouchers: state.house.voucher.list,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ listVouchers, reset }, dispatch),
    };
  },
)(VoucherList);

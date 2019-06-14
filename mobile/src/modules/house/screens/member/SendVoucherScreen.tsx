import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Content, Text } from 'native-base';
import { commonStyles } from '../../../../theme/common';
import i18n from '../../../../i18n';
import { ICurrentHouseState } from '../../types/current';

interface IProps {
  currentHouse: ICurrentHouseState;
}

class SendVoucherScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: i18n.t('house.member.voucher.title'),
  };

  render = () => {
    const { currentHouse } = this.props;

    return (
      <Content style={commonStyles.content}>
        <Text style={commonStyles.intro}>
          {i18n.t('house.member.voucher.introduction', {
            house: currentHouse.payload.name,
          })}
        </Text>
      </Content>
    );
  };
}

export default connect(
  state => {
    return {
      currentHouse: state.house.current,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({}, dispatch),
    };
  },
)(SendVoucherScreen);

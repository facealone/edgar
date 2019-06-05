import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Content, Text } from 'native-base';
import { commonStyles } from '../../../../theme/common';
import i18n from '../../../../i18n';
import { IAuthenticationState } from '../../../auth/types/authentication';

interface IProps {
  authentication: IAuthenticationState;
}

class SendVoucherScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: i18n.t('house.member.voucher.title'),
  };

  render = () => {
    const { authentication } = this.props;

    return (
      <Content>
        <Text style={commonStyles.intro}>
          {i18n.t('house.member.voucher.introduction', {
            house: authentication.user.currentHouse.name,
          })}
        </Text>
      </Content>
    );
  };
}

export default connect(
  state => {
    return {
      authentication: state.auth.authentication,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({}, dispatch),
    };
  },
)(SendVoucherScreen);

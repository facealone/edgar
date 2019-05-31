import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, Keyboard } from 'react-native';
import { Content } from 'native-base';
import i18n from '../../../i18n';
import RegistrationForm from '../components/RegistrationForm';
import { commonStyles } from '../../../theme/common';
import { IRegistrationState, IRegistrationForm } from '../types/registration';
import { reset } from '../actions/registration';
import { register } from '../middlewares/registration';

interface IProps {
  registration: IRegistrationState;
  reset(): any;
  register(payload: IRegistrationForm): any;
}

class RegistrationScreen extends React.PureComponent<IProps> {
  static navigationOptions = {
    title: i18n.t('auth.registration.title'),
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  handleSubmit = (payload: IRegistrationForm) => {
    Keyboard.dismiss();
    this.props.reset();
    this.props.register(payload);
  };

  render = () => {
    const { registration } = this.props;

    return (
      <Content>
        <Text style={commonStyles.intro}>
          {i18n.t('auth.registration.introduction')}
        </Text>
        <RegistrationForm
          onSubmit={this.handleSubmit}
          loading={registration.loading}
        />
      </Content>
    );
  };
}

export default connect(
  state => {
    return {
      registration: state.auth.registration,
    };
  },
  dispatch => {
    return { ...bindActionCreators({ reset, register }, dispatch) };
  },
)(RegistrationScreen);

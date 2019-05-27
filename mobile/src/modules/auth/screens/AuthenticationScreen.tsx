import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, StyleSheet } from 'react-native';
import AuthenticationForm from '../components/AuthenticationForm';
import i18n from '../../../i18n';
import { authentication } from '../middlewares/authentication';
import { reset } from '../actions/authentication';
import { IAuthenticationState } from '../types/authentication';
import { Content, Text } from 'native-base';

interface Props {
  auth: IAuthenticationState;
  authentication(email: string, password: string): any;
  reset(): any;
}

class AuthenticationScreen extends React.PureComponent<Props> {
  static navigationOptions = {
    title: i18n.t('auth.authentication.login'),
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  handleSubmit = payload => {
    if (!payload) {
      return;
    }

    this.props.reset();
    this.props.authentication(payload.email, payload.password);
  };

  render = () => {
    const { auth } = this.props;

    return (
      <Content>
        {auth.errors.length > 0 &&
          Alert.alert(
            i18n.t('auth.authentication.failure.title'),
            i18n.t(auth.errors[0].message),
          )}
        <Text style={styles.intro}>
          {i18n.t('auth.authentication.introduction')}
        </Text>
        <AuthenticationForm
          onSubmit={this.handleSubmit}
          loading={auth.loading}
        />
      </Content>
    );
  };
}

const styles = StyleSheet.create({
  intro: { margin: 10 },
});

export default connect(
  state => {
    return {
      auth: state.auth.authentication,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ authentication, reset }, dispatch),
    };
  },
)(AuthenticationScreen);

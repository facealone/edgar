import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AuthenticationForm from '../components/authentication/AuthenticationForm';
import i18n from '../../../i18n';
import { authentication } from '../middlewares/authentication';
import { reset } from '../actions/authentication';
import { IAuthenticationState } from '../types/authentication';

interface Props {
  auth: IAuthenticationState;
  authentication(email: string, password: string): any;
  reset(): any;
}

class AuthenticationScreen extends React.PureComponent<Props> {
  static navigationOptions = {
    title: i18n.t('auth.login'),
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
      <View style={styles.container}>
        {auth.errors.length > 0 &&
          Alert.alert(
            i18n.t('auth.failure.title'),
            i18n.t(auth.errors[0].message),
          )}
        <Text>{i18n.t('auth.introduction')}</Text>
        <AuthenticationForm
          onSubmit={this.handleSubmit}
          loading={auth.loading}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
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
)(AuthenticationForm);

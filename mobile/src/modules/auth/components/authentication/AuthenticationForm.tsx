import React from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import t, { form } from 'tcomb-form-native';
import { bindActionCreators } from 'redux';
import { authentication } from '../../middlewares/authentication';
import { reset } from '../../actions/authentication';
import i18n from '../../../../i18n';

type Props = {
  loading: boolean;
  errors: [];
  authentication(email: string, password: string): any;
  reset(): any;
};

class AuthenticationForm extends React.Component<Props> {
  handleSubmit = () => {
    const payload = this.form.getValue();
    if (!payload) {
      return;
    }

    this.props.authentication(payload.email, payload.password);
  };

  initForm = () => {
    const { loading, errors } = this.props;

    const authenticationStruct = t.struct({
      email: t.String,
      password: t.String,
    });

    const options = {
      fields: {
        email: {
          label: i18n.t('auth.form.email'),
          autoFocus: true,
          editable: !loading,
          hasError: errors.length > 0,
          keyboardType: 'email-address',
        },
        password: {
          label: i18n.t('auth.form.password'),
          password: true,
          editable: !loading,
          hasError: errors.length > 0,
          secureTextEntry: true,
        },
      },
    };

    return { authenticationStruct, options };
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  render = () => {
    const { errors, loading } = this.props;
    const { authenticationStruct, options } = this.initForm();

    return (
      <View style={styles.container}>
        {errors.length > 0 && <Text>Error !!</Text>}
        {loading && <Text>Loading...</Text>}

        <form.Form
          ref={(ref: any) => {
            this.form = ref;
          }}
          type={authenticationStruct}
          options={options}
        />

        <TouchableOpacity>
          <Button
            disabled={loading}
            title={i18n.t('auth.login')}
            onPress={this.handleSubmit}
            color={'#686868'}
          />
        </TouchableOpacity>

        <Text>{i18n.t('auth.form.forgot_password')}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});

export default connect(
  state => {
    return {
      loading: state.auth.authentication.loading,
      errors: state.auth.authentication.errors,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ authentication, reset }, dispatch),
    };
  },
)(AuthenticationForm);

import React from 'react';
import { Form, Text, Content } from 'native-base';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import i18n from '../../../i18n';
import { validate } from '../validators/authentication';
import { IAuthenticationForm } from '../types/authentication';
import { Input } from '../../common/components/Input';
import { SubmitButton } from '../../common/components/SubmitButton';

interface IProps {
  loading: boolean;
  handleSubmit(): any;
}

class AuthenticationForm extends React.PureComponent<
  InjectedFormProps<IAuthenticationForm> & IProps
> {
  render = () => {
    const { loading, handleSubmit } = this.props;

    return (
      <KeyboardAvoidingView behavior={'padding'}>
        <Content>
          <Form>
            <Field
              autoFocus
              label={i18n.t('auth.authentication.form.email')}
              returnKeyType={'next'}
              name={'email'}
              keyboardType={'email-address'}
              textContentType={'emailAddress'}
              component={Input}
            />
            <Field
              name={'password'}
              label={i18n.t('auth.authentication.form.password')}
              returnKeyType={'done'}
              secureTextEntry={true}
              component={Input}
            />
            <SubmitButton
              loading={loading}
              handleSubmit={handleSubmit}
              label={i18n.t('auth.authentication.login')}
            />
            <Text style={styles.forgotPassword}>
              {i18n.t('auth.authentication.form.forgotPassword')}
            </Text>
          </Form>
        </Content>
      </KeyboardAvoidingView>
    );
  };
}

const styles = StyleSheet.create({
  forgotPassword: {
    alignSelf: 'flex-end',
    margin: 10,
    textDecorationLine: 'underline',
  },
});

export default reduxForm<IAuthenticationForm, IProps>({
  form: 'authentication',
  validate,
})(AuthenticationForm);

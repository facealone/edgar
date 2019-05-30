import React from 'react';
import { Form, Button, Text, Content, Spinner } from 'native-base';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import i18n from '../../../i18n';
import { MAIN_COLOR } from '../../../theme/colors';
import { validate } from '../validators/registration';
import { IRegistrationForm } from '../types/registration';
import { Input } from '../../common/components/Input';

interface IProps {
  loading: boolean;
  handleSubmit(): any;
}

class RegistrationForm extends React.PureComponent<
  InjectedFormProps<IRegistrationForm> & IProps
> {
  render = () => {
    const { loading, handleSubmit } = this.props;

    return (
      <KeyboardAvoidingView behavior={'padding'}>
        <Content>
          <Form>
            <Field
              autoFocus
              label={i18n.t('auth.registration.form.firstName')}
              returnKeyType={'next'}
              name={'firstName'}
              component={Input}
            />
            <Field
              label={i18n.t('auth.registration.form.lastName')}
              returnKeyType={'next'}
              name={'lastName'}
              component={Input}
            />
            <Field
              label={i18n.t('auth.registration.form.email')}
              returnKeyType={'next'}
              keyboardType={'email-address'}
              textContentType={'emailAddress'}
              name={'email'}
              component={Input}
            />
            <Field
              name={'password'}
              label={i18n.t('auth.registration.form.password')}
              returnKeyType={'done'}
              secureTextEntry={true}
              component={Input}
            />
            <Button
              disabled={loading}
              style={styles.button}
              onPress={handleSubmit}
            >
              {loading && <Spinner color={'#fff'} />}
              <Text>{i18n.t('auth.registration.form.next')}</Text>
            </Button>
          </Form>
        </Content>
      </KeyboardAvoidingView>
    );
  };
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: MAIN_COLOR,
    alignSelf: 'flex-end',
    margin: 10,
    marginTop: 20,
  },
});

export default reduxForm<IRegistrationForm, IProps>({
  form: 'registration',
  validate,
})(RegistrationForm);

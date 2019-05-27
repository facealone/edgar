import React from 'react';
import {
  Form,
  Button,
  Text,
  Input,
  Label,
  Item,
  Content,
  Spinner,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import i18n from '../../../i18n';
import { MAIN_COLOR } from '../../../theme/colors';

interface Props {
  loading: boolean;
  handleSubmit(): any;
}

class AuthenticationForm extends React.PureComponent<Props> {
  render = () => {
    const { loading, handleSubmit } = this.props;

    return (
      <Content>
        <Form>
          <Item stackedLabel>
            <Label>{i18n.t('auth.authentication.form.email')}</Label>
            <Field
              autoFocus
              returnKeyType={'next'}
              name={'email'}
              required={true}
              component={Input}
            />
          </Item>

          <Item stackedLabel>
            <Label>{i18n.t('auth.authentication.form.password')}</Label>
            <Field
              name={'password'}
              required={true}
              returnKeyType={'done'}
              secureTextEntry={true}
              component={Input}
            />
          </Item>
          <Button
            disabled={loading}
            style={styles.loginButton}
            onPress={handleSubmit}
          >
            <Text>{i18n.t('auth.authentication.login')}</Text>
            {loading && <Spinner color={'#fff'} />}
          </Button>
          <Text style={styles.forgotPassword}>
            {i18n.t('auth.authentication.form.forgotPassword')}
          </Text>
        </Form>
      </Content>
    );
  };
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: MAIN_COLOR,
    alignSelf: 'flex-end',
    margin: 10,
    marginTop: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    margin: 10,
    textDecorationLine: 'underline',
  },
});

export default reduxForm({
  form: 'authentication',
})(AuthenticationForm);

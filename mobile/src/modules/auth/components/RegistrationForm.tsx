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
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import i18n from '../../../i18n';
import { MAIN_COLOR } from '../../../theme/colors';
import { validate } from '../validators/registration';
import { IRegistrationForm } from '../types/registration';

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
      <Content>
        <Form>
          <Item stackedLabel>
            <Label>{i18n.t('auth.registration.form.firstName')}</Label>
            <Field
              autoFocus
              returnKeyType={'next'}
              name={'firstName'}
              required={true}
              component={Input}
            />
          </Item>
          <Item stackedLabel>
            <Label>{i18n.t('auth.registration.form.lastName')}</Label>
            <Field
              returnKeyType={'next'}
              name={'lastName'}
              required={true}
              component={Input}
            />
          </Item>
          <Item stackedLabel>
            <Label>{i18n.t('auth.registration.form.email')}</Label>
            <Field
              returnKeyType={'next'}
              name={'email'}
              required={true}
              component={Input}
            />
          </Item>

          <Item stackedLabel>
            <Label>{i18n.t('auth.registration.form.password')}</Label>
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
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text>{i18n.t('auth.registration.form.next')}</Text>
            {loading && <Spinner color={'#fff'} />}
          </Button>
        </Form>
      </Content>
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

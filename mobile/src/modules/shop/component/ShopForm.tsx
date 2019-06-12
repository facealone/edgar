import React from 'react';
import { Form, Content } from 'native-base';
import { KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import i18n from '../../../i18n';
import { Input } from '../../common/components/Input';
import { SubmitButton } from '../../common/components/SubmitButton';
import { IShopForm } from '../types/add';
import { validate } from '../validators/shop';

interface IProps {
  loading: boolean;
  handleSubmit(): any;
}

class ShopForm extends React.Component<InjectedFormProps<IShopForm> & IProps> {
  render = () => {
    const { loading, handleSubmit } = this.props;

    return (
      <KeyboardAvoidingView behavior={'padding'}>
        <Content>
          <Form>
            <Field
              autoFocus
              label={i18n.t('shop.add.form.name')}
              returnKeyType={'done'}
              name={'name'}
              component={Input}
            />
            <SubmitButton
              loading={loading}
              handleSubmit={handleSubmit}
              label={i18n.t('form.buttons.save')}
            />
          </Form>
        </Content>
      </KeyboardAvoidingView>
    );
  };
}

export default reduxForm<IShopForm, IProps>({
  form: 'shop',
  validate,
})(ShopForm);

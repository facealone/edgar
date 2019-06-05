import React from 'react';
import { Form, Content } from 'native-base';
import { KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import i18n from '../../../i18n';
import { validate } from '../validators/house';
import { Input } from '../../common/components/Input';
import { IHouseForm } from '../types/add';
import { SubmitButton } from '../../common/components/SubmitButton';

interface IProps {
  loading: boolean;
  handleSubmit(): any;
}

class HouseForm extends React.Component<
  InjectedFormProps<IHouseForm> & IProps
> {
  render = () => {
    const { loading, handleSubmit } = this.props;

    return (
      <KeyboardAvoidingView behavior={'padding'}>
        <Content>
          <Form>
            <Field
              autoFocus
              label={i18n.t('house.form.name')}
              returnKeyType={'done'}
              name={'name'}
              component={Input}
            />
            <SubmitButton
              loading={loading}
              handleSubmit={handleSubmit}
              label={i18n.t('house.form.next')}
            />
          </Form>
        </Content>
      </KeyboardAvoidingView>
    );
  };
}

export default reduxForm<IHouseForm, IProps>({
  form: 'house',
  validate,
})(HouseForm);

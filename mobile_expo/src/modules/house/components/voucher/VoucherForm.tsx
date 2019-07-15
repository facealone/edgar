import React from 'react';
import { Form, Content, Picker } from 'native-base';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import i18n from '../../../../i18n';
import { Input } from '../../../common/components/Input';
import { SubmitButton } from '../../../common/components/SubmitButton';
import { IVoucherForm } from '../../types/voucher/add';
import { validate } from '../../validators/voucher';
import { PickerInput } from '../../../common/components/PickerInput';

interface IProps {
  loading: boolean;
  handleSubmit(): any;
}

class VoucherForm extends React.PureComponent<
  InjectedFormProps<IVoucherForm> & IProps
> {
  render = () => {
    const { loading, handleSubmit } = this.props;

    return (
      <KeyboardAvoidingView behavior={'padding'}>
        <Content>
          <Form>
            <Field
              autoFocus
              label={i18n.t('house.voucher.form.name')}
              returnKeyType={'done'}
              name={'username'}
              component={Input}
            />
            <Field
              name={'role'}
              placeholder={i18n.t('house.voucher.form.role')}
              mode={'dropdown'}
              component={PickerInput}
            >
              {Platform.OS === 'android' && (
                <Picker.Item
                  label={i18n.t('house.voucher.form.role')}
                  value={null}
                />
              )}
              <Picker.Item
                label={i18n.t('roles.ROLE_OWNER')}
                value={'ROLE_OWNER'}
              />
              <Picker.Item
                label={i18n.t('roles.ROLE_CHILD')}
                value={'ROLE_CHILD'}
              />
              <Picker.Item
                label={i18n.t('roles.ROLE_GUEST')}
                value={'ROLE_GUEST'}
              />
            </Field>
            <SubmitButton
              loading={loading}
              handleSubmit={handleSubmit}
              label={i18n.t('house.voucher.form.submit')}
            />
          </Form>
        </Content>
      </KeyboardAvoidingView>
    );
  };
}

export default reduxForm<IVoucherForm, IProps>({
  form: 'voucher',
  validate,
})(VoucherForm);

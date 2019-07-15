import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { validate } from '../validators/budget';
import { IBudgetForm } from '../types/add';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import { Content, Form, Picker } from 'native-base';
import i18n from '../../../i18n';
import { Input } from '../../common/components/Input';
import { SubmitButton } from '../../common/components/SubmitButton';
import { PickerInput } from '../../common/components/PickerInput';
import { Platform } from '@unimodules/core';

interface IProps {
  loading: boolean;
  handleSubmit(): any;
}

class BudgetForm extends React.PureComponent<
  InjectedFormProps<IBudgetForm> & IProps
> {
  render = () => {
    const { loading, handleSubmit } = this.props;

    return (
      <KeyboardAvoidingView behavior={'padding'}>
        <Content>
          <Form>
            <Field
              autoFocus
              label={i18n.t('budget.add.form.name')}
              placeholder={i18n.t('budget.add.form.placeholder')}
              name={'name'}
              component={Input}
            />
            <Field
              label={i18n.t('budget.add.form.amount')}
              name={'amount'}
              keyboardType={'numeric'}
              component={Input}
            />
            <Field
              placeholder={i18n.t('budget.add.form.shared')}
              name={'shared'}
              mode={'dropdown'}
              component={PickerInput}
            >
              {Platform.OS === 'android' && (
                <Picker.Item
                  label={i18n.t('budget.add.form.shared')}
                  value={null}
                />
              )}
              <Picker.Item label={'Oui'} value={true} />
              <Picker.Item label={'Non'} value={false} />
            </Field>
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

export default reduxForm<IBudgetForm, IProps>({
  form: 'budget',
  validate,
})(BudgetForm);

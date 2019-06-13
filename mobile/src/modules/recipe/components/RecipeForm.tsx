import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { validate } from '../validators/recipe';
import { IRecipeForm } from '../types/add';
import { KeyboardAvoidingView } from 'react-native';
import { Content, Form } from 'native-base';
import i18n from '../../../i18n';
import { Input } from '../../common/components/Input';
import { SubmitButton } from '../../common/components/SubmitButton';

interface IProps {
  loading: boolean;
  handleSubmit(): any;
}

class RecipeForm extends React.PureComponent<
  InjectedFormProps<IRecipeForm> & IProps
> {
  render = () => {
    const { loading, handleSubmit } = this.props;

    return (
      <KeyboardAvoidingView behavior={'padding'}>
        <Content>
          <Form>
            <Field
              autoFocus
              label={i18n.t('recipe.add.form.name')}
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

export default reduxForm<IRecipeForm, IProps>({
  form: 'reciipe',
  validate,
})(RecipeForm);

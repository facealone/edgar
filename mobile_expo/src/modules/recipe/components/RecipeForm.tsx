import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { validate } from '../validators/recipe';
import { IRecipeForm } from '../types/add';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Content, Form, Picker } from 'native-base';
import i18n from '../../../i18n';
import { Input } from '../../common/components/Input';
import { SubmitButton } from '../../common/components/SubmitButton';
import { RecipeCategory } from '../models/RecipeCategory';
import { PickerInput } from '../../common/components/PickerInput';

interface IProps {
  loading: boolean;
  categories: RecipeCategory[];
  handleSubmit(): any;
}

class RecipeForm extends React.PureComponent<
  InjectedFormProps<IRecipeForm> & IProps
> {
  render = () => {
    const { loading, handleSubmit, categories } = this.props;

    return (
      <KeyboardAvoidingView behavior={'padding'}>
        <Content>
          <Form>
            <Field
              autoFocus={true}
              label={i18n.t('recipe.add.form.name')}
              placeholder={i18n.t('recipe.add.form.placeholder')}
              name={'name'}
              component={Input}
            />
            <Field
              placeholder={i18n.t('recipe.add.form.category')}
              name={'recipeCategory'}
              mode={'dropdown'}
              component={PickerInput}
            >
              {Platform.OS === 'android' && (
                <Picker.Item
                  label={i18n.t('recipe.add.form.category')}
                  value={null}
                />
              )}
              {categories.map((category: RecipeCategory) => (
                <Picker.Item
                  key={category.id}
                  label={category.name}
                  value={category.id}
                />
              ))}
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

export default reduxForm<IRecipeForm, IProps>({
  form: 'recipe',
  validate,
})(RecipeForm);

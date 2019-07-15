import { IRecipeForm } from '../types/add';
import i18n from '../../../i18n';

export const validate = (payload: IRecipeForm): object => {
  const errors = {};

  if (!payload.name) {
    errors.name = i18n.t('form.errors.requiredField');
  }

  if (!payload.recipeCategory) {
    errors.recipeCategory = i18n.t('form.errors.requiredField');
  }

  return errors;
};

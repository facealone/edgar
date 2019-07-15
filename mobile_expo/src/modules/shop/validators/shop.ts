import i18n from '../../../i18n';
import { IShopForm } from '../types/add';

export const validate = (payload: IShopForm) => {
  const errors = {};

  if (!payload.name) {
    errors.name = i18n.t('form.errors.requiredField');
  }

  return errors;
};

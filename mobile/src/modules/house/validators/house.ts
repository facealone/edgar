import { IHouseForm } from '../types/house';
import i18n from '../../../i18n';

export const validate = (payload: IHouseForm) => {
  const errors = {};

  if (!payload.name) {
    errors.name = i18n.t('form.errors.requiredField');
  }

  return errors;
};

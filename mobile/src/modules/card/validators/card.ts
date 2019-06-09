import i18n from '../../../i18n';
import { ICardForm } from '../types/add';

export const validate = (payload: ICardForm) => {
  const errors = {};

  if (!payload.name) {
    errors.name = i18n.t('form.errors.requiredField');
  }

  if (!payload.barCode) {
    errors.barCode = i18n.t('form.errors.requiredField');
  }

  return errors;
};

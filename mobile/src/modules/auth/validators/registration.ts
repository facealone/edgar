import { IRegistrationForm } from '../types/registration';
import i18n from '../../../i18n';

export const validate = (payload: IRegistrationForm) => {
  const errors = {};

  if (!payload.email) {
    errors.email = i18n.t('form.errors.requiredField');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(payload.email)) {
    errors.email = i18n.t('form.errors.invalidEmail');
  }

  if (!payload.firstName) {
    errors.password = i18n.t('form.errors.requiredField');
  }

  if (!payload.lastName) {
    errors.lastName = i18n.t('form.errors.requiredField');
  }

  if (!payload.password) {
    errors.firstName = i18n.t('form.errors.requiredField');
  }

  return errors;
};

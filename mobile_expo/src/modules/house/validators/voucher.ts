import i18n from '../../../i18n';
import { IVoucherForm } from '../types/voucher/add';

export const validate = (payload: IVoucherForm) => {
  const errors = {};

  if (!payload.username) {
    errors.username = i18n.t('form.errors.requiredField');
  }

  if (!payload.role) {
    errors.role = i18n.t('form.errors.requiredField');
  }

  return errors;
};

import { IBudgetForm } from '../types/add';
import i18n from '../../../i18n';

export const validate = (payload: IBudgetForm): object => {
  const errors = {};

  if (!payload.name) {
    errors.name = i18n.t('form.errors.requiredField');
  }

  if (!payload.amount) {
    errors.amount = i18n.t('form.errors.requiredField');
  }

  if (undefined === payload.shared) {
    errors.shared = i18n.t('form.errors.requiredField');
  }

  const amount = Number(payload.amount);

  if (isNaN(amount)) {
    errors.amount = i18n.t('budget.add.form.errors.amountFormat');
  } else if (amount <= 0) {
    errors.amount = i18n.t('budget.add.form.errors.amountValue');
  }

  return errors;
};

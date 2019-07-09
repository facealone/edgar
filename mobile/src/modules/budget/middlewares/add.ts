import { loading, success, errors } from '../actions/add';
import { Budget } from '../models/Budget';
import { IBudgetForm } from '../types/add';

export const addBudget = (payload: IBudgetForm) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.post('budgets', payload);
      const budget = response.data;

      dispatch(
        success(
          new Budget(
            budget.id,
            budget.name,
            budget.amount,
            budget.amount,
            budget.shared,
          ),
        ),
      );
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

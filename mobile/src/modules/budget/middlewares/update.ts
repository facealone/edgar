import { loading, success, errors } from '../actions/update';
import { Budget } from '../models/Budget';
import { IBudgetForm } from '../types/add';

export const updateBudget = (id: string, payload: IBudgetForm) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.put(`budgets/${id}`, payload);
      const budget = response.data;

      dispatch(
        success(
          new Budget(
            budget.id,
            budget.name,
            budget.amount,
            budget.balance,
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

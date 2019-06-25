import { loading, success, errors } from '../actions/list';
import { Budget } from '../models/Budget';

export const listBudgets = () => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get('users/me/current-house/budgets');
      const budgets = [];

      for (const budget of response.data) {
        budgets.push(
          new Budget(budget.id, budget.name, budget.amount, budget.balance),
        );
      }

      dispatch(success(budgets));
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

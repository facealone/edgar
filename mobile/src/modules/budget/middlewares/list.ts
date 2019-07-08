import { loading, success, errors } from '../actions/list';
import { Budget } from '../models/Budget';
import { Pagination } from '../../common/models/Pagination';

export const listBudgets = (page: number = 1) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get(
        `users/me/current-house/budgets?date=${new Date().toISOString()}&page=${page}`,
      );
      const { items, pageCount, totalItems } = response.data;
      const budgets = [];

      for (const budget of items) {
        budgets.push(
          new Budget(
            budget.id,
            budget.name,
            budget.amount,
            budget.balance,
            budget.shared,
          ),
        );
      }

      dispatch(success(new Pagination<Budget>(budgets, pageCount, totalItems)));
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};
